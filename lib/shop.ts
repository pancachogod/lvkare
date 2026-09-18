export const shop = {
  name: 'LVKARE',
  // Añadir el número con indicativo, solo dígitos. Ejemplo de formato: 57 + número móvil.
  whatsappNumber: '573185555731',
  secondaryWhatsappNumber: '573164549547',
  instagram: '@lvkarecuidadoancestral',
  currency: 'COP',
};
export type Category = 'cabello' | 'cuerpo' | 'fragancias' | 'kits' | 'maquillaje';
export const categories: { id: Category; name: string; intro: string }[] = [
  {
    id: 'cabello',
    name: 'Cabello',
    intro: 'Un buen día empieza con un ritual para tu cabello.',
  },
  {
    id: 'cuerpo',
    name: 'Cuerpo',
    intro: 'Texturas suaves para hacer una pausa y cuidarte.',
  },
  {
    id: 'fragancias',
    name: 'Fragancias',
    intro: 'Aromas ligeros para llevar un poquito de ti a todas partes.',
  },
  {
    id: 'kits',
    name: 'Kits & rituales',
    intro: 'Pequeños rituales que se disfrutan mejor juntos.',
  },
  {
    id: 'maquillaje',
    name: 'Maquillaje',
    intro: 'Color, textura y pequeños detalles para expresarte a tu manera.',
  },
];
export interface Product {
  id: string;
  name: string;
  category: Category;
  subtitle: string;
  price: number;
  image: string;
  label?: string;
  description: string;
  use: string;
  notes: string[];
  options: { label: string; extra: number }[];
}
export const products: Product[] = [
  {
    id: 'shampoo-nutricion',
    name: 'Shampoo Nutrición',
    category: 'cabello',
    subtitle: 'Suavidad, desde el primer paso',
    price: 32900,
    image: '/images/shampoo.webp',
    label: 'ESENCIAL',
    description:
      'El comienzo de un ritual que se siente bien. Un shampoo de textura cremosa, pensado para acompañar la limpieza de tu cabello y dejar una agradable sensación de suavidad.',
    use: 'Aplica sobre el cabello mojado, masajea suavemente el cuero cabelludo y enjuaga con abundante agua. Complementa tu rutina con acondicionador.',
    notes: [
      'Textura cremosa',
      'Aroma floral suave',
      'Para tu rutina de lavado',
    ],
    options: [
      { label: '300 ml', extra: 0 },
      { label: '500 ml', extra: 16000 },
    ],
  },
  {
    id: 'crema-vainilla',
    name: 'Crema Corporal Vainilla',
    category: 'cuerpo',
    subtitle: 'Un abrazo cálido para tu piel',
    price: 38900,
    image: '/images/cream.webp',
    label: 'MOMENTO FAVORITO',
    description:
      'Una crema corporal de textura envolvente y aroma cálido a vainilla. Ese último paso después de la ducha que transforma el cuidado diario en un momento para ti.',
    use: 'Aplica sobre la piel limpia y seca con un masaje suave. Usa la cantidad que necesites, evitando el rostro y las zonas irritadas.',
    notes: [
      'Aroma a vainilla',
      'Textura envolvente',
      'Ideal después de la ducha',
    ],
    options: [
      { label: '250 g', extra: 0 },
      { label: '400 g', extra: 15000 },
    ],
  },
  {
    id: 'splash-rosa',
    name: 'Splash Rosa',
    category: 'fragancias',
    subtitle: 'Ligero, floral, muy tú',
    price: 29900,
    image: '/images/splash.webp',
    label: 'DESCÚBRELO',
    description:
      'Un aroma floral ligero para acompañar tus días. Llévalo contigo y vuelve a ese pequeño momento de frescura cuando quieras.',
    use: 'Rocía a unos 15 cm de la piel, evitando el rostro, los ojos y las zonas irritadas. Deja secar. Mantén el producto alejado del calor.',
    notes: ['Familia floral', 'Notas de rosa', 'Fragancia ligera'],
    options: [
      { label: '150 ml', extra: 0 },
      { label: '250 ml', extra: 13000 },
    ],
  },
  {
    id: 'ritual-completo',
    name: 'El Ritual Completo',
    category: 'kits',
    subtitle: 'Tres momentos. Un solo ritual.',
    price: 94900,
    image: '/images/hero.webp',
    label: 'EL KIT LVKARE',
    description:
      'Tus tres esenciales, juntos: Shampoo Nutrición de 300 ml, Crema Corporal Vainilla de 250 g y Splash Rosa de 150 ml. Un detalle para regalar o regalarte.',
    use: 'Empieza con el shampoo durante la ducha, continúa con la crema corporal sobre la piel seca y termina con un toque de splash.',
    notes: ['Shampoo 300 ml', 'Crema corporal 250 g', 'Splash 150 ml'],
    options: [{ label: 'Kit de 3 productos', extra: 0 }],
  },
  {
    id: 'shampoo-frescura',
    name: 'Shampoo Frescura',
    category: 'cabello',
    subtitle: 'Un nuevo comienzo para tu cabello',
    price: 34900,
    image: '/images/shampoo.webp',
    description:
      'Una limpieza cotidiana con aroma fresco y una textura ligera. Una opción sencilla para quienes disfrutan empezar el día con una ducha revitalizante.',
    use: 'Humedece el cabello, distribuye una pequeña cantidad, masajea y enjuaga. Evita el contacto con los ojos.',
    notes: ['Aroma fresco', 'Textura ligera', 'Limpieza cotidiana'],
    options: [
      { label: '300 ml', extra: 0 },
      { label: '500 ml', extra: 16000 },
    ],
  },
  {
    id: 'mascarilla-suavidad',
    name: 'Mascarilla Suavidad',
    category: 'cabello',
    subtitle: 'Dale un momento extra',
    price: 42900,
    image: '/images/cream.webp',
    description:
      'Un paso adicional para disfrutar tu rutina capilar. Su textura cremosa se distribuye de medios a puntas y acompaña esos días en los que quieres dedicarte un poco más de tiempo.',
    use: 'Después del shampoo, aplica de medios a puntas sobre el cabello húmedo. Deja actuar de 3 a 5 minutos y enjuaga completamente.',
    notes: ['Cuidado de medios a puntas', 'Textura cremosa', 'Ritual semanal'],
    options: [
      { label: '250 g', extra: 0 },
      { label: '400 g', extra: 17000 },
    ],
  },
  {
    id: 'crema-cereza',
    name: 'Crema Corporal Cereza',
    category: 'cuerpo',
    subtitle: 'El lado dulce de cuidarte',
    price: 38900,
    image: '/images/cream.webp',
    description:
      'Una crema para disfrutar de un masaje suave y un aroma frutal a cereza. Un detalle dulce para acompañar tus momentos de cuidado corporal.',
    use: 'Extiende sobre la piel limpia y seca. Masajea hasta que se absorba, evitando el rostro y las zonas irritadas.',
    notes: ['Aroma frutal', 'Notas de cereza', 'Cuidado corporal diario'],
    options: [
      { label: '250 g', extra: 0 },
      { label: '400 g', extra: 15000 },
    ],
  },
  {
    id: 'splash-citrico',
    name: 'Splash Cítrico',
    category: 'fragancias',
    subtitle: 'Un toque de sol, donde vayas',
    price: 29900,
    image: '/images/splash.webp',
    description:
      'Un splash de carácter fresco y cítrico para acompañar tu rutina. Un aroma ligero, perfecto para quienes disfrutan las notas luminosas.',
    use: 'Rocía sobre la piel a unos 15 cm de distancia. Evita los ojos, el rostro y la piel irritada. Mantén alejado del calor.',
    notes: ['Familia cítrica', 'Notas frescas', 'Fragancia ligera'],
    options: [
      { label: '150 ml', extra: 0 },
      { label: '250 ml', extra: 13000 },
    ],
  },
  {
    id: 'contorno-en-barra', name: 'Contorno en barra', category: 'maquillaje', subtitle: 'Bronceador cremoso con vitaminas', price: 10500, image: '/images/makeup/08.png', label: 'MAQUILLAJE',
    description: 'Bronceador cremoso con vitaminas para definir y dar calidez al rostro.', use: 'Aplica directamente o con brocha en pómulos, frente y mandíbula. Difumina hasta lograr la intensidad que prefieras.', notes: ['Textura cremosa', 'Con vitaminas', 'Fácil de difuminar'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'tinta-difuminar', name: 'Tinta para difuminar', category: 'maquillaje', subtitle: 'Ideal para labios y mejillas', price: 9000, image: '/images/makeup/02.png', label: 'MAQUILLAJE',
    description: 'Tinta versátil para dar un toque de color natural a labios y mejillas.', use: 'Coloca pequeños puntos sobre labios o mejillas y difumina con los dedos o una brocha.', notes: ['Para labios y mejillas', 'Color modulable', 'Acabado natural'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'rubor-en-barra', name: 'Rubor en barra', category: 'maquillaje', subtitle: 'Realza mejillas, labios y ojos', price: 10000, image: '/images/makeup/16.png', label: 'MAQUILLAJE',
    description: 'Un rubor en barra para aportar color y vida a mejillas, labios y ojos.', use: 'Aplica una pequeña cantidad y difumina. Puedes construir el color en capas.', notes: ['Uso multi-zona', 'Textura cremosa', 'Color construible'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'tinta-gelatina', name: 'Tinta en gelatina', category: 'maquillaje', subtitle: 'Color ligero para tu rutina', price: 7000, image: '/images/makeup/01.png', label: 'MAQUILLAJE',
    description: 'Tinta de acabado ligero para sumar un toque de color a tu look diario.', use: 'Aplica sobre labios o mejillas y difumina rápidamente para un resultado uniforme.', notes: ['Acabado ligero', 'Color fresco', 'Fácil de usar'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'rubor-flower', name: 'Rubor Flower', category: 'maquillaje', subtitle: 'Efecto 3D y acabado natural', price: 12000, image: '/images/makeup/00.png', label: 'MAQUILLAJE',
    description: 'Rubor en polvo con efecto 3D para un acabado natural y luminoso.', use: 'Toma producto con una brocha, retira el exceso y aplica en las mejillas.', notes: ['Efecto 3D', 'Acabado natural', 'Polvo suave'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'lapiz-cejas-tres-puntas', name: 'Lápiz de cejas 3 puntas', category: 'maquillaje', subtitle: 'Cejas perfectas y naturales', price: 12000, image: '/images/makeup/12.png', label: 'MAQUILLAJE',
    description: 'Lápiz de tres puntas para definir cejas con un aspecto natural.', use: 'Dibuja trazos cortos siguiendo la dirección del vello y peina para integrar el color.', notes: ['Tres puntas', 'Trazos naturales', 'Define y rellena'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'serum-pestanas', name: 'Serum para pestañas', category: 'maquillaje', subtitle: 'Revitaliza el área', price: 10000, image: '/images/makeup/20.png', label: 'MAQUILLAJE',
    description: 'Contiene ácido hialurónico para revitalizar el área de las pestañas.', use: 'Aplica una cantidad pequeña sobre pestañas limpias, evitando el contacto directo con los ojos.', notes: ['Con ácido hialurónico', 'Revitaliza el área', 'Aplicador preciso'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'sellador-pecas', name: 'Sellador de pecas', category: 'maquillaje', subtitle: 'Estampa pecas en segundos', price: 8000, image: '/images/makeup/06.png', label: 'MAQUILLAJE',
    description: 'Estampa pecas en segundos y resiste al agua.', use: 'Presiona suavemente el aplicador sobre la piel y deja secar antes de tocar.', notes: ['Resistente al agua', 'Aplicación rápida', 'Resultado natural'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'base-acabado-mate', name: 'Base con acabado mate', category: 'maquillaje', subtitle: 'Incluye aplicador en forma de hongo', price: 15000, image: '/images/makeup/17.png', label: 'MAQUILLAJE',
    description: 'Base de acabado mate con aplicador en forma de hongo.', use: 'Aplica por zonas y difumina desde el centro del rostro hacia afuera.', notes: ['Acabado mate', 'Incluye aplicador', 'Cobertura modulable'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'labial-liquido-mate', name: 'Labial líquido mate', category: 'maquillaje', subtitle: 'Larga duración, hasta 16 horas', price: 8000, image: '/images/makeup/09.png', label: 'MAQUILLAJE',
    description: 'Labial líquido mate de larga duración, hasta 16 horas.', use: 'Aplica sobre labios limpios y espera unos segundos mientras fija el acabado.', notes: ['Mate', 'Larga duración', 'Color intenso'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'crema-fijadora-maquillaje', name: 'Crema fijadora de maquillaje', category: 'maquillaje', subtitle: 'Sella el corrector y la base', price: 12000, image: '/images/makeup/04.png', label: 'MAQUILLAJE',
    description: 'Sella el corrector y la base, proporcionando un efecto mate.', use: 'Aplica una capa fina después de tu base o corrector y difumina de manera uniforme.', notes: ['Efecto mate', 'Fija tu maquillaje', 'Textura cremosa'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'balsamo-frutal', name: 'Bálsamo frutal', category: 'maquillaje', subtitle: 'Hidrata y suaviza los labios', price: 5000, image: '/images/makeup/05.png', label: 'MAQUILLAJE',
    description: 'Bálsamo frutal que hidrata profundamente y suaviza los labios.', use: 'Aplica directamente sobre los labios cada vez que necesites hidratación.', notes: ['Aroma frutal', 'Hidratación profunda', 'Suaviza los labios'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'lapiz-labial-hidratante', name: 'Lápiz labial hidratante', category: 'maquillaje', subtitle: 'Color y cuidado en un solo paso', price: 5000, image: '/images/makeup/11.png', label: 'MAQUILLAJE',
    description: 'Lápiz labial hidratante para aportar color mientras cuida tus labios.', use: 'Desliza sobre los labios y reaplica cuando quieras intensificar el tono.', notes: ['Hidratante', 'Color suave', 'Aplicación fácil'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'labial-hidratante-frutas', name: 'Labial hidratante de frutas', category: 'maquillaje', subtitle: 'Un toque dulce de color', price: 5000, image: '/images/makeup/03.png', label: 'MAQUILLAJE',
    description: 'Labial hidratante con inspiración frutal para un toque dulce de color.', use: 'Aplica sobre los labios limpios y reaplica durante el día según necesites.', notes: ['Inspiración frutal', 'Hidratación', 'Color cotidiano'], options: [{ label: '1 unidad', extra: 0 }],
  },
  {
    id: 'gloss-labial', name: 'Gloss', category: 'maquillaje', subtitle: 'Brillo suave para tus labios', price: 8000, image: '/images/makeup/07.png', label: 'MAQUILLAJE',
    description: 'Brillo labial de acabado brillante que suaviza e hidrata los labios.', use: 'Aplica directamente o encima de tu labial favorito para sumar brillo.', notes: ['Acabado brillante', 'Suaviza e hidrata', 'Úsalo solo o en capas'], options: [{ label: '1 unidad', extra: 0 }],
  },
];
export interface CartItem {
  key: string;
  productId: string;
  option: number;
  quantity: number;
}
export interface Customer {
  name: string;
  city: string;
  address: string;
  notes: string;
}
export const money = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
export const itemKey = (productId: string, option: number) =>
  `${productId}:${option}`;
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const unitPrice = (item: CartItem) => {
  const p = getProduct(item.productId);
  return p && p.options[item.option]
    ? p.price + p.options[item.option].extra
    : 0;
};
export const cartTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);
export function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const found = new Map<string, CartItem>();
  for (const i of raw) {
    if (!i || typeof i !== 'object') continue;
    const p = getProduct(i.productId);
    if (
      !p ||
      !Number.isInteger(i.option) ||
      !p.options[i.option] ||
      !Number.isInteger(i.quantity) ||
      i.quantity < 1
    )
      continue;
    const key = itemKey(p.id, i.option);
    found.set(key, {
      key,
      productId: p.id,
      option: i.option,
      quantity: Math.min(99, (found.get(key)?.quantity ?? 0) + i.quantity),
    });
  }
  return [...found.values()];
}
export function addItem(
  cart: CartItem[],
  productId: string,
  option: number,
  quantity = 1,
): CartItem[] {
  const p = getProduct(productId);
  if (
    !p ||
    !Number.isInteger(option) ||
    !p.options[option] ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 99
  )
    throw new Error('Producto, presentación o cantidad no válidos.');
  const key = itemKey(productId, option);
  const old = cart.find((i) => i.key === key);
  if (old && old.quantity + quantity > 99)
    throw new Error('El máximo es de 99 unidades por presentación.');
  return old
    ? cart.map((i) =>
        i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
      )
    : [...cart, { key, productId, option, quantity }];
}
export function changeQuantity(
  cart: CartItem[],
  key: string,
  quantity: number,
): CartItem[] {
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99)
    throw new Error('La cantidad debe estar entre 0 y 99.');
  return quantity === 0
    ? cart.filter((i) => i.key !== key)
    : cart.map((i) => (i.key === key ? { ...i, quantity } : i));
}
export function orderMessage(cart: CartItem[], customer?: Customer): string {
  if (!cart.length)
    throw new Error('Agrega al menos un producto a tu carrito.');
  const clean = (s: string) => s.trim().replace(/[\r\n]+/g, ' ');
  const lines = cart.map((i) => {
    const p = getProduct(i.productId)!;
    return `• ${p.name} · ${p.options[i.option].label}\n  ${i.quantity} × ${money(unitPrice(i))} = ${money(unitPrice(i) * i.quantity)}`;
  });
  return [
    `¡Hola, LVKARE! Quiero confirmar este pedido:`,
    ...lines,
    `Subtotal de productos: ${money(cartTotal(cart))} COP`,
    `Envío: por confirmar.`,
    customer?.name ? `Nombre: ${clean(customer.name)}` : '',
    customer?.city ? `Ciudad / municipio: ${clean(customer.city)}` : '',
    customer?.address ? `Dirección: ${clean(customer.address)}` : '',
    customer?.notes ? `Notas: ${clean(customer.notes)}` : '',
    'Quedo pendiente de confirmar disponibilidad, envío y forma de pago.',
  ]
    .filter(Boolean)
    .join('\n\n');
}
export function whatsappUrl(
  message: string,
  number = shop.whatsappNumber,
): string {
  const digits = number.replace(/\D/g, '');
  if (number && !/^\d{8,15}$/.test(digits))
    throw new Error('Número de WhatsApp no válido.');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
export const faqs = [
  [
    '¿Cómo hago mi pedido?',
    'Agrega tus favoritos al carrito, elige las presentaciones y cantidades y continúa al resumen. Completa tu nombre y ciudad; al abrir WhatsApp, tu mensaje ya incluirá los productos, cantidades y subtotal. Tú decides cuándo enviarlo.',
  ],
  [
    '¿Cómo se realiza el pago?',
    'El pago se acuerda en la conversación de WhatsApp, después de confirmar disponibilidad, envío y valor final. La página no cobra ni solicita datos bancarios.',
  ],
  [
    '¿Cuánto cuesta el envío?',
    'El valor y el tiempo de entrega se confirman por WhatsApp según tu ciudad o municipio en Colombia. El subtotal del carrito corresponde únicamente a los productos.',
  ],
  [
    '¿Puedo cambiar mi pedido?',
    'Antes de enviarlo, puedes ajustar cantidades o quitar productos desde el carrito. Si ya lo enviaste, escribe en la misma conversación para consultar el estado y las opciones de cambio.',
  ],
  [
    '¿Cómo elijo mi próximo ritual?',
    'Explora las categorías y abre cada producto para ver su presentación, aroma y modo de uso. Si tienes dudas sobre ingredientes o compatibilidad con tu piel o cabello, consulta la etiqueta final del producto antes de comprar.',
  ],
  [
    '¿Mi carrito se guarda?',
    'Sí. El carrito se guarda en este navegador para que puedas continuar más tarde. Si borras los datos del navegador o usas otro dispositivo, tendrás que armarlo de nuevo.',
  ],
];
