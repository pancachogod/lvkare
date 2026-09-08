import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './cart-context';
export const metadata: Metadata = {
  title: 'LVKARE | Tu ritual, tu momento',
  icons: { icon: '/favicon.svg' },
  description:
    'Descubre tu próximo ritual de cuidado: shampoo, cremas y splash. Arma tu carrito y continúa tu pedido por WhatsApp.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
