'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import {
  addItem,
  changeQuantity,
  sanitizeCart,
  products,
  cartTotal,
  orderMessage,
  whatsappUrl,
  type CartItem,
} from '@/lib/shop';
const STORAGE = 'lvkare-cart-v1';
type CartContextType = {
  cart: CartItem[];
  ready: boolean;
  add: (id: string, option?: number, quantity?: number) => void;
  setQuantity: (key: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  storageWarning: boolean;
};
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const cartRef = useRef(cart);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE);
      if (saved) {
        const restored = sanitizeCart(JSON.parse(saved));
        cartRef.current = restored;
        // oxlint-disable-next-line react/react-compiler -- Hydrate browser-only storage after SSR, without a server/client mismatch.
        setCart(restored);
      }
    } catch {
      setStorageWarning(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(STORAGE, JSON.stringify(cart));
      } catch {
        // oxlint-disable-next-line react/react-compiler -- Report an actual external storage failure to the customer.
        setStorageWarning(true);
      }
  }, [cart, ready]);
  const add = useCallback((id: string, option = 0, quantity = 1) => {
    const next = addItem(cartRef.current, id, option, quantity);
    cartRef.current = next;
    setCart(next);
  }, []);
  const setQuantity = useCallback((key: string, qty: number) => {
    const next = changeQuantity(cartRef.current, key, qty);
    cartRef.current = next;
    setCart(next);
  }, []);
  useEffect(() => {
    type Tool = {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (input: unknown) => unknown;
    };
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: Tool,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Tool) => {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {
        /* Unsupported proposal implementations must not affect checkout. */
      }
    };
    register({
      name: 'read_lvkare_catalog_and_cart',
      description:
        'Read LVKARE products, available presentations and this browser cart. Prices are in COP.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () => ({
        products: products.map(({ id, name, price, options }) => ({
          id,
          name,
          price,
          options,
        })),
        cart: cartRef.current,
        subtotalCOP: cartTotal(cartRef.current),
      }),
    });
    register({
      name: 'add_lvkare_cart_items',
      description:
        'Add a validated batch of product IDs, option indexes and quantities to the visible LVKARE cart. This does not place or send an order.',
      inputSchema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            minItems: 1,
            maxItems: 30,
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string' },
                option: { type: 'integer', minimum: 0 },
                quantity: { type: 'integer', minimum: 1, maximum: 99 },
              },
              required: ['productId', 'option', 'quantity'],
              additionalProperties: false,
            },
          },
        },
        required: ['items'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: (raw) => {
        const input = raw as {
          items?: { productId: string; option: number; quantity: number }[];
        };
        if (
          !input ||
          !Array.isArray(input.items) ||
          !input.items.length ||
          input.items.length > 30
        )
          throw new Error('Se requiere una lista de 1 a 30 productos.');
        let next = cartRef.current;
        for (const item of input.items) {
          if (!item || typeof item.productId !== 'string')
            throw new Error('Producto no válido.');
          next = addItem(next, item.productId, item.option, item.quantity);
        }
        flushSync(() => {
          cartRef.current = next;
          setCart(next);
          setCartOpen(true);
        });
        return { cart: next, subtotalCOP: cartTotal(next) };
      },
    });
    register({
      name: 'prepare_lvkare_whatsapp_order',
      description:
        'Prepare WhatsApp text and URL from the current cart without opening WhatsApp, sending a message or charging a payment.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () => {
        const message = orderMessage(cartRef.current);
        return { message, url: whatsappUrl(message), sent: false };
      },
    });
    return () => lifecycle.abort();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        ready,
        add,
        setQuantity,
        cartOpen,
        setCartOpen,
        storageWarning,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartProvider requerido');
  return context;
}
