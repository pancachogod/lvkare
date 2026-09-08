# LVKARE

Tienda de cuidado personal en español, con catálogo de muestra y precios en COP. El proyecto anterior de la carpeta superior se conserva intacto.

## Editar la marca y el catálogo

`lib/shop.ts` concentra el catálogo, categorías, presentaciones y precios. Los precios son pesos colombianos enteros. `shop.whatsappNumber` está vacío por decisión del propietario: WhatsApp abre el selector de chat con el pedido precargado. Para conectar el destinatario directamente, agregar el número completo con indicativo (57 para Colombia), solo dígitos.

Los productos, textos comerciales y fotos son ilustrativos; deben reemplazarse por los datos reales antes de recibir pedidos reales. No se cobra ni se envían mensajes automáticamente. El envío y el pago se acuerdan por WhatsApp.

## Desarrollo

- `npm install`
- `npm run dev`
- `npm run build`
- `npm exec tsc -- --noEmit`
- `node --experimental-strip-types --test tests/cart.test.mjs`
- `npm exec oxlint -- app lib tests`

El código vendorizado del starter (`components/ui` y `hooks`) conserva sus avisos de lint originales y no se modifica.

## Vistas

Inicio, catálogo con búsqueda/filtros/orden, cuatro categorías, ocho fichas de producto con presentaciones, carrito lateral y completo, formulario de pedido, historia de marca, ayuda, contacto, envíos, privacidad, condiciones y página 404. El carrito se guarda únicamente en este navegador y se valida antes de restaurarlo.

## Verificación

Las pruebas cubren combinación de presentaciones, cantidades, eliminación, límites, restauración segura, subtotales y codificación del mensaje de WhatsApp. No se realiza ningún envío durante las pruebas.

Se incluye una interfaz WebMCP opcional para leer catálogo/carrito, agregar lotes y preparar un pedido sin enviarlo. Se activa solo si `document.modelContext` existe. No hubo un contexto WebMCP compatible disponible para verificar el contrato en vivo; su validación queda pendiente. No se solicitó prueba visual de navegador.
