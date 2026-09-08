import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Storefront from '../storefront';
import { categories, getProduct } from '@/lib/shop';
const titles: Record<string, string> = {
  productos: 'Todos los productos',
  nosotros: 'Nuestro universo',
  ayuda: 'Preguntas frecuentes',
  contacto: 'Hablemos',
  envios: 'Envíos y pedidos',
  privacidad: 'Privacidad',
  terminos: 'Condiciones de compra',
  carrito: 'Tu carrito',
  pedido: 'Completa tu pedido',
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const { path = [] } = await params;
  const product = path[0] === 'producto' ? getProduct(path[1]) : undefined;
  const cat =
    path[0] === 'productos'
      ? categories.find((c) => c.id === path[1])
      : undefined;
  return {
    title: `${product?.name ?? cat?.name ?? titles[path[0]] ?? 'Tu ritual, tu momento'} | LVKARE`,
    description:
      product?.description ??
      cat?.intro ??
      'Tu tienda de shampoo, cremas, splash y rituales de cuidado. Precios en pesos colombianos y pedidos por WhatsApp.',
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const valid =
    !path.length ||
    (path.length === 1 && Object.hasOwn(titles, path[0])) ||
    (path.length === 2 &&
      path[0] === 'productos' &&
      categories.some((c) => c.id === path[1])) ||
    (path.length === 2 &&
      path[0] === 'producto' &&
      Boolean(getProduct(path[1])));
  if (!valid) notFound();
  return <Storefront />;
}
