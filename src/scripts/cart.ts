// Sacola de compras (só no navegador): guarda os itens e os dados de entrega no próprio aparelho
// (localStorage) e monta a mensagem do pedido para o WhatsApp. Sem servidor e sem pagamento online:
// o pedido é confirmado e pago (Pix) na conversa.

export interface CartItem {
  /** Chave única da combinação (modelo + tamanho + aromas) — itens iguais somam quantidade. */
  key: string;
  /** Ex.: "Vela de 100g" ou "Kit com 3 velas de 40g". */
  title: string;
  /** Ex.: "Baunilha" ou "Morango com Champanhe, Cereja com Avelã e a escolher". */
  detail: string;
  /** Preço unitário em reais. */
  unit: number;
  qty: number;
  thumb: string;
}

export interface Customer {
  name: string;
  city: string;
  district: string;
  notes: string;
}

const ITEMS_KEY = 'fda-sacola';
const CUSTOMER_KEY = 'fda-sacola-dados';
const emptyCustomer: Customer = { name: '', city: '', district: '', notes: '' };

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado ou armazenamento bloqueado: a sacola vale só nesta visita */
  }
};

let items: CartItem[] = read<CartItem[]>(ITEMS_KEY, []);
let customer: Customer = { ...emptyCustomer, ...read<Partial<Customer>>(CUSTOMER_KEY, {}) };

const emit = () => {
  write(ITEMS_KEY, items);
  window.dispatchEvent(new CustomEvent('cart:change', { detail: { count: count(), total: total() } }));
};

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const getItems = () => items;
export const count = () => items.reduce((n, i) => n + i.qty, 0);
export const total = () => items.reduce((n, i) => n + i.unit * i.qty, 0);

export function add(item: Omit<CartItem, 'qty'>, qty = 1) {
  const found = items.find((i) => i.key === item.key);
  if (found) found.qty += qty;
  else items = [...items, { ...item, qty }];
  track('add_to_cart', { item: item.title, detail: item.detail, value: item.unit });
  emit();
  window.dispatchEvent(
    new CustomEvent('cart:added', {
      detail: { title: item.title, detail: item.detail, thumb: item.thumb, count: count() },
    }),
  );
}

export function setQty(key: string, qty: number) {
  items = qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i));
  emit();
}

export function remove(key: string) {
  setQty(key, 0);
}

export function clear() {
  items = [];
  emit();
}

export const getCustomer = () => customer;
export function setCustomer(data: Partial<Customer>) {
  customer = { ...customer, ...data };
  write(CUSTOMER_KEY, customer);
}

/** Mensagem do pedido para o WhatsApp. */
export function orderMessage(): string {
  const lines = items.map((i) => `• ${i.qty}× ${i.title}${i.detail ? ` — ${i.detail}` : ''} (${brl(i.unit * i.qty)})`);
  const c = customer;
  const where = [c.district.trim(), c.city.trim()].filter(Boolean).join(', ');
  return [
    'Olá! Quero fazer este pedido:',
    ...lines,
    `Total: ${brl(total())} (sem a entrega)`,
    c.name.trim() && `Nome: ${c.name.trim()}`,
    where && `Entrega em: ${where}`,
    c.notes.trim() && `Observações: ${c.notes.trim()}`,
    'Pagamento via Pix.',
  ]
    .filter(Boolean)
    .join('\n');
}

export function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: unknown[]; plausible?: (e: string, o: unknown) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
  if (typeof w.plausible === 'function') w.plausible(event, { props: data });
}
