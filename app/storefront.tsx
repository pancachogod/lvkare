'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type SubmitEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Search,
  Sparkles,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Menu,
  X,
  Check,
  Heart,
  Flower2,
  Copy,
  Truck,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from './cart-context';
import {
  categories,
  products,
  getProduct,
  money,
  unitPrice,
  cartTotal,
  orderMessage,
  whatsappUrl,
  faqs,
  shop,
  type Product,
  type Customer,
} from '@/lib/shop';

const categoryUrl = (id: string) => `/productos/${id}`;
function Brand() {
  return (
    <span className="brand-word">
      LVKARE<span className="brand-dot">✳</span>
    </span>
  );
}
function ProductCard({ product: p }: { product: Product }) {
  const { add, ready } = useCart();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);
  return (
    <article className={`product-card product-${p.category}`}>
      <Link
        className="product-image"
        href={`/producto/${p.id}`}
        aria-label={`Ver ${p.name}`}
      >
        <Image
          unoptimized
          src={p.image}
          alt={`${p.name} LVKARE, imagen ilustrativa`}
          loading="lazy"
          width="800"
          height="800"
        />
        {p.label && <span className="product-badge">{p.label}</span>}
        <span className="product-view">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="product-meta">
        <span>{categories.find((c) => c.id === p.category)?.name}</span>
        <span>{p.options[0].label}</span>
      </div>
      <Link href={`/producto/${p.id}`}>
        <h3>{p.name}</h3>
      </Link>
      <p>{p.subtitle}</p>
      <div className="product-bottom">
        <strong>{money(p.price)}</strong>
        <button
          disabled={!ready}
          className={`quick-add ${added ? 'is-added' : ''}`}
          aria-label={`Agregar ${p.name} al carrito`}
          onClick={() => {
            try {
              add(p.id);
              setAdded(true);
              setError('');
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          {added ? <Check size={17} /> : <Plus size={17} />}
          <span>{added ? 'Agregado' : 'Agregar'}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {added ? `${p.name} agregado al carrito` : ''}
      </span>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </article>
  );
}
function Quantity({
  value,
  onChange,
  name = 'Cantidad',
}: {
  value: number;
  onChange: (n: number) => void;
  name?: string;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label={`Disminuir ${name}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <output aria-label={name}>{value}</output>
      <button
        type="button"
        aria-label={`Aumentar ${name}`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
function EmptyCart({ close }: { close?: () => void }) {
  return (
    <Empty className="empty-state">
      <EmptyHeader>
        <ShoppingBag size={42} strokeWidth={1.2} />
        <EmptyTitle className="empty-title">
          Tu próximo ritual te espera.
        </EmptyTitle>
        <EmptyDescription>
          Tu carrito está vacío. Encuentra algo que te haga sentir bien.
        </EmptyDescription>
      </EmptyHeader>
      <Link href="/productos" className="button primary" onClick={close}>
        Explorar productos <ArrowRight size={18} />
      </Link>
    </Empty>
  );
}
function CartLines() {
  const { cart, setQuantity, setCartOpen } = useCart();
  return (
    <div className="cart-lines">
      {cart.map((item) => {
        const p = getProduct(item.productId)!;
        return (
          <div className="cart-line" key={item.key}>
            <Link href={`/producto/${p.id}`} onClick={() => setCartOpen(false)}>
              <Image
                unoptimized
                src={p.image}
                alt={p.name}
                width="100"
                height="112"
              />
            </Link>
            <div className="cart-line-info">
              <Link
                href={`/producto/${p.id}`}
                onClick={() => setCartOpen(false)}
              >
                <h3>{p.name}</h3>
              </Link>
              <p>
                {p.options[item.option].label} · {money(unitPrice(item))} c/u
              </p>
              <Quantity
                name={`unidades de ${p.name}, ${p.options[item.option].label}`}
                value={item.quantity}
                onChange={(q) => setQuantity(item.key, q)}
              />
            </div>
            <div className="cart-line-end">
              <strong>{money(unitPrice(item) * item.quantity)}</strong>
              <button
                aria-label={`Eliminar ${p.name}, ${p.options[item.option].label}`}
                onClick={() => setQuantity(item.key, 0)}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CartSummary({ drawer = false }: { drawer?: boolean }) {
  const { cart, setCartOpen } = useCart();
  return (
    <div className="cart-summary">
      <div>
        <span>Subtotal</span>
        <strong>
          {money(cartTotal(cart))} <small>COP</small>
        </strong>
      </div>
      <p>
        El envío se confirma por WhatsApp según tu ubicación. El pago se acuerda
        al confirmar el pedido.
      </p>
      <Link
        href="/pedido"
        className="button primary full"
        onClick={() => setCartOpen(false)}
      >
        Continuar con mi pedido <ArrowRight size={18} />
      </Link>
      {drawer ? (
        <Link
          className="subtle-link"
          href="/carrito"
          onClick={() => setCartOpen(false)}
        >
          Ver y editar mi carrito
        </Link>
      ) : (
        <span className="checkout-caption">
          <MessageCircle size={15} /> Finaliza de forma personal por WhatsApp
        </span>
      )}
    </div>
  );
}
function Header() {
  const { cart, cartOpen, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // oxlint-disable-next-line react/react-compiler -- Close transient panels when external route navigation changes.
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
  }, [pathname, setCartOpen]);
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(
      `/productos${search.trim() ? `?buscar=${encodeURIComponent(search.trim())}` : ''}`,
    );
    setSearchOpen(false);
    setSearch('');
  }
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <div className="announcement">
        Pequeños rituales. Grandes momentos para ti. <Sparkles size={13} />
      </div>
      <header className="site-header">
        <button
          className="mobile-menu icon-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>
        <Link className="logo" href="/" aria-label="LVKARE, inicio">
          <Brand />
        </Link>
        <nav aria-label="Navegación principal">
          <Link
            className={pathname === '/productos' ? 'current' : ''}
            href="/productos"
          >
            Todos los productos
          </Link>
          {categories.slice(0, 3).map((c) => (
            <Link
              className={pathname === categoryUrl(c.id) ? 'current' : ''}
              key={c.id}
              href={categoryUrl(c.id)}
            >
              {c.name}
            </Link>
          ))}
          <Link
            className={pathname === '/nosotros' ? 'current' : ''}
            href="/nosotros"
          >
            Nuestro universo
          </Link>
        </nav>
        <div className="header-actions">
          <button
            aria-label="Buscar productos"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={21} strokeWidth={1.6} />
          </button>
          <button
            aria-label={`Abrir carrito, ${count} productos`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} strokeWidth={1.6} />
            <span className="cart-count">{count}</span>
          </button>
        </div>
      </header>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="menu-sheet"
          showCloseButton={false}
        >
          <SheetHeader>
            <SheetTitle>
              <Brand />
            </SheetTitle>
            <SheetDescription>Encuentra tu próximo ritual.</SheetDescription>
          </SheetHeader>
          <SheetClose className="close-panel" aria-label="Cerrar menú">
            <X size={22} />
          </SheetClose>
          <nav aria-label="Menú móvil" className="mobile-nav">
            <Link onClick={() => setMenuOpen(false)} href="/">
              Inicio <ArrowUpRight size={18} />
            </Link>
            <Link onClick={() => setMenuOpen(false)} href="/productos">
              Todos los productos <ArrowUpRight size={18} />
            </Link>
            {categories.map((c) => (
              <Link
                onClick={() => setMenuOpen(false)}
                key={c.id}
                href={categoryUrl(c.id)}
              >
                {c.name} <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link onClick={() => setMenuOpen(false)} href="/nosotros">
              Nuestro universo
            </Link>
            <Link onClick={() => setMenuOpen(false)} href="/ayuda">
              Preguntas frecuentes
            </Link>
            <Link onClick={() => setMenuOpen(false)} href="/contacto">
              Hablemos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-dialog" showCloseButton={false}>
          <DialogClose className="close-panel" aria-label="Cerrar búsqueda">
            <X size={22} />
          </DialogClose>
          <DialogTitle className="dialog-heading">
            Encuentra tu próximo favorito.
          </DialogTitle>
          <DialogDescription>
            Busca un producto, una categoría o un aroma.
          </DialogDescription>
          <form onSubmit={submit} className="search-form">
            <Input
              aria-label="Buscar productos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Prueba con shampoo o vainilla…"
              maxLength={100}
            />
            <button
              className="button primary"
              type="submit"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
          </form>
          <div className="search-shortcuts">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={categoryUrl(c.id)}
                onClick={() => setSearchOpen(false)}
              >
                {c.name} <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="cart-sheet" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle className="dialog-heading">
              Tu carrito <span className="title-count">{count}</span>
            </SheetTitle>
            <SheetDescription>
              Unos pequeños momentos, solo para ti.
            </SheetDescription>
          </SheetHeader>
          <SheetClose className="close-panel" aria-label="Cerrar carrito">
            <X size={22} />
          </SheetClose>
          {cart.length ? (
            <>
              <div className="drawer-scroll">
                <CartLines />
              </div>
              <CartSummary drawer />
            </>
          ) : (
            <EmptyCart close={() => setCartOpen(false)} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="logo" href="/">
            <Brand />
          </Link>
          <p>
            El placer de cuidarte,
            <br />
            todos los días.
          </p>
          <span className="country">COLOMBIA · COP $</span>
        </div>
        <div>
          <h3>Encuentra tu ritual</h3>
          {categories.map((c) => (
            <Link key={c.id} href={categoryUrl(c.id)}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Estamos para ti</h3>
          <Link href="/ayuda">Preguntas frecuentes</Link>
          <Link href="/envios">Envíos y pedidos</Link>
          <Link href="/contacto">Hablemos</Link>
        </div>
        <div className="footer-message">
          <Flower2 size={33} strokeWidth={1} />
          <p>
            Menos prisa.
            <br />
            <em>Más momentos para ti.</em>
          </p>
          <Link href="/nosotros" className="text-link">
            Conoce LVKARE <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LVKARE</span>
        <span>Catálogo y precios de muestra · Imágenes ilustrativas</span>
        <div>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Condiciones de compra</Link>
        </div>
      </div>
    </footer>
  );
}
function Home() {
  const [category, setCategory] = useState('todos');
  const featured =
    category === 'todos'
      ? products.slice(0, 4)
      : products.filter((p) => p.category === category).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CUIDARTE SE SIENTE BIEN</span>
          <h1>
            Tu ritual.
            <br />
            <em>Tu momento.</em>
          </h1>
          <p>
            Texturas que abrazan. Aromas que acompañan.
            <br />
            Encuentra ese pequeño lujo de todos los días.
          </p>
          <Link className="button primary" href="/productos">
            Encuentra tus favoritos <ArrowUpRight size={19} />
          </Link>
          <div className="hero-foot">
            <span>HECHO PARA DISFRUTAR</span>
            <span>01 — TODOS LOS DÍAS</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            unoptimized
            className="hero-photo"
            src="/images/hero.webp"
            alt="El ritual LVKARE: shampoo, crema y splash en una composición de tonos cereza y rosa"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="hero-stamp">
            <Flower2 size={28} strokeWidth={1} />
            <span>
              EL ARTE
              <br />
              DE CUIDARTE
            </span>
          </div>
          <span className="image-caption">
            Tu dosis diaria de amor propio. <span>LVKARE COLLECTION</span>
          </span>
        </div>
      </section>
      <div className="benefits">
        <span>
          <Flower2 size={19} strokeWidth={1.5} /> Cuidado para cada día
        </span>
        <span>
          <Sparkles size={18} strokeWidth={1.5} /> Cabello, piel y aromas
        </span>
        <span>
          <MessageCircle size={18} strokeWidth={1.5} /> Tu pedido, por WhatsApp
        </span>
      </div>
      <section id="coleccion" className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TUS NUEVOS IMPRESCINDIBLES</span>
            <h2>Un poquito de amor propio.</h2>
          </div>
          <Link className="text-link" href="/productos">
            Explorar la colección <ArrowUpRight size={18} />
          </Link>
        </div>
        <div
          className="category-pills"
          aria-label="Filtrar productos destacados"
        >
          <button
            className={category === 'todos' ? 'active' : ''}
            aria-pressed={category === 'todos'}
            onClick={() => setCategory('todos')}
          >
            Todo el cuidado
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? 'active' : ''}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="ritual-banner">
        <div className="ritual-image">
          <Image
            unoptimized
            src="/images/cream.webp"
            alt="Crema corporal LVKARE"
            width="800"
            height="800"
            loading="lazy"
          />
          <span className="ritual-image-note">
            Una pausa.
            <br />
            Mil sensaciones.
          </span>
        </div>
        <div className="ritual-copy">
          <span className="eyebrow">EL UNIVERSO LVKARE</span>
          <h2>
            No es solo cuidarte.
            <br />
            <em>Es elegirte.</em>
          </h2>
          <p>
            Creemos en esos pequeños momentos que cambian el día: el agua tibia,
            tu textura favorita, un aroma que se queda contigo. El cuidado
            empieza cuando te haces un espacio.
          </p>
          <Link className="text-link" href="/nosotros">
            Descubre nuestro universo <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section how-section">
        <div>
          <span className="eyebrow">ASÍ DE FÁCIL, ASÍ DE TUYO</span>
          <h2>
            De tu carrito
            <br />a tu próximo ritual.
          </h2>
        </div>
        <div className="how-steps">
          <div>
            <span>01</span>
            <h3>Elige lo que te gusta</h3>
            <p>Explora y agrega tus favoritos al carrito.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Arma tu ritual</h3>
            <p>Revisa tamaños, cantidades y el resumen.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Hablemos por WhatsApp</h3>
            <p>Envía tu pedido y confirma envío y pago.</p>
          </div>
        </div>
      </section>
    </>
  );
}
function Catalog({ category }: { category?: string }) {
  const params = useSearchParams();
  const searchParam = params.get('buscar') ?? '';
  const [sort, setSort] = useState('destacados');
  const [search, setSearch] = useState(searchParam);
  const c = categories.find((c) => c.id === category);
  if (category && !c) return <Missing />;
  const normalized = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  let filtered = products.filter(
    (p) =>
      (!category || p.category === category) &&
      normalized(
        `${p.name} ${p.subtitle} ${p.category} ${p.notes.join(' ')}`,
      ).includes(normalized(search.trim())),
  );
  if (sort === 'menor')
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'mayor')
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'nombre')
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  return (
    <>
      <div className="page-heading">
        <div className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <ChevronRight size={13} />
          {c ? (
            <>
              <Link href="/productos">Productos</Link>
              <ChevronRight size={13} />
              <span>{c.name}</span>
            </>
          ) : (
            <span>Productos</span>
          )}
        </div>
        <span className="eyebrow">ELIGE TU MOMENTO</span>
        <h1>{c?.name ?? 'Todo lo que te hace bien.'}</h1>
        <p>
          {c?.intro ??
            'Shampoo, cremas y aromas para disfrutar el cuidado, a tu manera.'}
        </p>
      </div>
      <section className="section catalog-section">
        <div className="category-pills catalog-categories">
          <Link className={!category ? 'active' : ''} href="/productos">
            Todo el cuidado
          </Link>
          {categories.map((c) => (
            <Link
              className={category === c.id ? 'active' : ''}
              key={c.id}
              href={categoryUrl(c.id)}
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="catalog-controls">
          <div className="catalog-search">
            <Search size={18} />
            <Input
              aria-label="Buscar en el catálogo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Busca tu próximo favorito"
              maxLength={100}
            />
            {search && (
              <button
                aria-label="Limpiar búsqueda"
                onClick={() => setSearch('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="sort-group">
            <span aria-live="polite">{filtered.length} productos</span>
            <Select
              value={sort}
              onValueChange={(v) => setSort(v ?? 'destacados')}
            >
              <SelectTrigger
                aria-label="Ordenar productos"
                className="sort-select"
              >
                <SelectValue>
                  {
                    (
                      {
                        destacados: 'Destacados',
                        menor: 'Menor precio',
                        mayor: 'Mayor precio',
                        nombre: 'Nombre A–Z',
                      } as Record<string, string>
                    )[sort]
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="destacados">Destacados</SelectItem>
                <SelectItem value="menor">Menor precio</SelectItem>
                <SelectItem value="mayor">Mayor precio</SelectItem>
                <SelectItem value="nombre">Nombre A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <Empty className="empty-state">
            <EmptyHeader>
              <Search size={38} strokeWidth={1} />
              <EmptyTitle className="empty-title">
                Todavía no encontramos ese favorito.
              </EmptyTitle>
              <EmptyDescription>
                Prueba otro nombre o explora todos los productos.
              </EmptyDescription>
            </EmptyHeader>
            {search && (
              <button className="button primary" onClick={() => setSearch('')}>
                Limpiar búsqueda
              </button>
            )}
            <Link className="text-link" href="/productos">
              Ver toda la colección <ArrowRight size={17} />
            </Link>
          </Empty>
        )}
        <p className="catalog-note">
          Precios de muestra en pesos colombianos. Consulta disponibilidad y
          valor final al confirmar tu pedido.
        </p>
      </section>
    </>
  );
}
function ProductDetail({ id }: { id: string }) {
  const p = getProduct(id);
  const { add, ready, setCartOpen } = useCart();
  const [option, setOption] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  if (!p) return <Missing />;
  const similar = products.filter(
    (item) => item.id !== id && item.category === p.category,
  );
  const related = (
    similar.length ? similar : products.filter((item) => item.id !== id)
  ).slice(0, 3);
  return (
    <>
      <section className="section product-detail-section">
        <div className="breadcrumbs">
          <Link href="/">Inicio</Link>
          <ChevronRight size={13} />
          <Link href={categoryUrl(p.category)}>
            {categories.find((c) => c.id === p.category)?.name}
          </Link>
          <ChevronRight size={13} />
          <span>{p.name}</span>
        </div>
        <div className="product-detail">
          <div className={`detail-image product-${p.category}`}>
            <Image
              unoptimized
              src={p.image}
              alt={`${p.name} LVKARE, imagen ilustrativa`}
              width="900"
              height="900"
            />
            {p.label && <span className="product-badge">{p.label}</span>}
            <span className="detail-image-label">
              LVKARE · TU RITUAL DIARIO
            </span>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">
              {categories.find((c) => c.id === p.category)?.name}
            </span>
            <h1>{p.name}</h1>
            <p className="detail-subtitle">{p.subtitle}</p>
            <p className="detail-price">
              {money(p.price + p.options[option].extra)} <small>COP</small>
            </p>
            <p className="detail-description">{p.description}</p>
            <div className="option-label">
              Presentación <span>{p.options[option].label}</span>
            </div>
            <fieldset className="size-options" aria-label="Presentación">
              {p.options.map((o, i) => (
                <button
                  key={o.label}
                  aria-pressed={option === i}
                  className={option === i ? 'selected' : ''}
                  onClick={() => setOption(i)}
                >
                  {o.label}
                </button>
              ))}
            </fieldset>
            <div className="detail-buy">
              <Quantity value={quantity} onChange={setQuantity} />
              <button
                className="button primary"
                disabled={!ready}
                onClick={() => {
                  try {
                    add(p.id, option, quantity);
                    setError('');
                    setCartOpen(true);
                  } catch (e) {
                    setError((e as Error).message);
                  }
                }}
              >
                Agregar al carrito <ShoppingBag size={18} />
              </button>
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="detail-assurances">
              <span>
                <MessageCircle size={17} /> Confirma tu pedido por WhatsApp
              </span>
              <span>
                <Truck size={18} /> Envío según tu ciudad en Colombia
              </span>
            </div>
            <Tabs defaultValue="detalles" className="detail-tabs">
              <TabsList variant="line">
                <TabsTrigger value="detalles">
                  Lo que te va a gustar
                </TabsTrigger>
                <TabsTrigger value="uso">Cómo usarlo</TabsTrigger>
              </TabsList>
              <TabsContent value="detalles">
                <ul>
                  {p.notes.map((note) => (
                    <li key={note}>
                      <Check size={15} />
                      {note}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="uso">
                <p>{p.use}</p>
                <p className="product-caution">
                  Consulta siempre la etiqueta del producto. Suspende su uso si
                  aparece irritación.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      <section className="section related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SE DISFRUTA MEJOR JUNTOS</span>
            <h2>Completa tu ritual.</h2>
          </div>
          <Link className="text-link" href="/productos">
            Ver la colección <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid related-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}
function CartPage() {
  const { cart, ready, storageWarning } = useCart();
  return (
    <section className="section cart-page">
      <Link className="back-link" href="/productos">
        <ArrowLeft size={17} /> Seguir explorando
      </Link>
      <div className="section-heading">
        <div>
          <span className="eyebrow">CASI ES TUYO</span>
          <h1>Tu carrito.</h1>
        </div>
        <span>{cart.reduce((n, i) => n + i.quantity, 0)} productos</span>
      </div>
      {!ready ? (
        <output className="loading-state">Recuperando tu carrito…</output>
      ) : cart.length ? (
        <div className="cart-page-grid">
          <CartLines />
          <CartSummary />
        </div>
      ) : (
        <EmptyCart />
      )}
      {storageWarning && (
        <p className="error">
          El navegador no permite guardar el carrito. Puedes hacer tu pedido
          ahora, pero no se conservará al cerrar la página.
        </p>
      )}
    </section>
  );
}
function OrderPage() {
  const { cart, ready } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    city: '',
    address: '',
    notes: '',
  });
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const message = cart.length ? orderMessage(cart, customer) : '';
  const url = message ? whatsappUrl(message) : '';
  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpened(true);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  function field(k: keyof Customer, value: string) {
    setCustomer((prev) => ({ ...prev, [k]: value }));
    setOpened(false);
    setCopied(false);
  }
  return (
    <section className="section order-page">
      <Link className="back-link" href="/carrito">
        <ArrowLeft size={17} /> Volver al carrito
      </Link>
      <span className="eyebrow">EL ÚLTIMO PASO, CONTIGO</span>
      <h1>
        Tu próximo ritual
        <br />
        <em>empieza aquí.</em>
      </h1>
      {!ready ? (
        <output className="loading-state">Recuperando tu carrito…</output>
      ) : !cart.length ? (
        <EmptyCart />
      ) : (
        <div className="order-grid">
          <div>
            <div className="order-explanation">
              <MessageCircle size={24} />
              <p>
                Dejamos tu pedido listo en un mensaje. Por WhatsApp confirmarás
                la disponibilidad, el envío y la forma de pago.
              </p>
            </div>
            <form onSubmit={submit} className="order-form">
              <div className="form-heading">
                <span>01</span>
                <h2>Cuéntanos de ti</h2>
              </div>
              <label htmlFor="customer-name">
                Tu nombre <span>*</span>
                <Input
                  id="customer-name"
                  required
                  autoComplete="name"
                  value={customer.name}
                  maxLength={80}
                  onChange={(e) => field('name', e.target.value)}
                  placeholder="¿Cómo te llamas?"
                  pattern=".*\S.*"
                />
              </label>
              <label htmlFor="customer-city">
                Ciudad o municipio en Colombia <span>*</span>
                <Input
                  id="customer-city"
                  required
                  autoComplete="address-level2"
                  value={customer.city}
                  maxLength={100}
                  onChange={(e) => field('city', e.target.value)}
                  placeholder="Ej. Medellín, Antioquia"
                  pattern=".*\S.*"
                />
              </label>
              <label htmlFor="customer-address">
                Dirección de entrega <small>Opcional</small>
                <Input
                  id="customer-address"
                  autoComplete="street-address"
                  value={customer.address}
                  maxLength={180}
                  onChange={(e) => field('address', e.target.value)}
                  placeholder="También puedes compartirla en el chat"
                />
              </label>
              <label htmlFor="customer-notes">
                ¿Algo que debamos saber? <small>Opcional</small>
                <Textarea
                  id="customer-notes"
                  value={customer.notes}
                  maxLength={500}
                  onChange={(e) => field('notes', e.target.value)}
                  placeholder="Una indicación de entrega, un regalo…"
                  rows={3}
                />
              </label>
              <p className="form-privacy">
                Tus datos se incluyen únicamente en el mensaje que decidas
                enviar. <Link href="/privacidad">Conoce cómo los usamos.</Link>
              </p>
              {!shop.whatsappNumber && (
                <div className="whatsapp-note">
                  <MessageCircle size={18} />
                  <p>
                    Por ahora, WhatsApp te pedirá elegir el chat de LVKARE. El
                    número directo de la marca se añadirá próximamente.
                  </p>
                </div>
              )}
              <button type="submit" className="button primary full">
                <MessageCircle size={20} /> Continuar en WhatsApp{' '}
                <ArrowUpRight size={18} />
              </button>
              <p className="checkout-caption">
                Todavía no se ha enviado ni cobrado tu pedido.
              </p>
            </form>
            {opened && (
              <output className="order-status">
                <Check size={22} />
                <div>
                  <strong>Tu mensaje está listo.</strong>
                  <p>
                    Revisa el chat y toca enviar en WhatsApp para continuar con
                    la marca. Tu carrito se conserva.
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    Abrir WhatsApp de nuevo <ArrowUpRight size={16} />
                  </a>
                </div>
              </output>
            )}
          </div>
          <aside className="order-summary">
            <div className="form-heading">
              <span>02</span>
              <h2>Tu ritual, en resumen</h2>
            </div>
            {cart.map((item) => {
              const p = getProduct(item.productId)!;
              return (
                <div className="order-item" key={item.key}>
                  <Image
                    unoptimized
                    src={p.image}
                    alt={p.name}
                    width="64"
                    height="75"
                  />
                  <div>
                    <strong>{p.name}</strong>
                    <p>
                      {p.options[item.option].label} · Cant. {item.quantity}
                    </p>
                  </div>
                  <span>{money(unitPrice(item) * item.quantity)}</span>
                </div>
              );
            })}
            <div className="order-subtotal">
              <span>Subtotal de productos</span>
              <strong>{money(cartTotal(cart))} COP</strong>
            </div>
            <div className="order-shipping">
              <span>Envío</span>
              <span>Por confirmar</span>
            </div>
            <p className="order-shipping-note">
              El total final se acuerda por WhatsApp antes del pago.
            </p>
            <Link href="/carrito" className="text-link">
              Editar mi carrito <ArrowUpRight size={16} />
            </Link>
            <Accordion className="message-accordion">
              <AccordionItem value="message">
                <AccordionTrigger>Ver el mensaje de mi pedido</AccordionTrigger>
                <AccordionContent>
                  <pre className="order-message">{message}</pre>
                  <button type="button" className="copy-button" onClick={copy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}{' '}
                    {copied ? 'Mensaje copiado' : 'Copiar mensaje'}
                  </button>
                  {copyError && (
                    <p role="alert">
                      No pudimos copiarlo. Selecciona el texto de arriba para
                      copiarlo manualmente.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>
        </div>
      )}
    </section>
  );
}
function About() {
  return (
    <>
      <section className="about-hero">
        <div>
          <span className="eyebrow">NUESTRO UNIVERSO</span>
          <h1>
            Un espacio
            <br />
            <em>para ti.</em>
          </h1>
          <p>
            LVKARE nace de una idea sencilla: el cuidado de todos los días
            también puede ser un momento que quieras repetir.
          </p>
          <Link className="button primary" href="/productos">
            Encuentra tu ritual <ArrowUpRight size={18} />
          </Link>
        </div>
        <Image
          unoptimized
          src="/images/hero.webp"
          alt="Colección de cuidado personal LVKARE"
          width="1000"
          height="1000"
        />
      </section>
      <section className="section about-values">
        <div>
          <span className="eyebrow">LO QUE NOS MUEVE</span>
          <h2>
            Hacer de lo cotidiano
            <br />
            algo que se sienta tuyo.
          </h2>
        </div>
        <div>
          <p>
            No necesitas una ocasión especial para cuidarte. A veces basta con
            tu aroma favorito o con unos minutos para darle a tu piel la
            atención que merece.
          </p>
          <p>
            Reunimos cuidado capilar, cremas corporales y fragancias en un mismo
            lugar, para que armes tu rutina a tu manera y encuentres esos
            pequeños detalles que disfrutas.
          </p>
        </div>
      </section>
      <div className="brand-principles section">
        <div>
          <Heart size={26} strokeWidth={1} />
          <h3>A tu manera</h3>
          <p>
            Elige las texturas, presentaciones y aromas que acompañan tu día.
          </p>
        </div>
        <div>
          <Flower2 size={28} strokeWidth={1} />
          <h3>En los pequeños momentos</h3>
          <p>
            Un ritual sencillo puede ser tu pausa favorita de todos los días.
          </p>
        </div>
        <div>
          <MessageCircle size={27} strokeWidth={1} />
          <h3>De cerca</h3>
          <p>
            Continúa tu pedido en una conversación para resolver tus dudas antes
            de comprar.
          </p>
        </div>
      </div>
    </>
  );
}
function FAQ() {
  return (
    <section className="section info-page">
      <span className="eyebrow">ESTAMOS PARA TI</span>
      <h1>
        Las pequeñas dudas,
        <br />
        <em>resueltas.</em>
      </h1>
      <p className="info-intro">
        Todo lo que necesitas para disfrutar tu próximo ritual.
      </p>
      <Accordion className="faq-list">
        {faqs.map(([q, a], i) => (
          <AccordionItem key={q} value={String(i)}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="help-bottom">
        <p>¿Te quedó alguna pregunta?</p>
        <Link className="text-link" href="/contacto">
          Hablemos <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
function Contact() {
  const [message, setMessage] = useState(
    '¡Hola, LVKARE! Me gustaría conocer más sobre sus productos.',
  );
  return (
    <section className="section contact-page">
      <div>
        <span className="eyebrow">DE CERCA, SIEMPRE</span>
        <h1>
          Hablemos
          <br />
          <em>de tu ritual.</em>
        </h1>
        <p>
          Consulta un producto, cuéntanos qué estás buscando o continúa con tu
          pedido. Una conversación hace todo más fácil.
        </p>
        <Link className="text-link" href="/ayuda">
          Consulta las preguntas frecuentes <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="contact-card">
        <MessageCircle size={34} strokeWidth={1.3} />
        <h2>Un mensaje y seguimos.</h2>
        <label htmlFor="contact-message">Tu mensaje</label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          rows={5}
        />
        {!shop.whatsappNumber && (
          <p className="small-note">
            El número directo de LVKARE está pendiente. Al abrir WhatsApp podrás
            elegir el chat al que enviar tu consulta.
          </p>
        )}
        <a
          className="button primary full"
          href={whatsappUrl(message.trim() || '¡Hola, LVKARE!')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir WhatsApp <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
const infoContent: Record<
  string,
  { eyebrow: string; title: string; sections: [string, string][] }
> = {
  envios: {
    eyebrow: 'TU PEDIDO, PASO A PASO',
    title: 'Del ritual a tu puerta.',
    sections: [
      [
        '1. Prepara tu carrito',
        'Selecciona los productos, sus presentaciones y cantidades. El carrito muestra el subtotal de los productos en pesos colombianos. Puedes editarlo antes de continuar.',
      ],
      [
        '2. Confirma por WhatsApp',
        'Completa el resumen con tu nombre y ciudad y abre WhatsApp. El mensaje incluye tu selección. Envía el mensaje a la marca para confirmar disponibilidad y condiciones del pedido.',
      ],
      [
        '3. Acuerda envío y pago',
        'La cobertura, el costo y el tiempo de entrega dependen de tu ciudad o municipio en Colombia y se confirman en la conversación. No se añade una tarifa de envío automática ni se realiza un cobro desde esta página.',
      ],
      [
        '4. Cambios o novedades',
        'Si necesitas cambiar un pedido ya enviado o tienes una novedad con la entrega, continúa en la misma conversación de WhatsApp. Conserva el resumen y los comprobantes que te comparta la marca.',
      ],
    ],
  },
  privacidad: {
    eyebrow: 'TU INFORMACIÓN',
    title: 'Privacidad, con claridad.',
    sections: [
      [
        'Tu carrito en este navegador',
        'Guardamos los productos, presentaciones y cantidades en el almacenamiento local de tu navegador para recuperar tu carrito al volver. Puedes eliminarlos desde el carrito o borrando los datos del sitio en tu navegador.',
      ],
      [
        'Los datos de tu pedido',
        'El nombre, la ciudad, la dirección opcional y las notas que escribes se usan para preparar un mensaje. Esta tienda no los guarda en una base de datos ni procesa datos bancarios. Los campos se mantienen solamente durante la sesión de la página.',
      ],
      [
        'Cuando abres WhatsApp',
        'Al continuar, el texto del pedido y los datos que hayas incluido se transfieren a WhatsApp mediante un enlace. Tú eliges el chat y decides si lo envías. Desde ese momento también aplican las condiciones y la política de privacidad de WhatsApp.',
      ],
      [
        'Servicios de la página',
        'El alojamiento puede registrar solicitudes técnicas necesarias para servir la página. La tipografía se carga desde Google Fonts. No hemos añadido herramientas de publicidad ni analítica a esta tienda.',
      ],
      [
        'Consultas',
        'Para consultar sobre un pedido o sobre datos que hayas enviado por WhatsApp, utiliza la misma conversación con la marca. El contacto directo de LVKARE se configurará antes de recibir pedidos reales.',
      ],
    ],
  },
  terminos: {
    eyebrow: 'ANTES DE TU PEDIDO',
    title: 'Comprar, con todo claro.',
    sections: [
      [
        'Catálogo de muestra',
        'Este sitio presenta un catálogo de ejemplo de LVKARE. Los nombres, descripciones, presentaciones, imágenes y precios se deben confirmar con la marca antes de realizar una compra real. Las imágenes son ilustrativas.',
      ],
      [
        'Precios y disponibilidad',
        'Todos los valores están expresados en pesos colombianos (COP). El subtotal corresponde a los productos elegidos y no incluye el envío. La disponibilidad, las características finales del producto y el valor total se confirman por WhatsApp antes del pago.',
      ],
      [
        'Confirmación y pago',
        'Agregar productos al carrito o abrir WhatsApp no confirma una compra ni genera un cobro. El pedido se acuerda directamente en la conversación con la marca, donde se informa el medio de pago disponible.',
      ],
      [
        'Envíos y novedades',
        'La cobertura, la tarifa y los tiempos de entrega se acuerdan según la ubicación. Para cambios, garantías o novedades, contacta a la marca en la conversación de tu pedido; estas condiciones no limitan los derechos que correspondan al comprador.',
      ],
      [
        'Uso de los productos',
        'Lee la etiqueta, las precauciones y las instrucciones finales antes de usar cada producto. Consulta la composición directamente con la marca si necesitas verificar un ingrediente.',
      ],
    ],
  },
};
function InfoPage({ page }: { page: string }) {
  const info = infoContent[page];
  return (
    <section className="section info-page">
      <span className="eyebrow">{info.eyebrow}</span>
      <h1>{info.title}</h1>
      <div className="info-sections">
        {info.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
      <Link className="text-link" href="/contacto">
        ¿Necesitas ayuda? Hablemos <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
function Missing() {
  return (
    <section className="section missing-page">
      <span className="eyebrow">404 · NOS SALIMOS DEL RITUAL</span>
      <h1>
        Este rincón
        <br />
        <em>no existe todavía.</em>
      </h1>
      <p>Volvamos a los productos para encontrar tu próximo favorito.</p>
      <Link href="/productos" className="button primary">
        Explorar la colección <ArrowRight size={18} />
      </Link>
    </section>
  );
}
export default function Storefront() {
  const pathname = usePathname();
  const searchKey = useSearchParams().get('buscar') ?? '';
  const path = pathname.split('/').filter(Boolean);
  let content;
  if (!path.length) content = <Home />;
  else if (path[0] === 'productos' && path.length <= 2)
    content = (
      <Catalog key={`${path[1] ?? 'all'}:${searchKey}`} category={path[1]} />
    );
  else if (path[0] === 'producto' && path.length === 2)
    content = <ProductDetail key={path[1]} id={path[1]} />;
  else if (path.length === 1) {
    switch (path[0]) {
      case 'carrito':
        content = <CartPage />;
        break;
      case 'pedido':
        content = <OrderPage />;
        break;
      case 'nosotros':
        content = <About />;
        break;
      case 'ayuda':
        content = <FAQ />;
        break;
      case 'contacto':
        content = <Contact />;
        break;
      case 'envios':
      case 'privacidad':
      case 'terminos':
        content = <InfoPage page={path[0]} />;
        break;
      default:
        content = <Missing />;
    }
  } else content = <Missing />;
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1}>
        {content}
      </main>
      <Footer />
      <Link
        href="/contacto"
        className="floating-whatsapp"
        aria-label="Ayuda y contacto por WhatsApp"
      >
        <MessageCircle size={25} strokeWidth={1.6} />
      </Link>
    </>
  );
}
