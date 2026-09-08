import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addItem,
  changeQuantity,
  cartTotal,
  orderMessage,
  whatsappUrl,
  sanitizeCart,
  unitPrice,
  products,
} from '../lib/shop.ts';
test('merges the same presentation and keeps other presentations separate', () => {
  let cart = addItem([], 'shampoo-nutricion', 0, 2);
  cart = addItem(cart, 'shampoo-nutricion', 0, 1);
  cart = addItem(cart, 'shampoo-nutricion', 1, 2);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].quantity, 3);
  assert.equal(cart[1].quantity, 2);
  assert.equal(unitPrice(cart[1]), 48900);
  assert.equal(cartTotal(cart), 196500);
});
test('quantity updates and removal recalculate the subtotal', () => {
  let cart = addItem([], 'crema-vainilla', 0, 2);
  cart = changeQuantity(cart, cart[0].key, 3);
  assert.equal(cartTotal(cart), 116700);
  cart = changeQuantity(cart, cart[0].key, 0);
  assert.equal(cart.length, 0);
  assert.equal(cartTotal(cart), 0);
});
test('invalid products, presentations and quantities do not mutate the cart', () => {
  const cart = addItem([], 'splash-rosa', 0, 1);
  const original = JSON.stringify(cart);
  for (const [id, option, quantity] of [
    ['unknown', 0, 1],
    ['splash-rosa', 99, 1],
    ['splash-rosa', 0, 0],
    ['splash-rosa', 0, -1],
    ['splash-rosa', 0, 1.5],
    ['splash-rosa', 0, 100],
  ])
    assert.throws(() => addItem(cart, id, option, quantity));
  assert.throws(() => changeQuantity(cart, cart[0].key, 100));
  assert.throws(() => changeQuantity(cart, cart[0].key, NaN));
  assert.equal(JSON.stringify(cart), original);
});
test('limits a presentation to 99 and rejects cumulative overflow', () => {
  const cart = addItem([], 'splash-rosa', 0, 99);
  assert.throws(() => addItem(cart, 'splash-rosa', 0, 1));
  assert.equal(cart[0].quantity, 99);
});
test('saved carts are normalized, validated and deduplicated', () => {
  assert.deepEqual(sanitizeCart(null), []);
  assert.deepEqual(sanitizeCart({}), []);
  const cart = sanitizeCart([
    null,
    { productId: 'bad', option: 0, quantity: 1 },
    { productId: 'splash-rosa', option: 0, quantity: 2, key: 'tampered' },
    { productId: 'splash-rosa', option: 0, quantity: 3 },
    { productId: 'shampoo-nutricion', option: 0, quantity: -1 },
    { productId: 'splash-rosa', option: 1, quantity: 1000 },
  ]);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].key, 'splash-rosa:0');
  assert.equal(cart[0].quantity, 5);
  assert.equal(cart[1].quantity, 99);
  assert.deepEqual(sanitizeCart(JSON.parse(JSON.stringify(cart))), cart);
});
test('WhatsApp includes every line, selected size, quantity, subtotal and customer details', () => {
  let cart = addItem([], 'shampoo-nutricion', 1, 2);
  cart = addItem(cart, 'splash-rosa', 0, 1);
  const message = orderMessage(cart, {
    name: 'María & José',
    city: 'Bogotá',
    address: 'Calle 10 # 2-30',
    notes: 'Regalo\nSin tarjeta',
  });
  assert.match(message, /Shampoo Nutrición · 500 ml/);
  assert.match(message, /2 ×/);
  assert.match(message, /Splash Rosa · 150 ml/);
  assert.match(message, /127\.700/);
  assert.match(message, /María & José/);
  assert.match(message, /Bogotá/);
  assert.match(message, /Calle 10 # 2-30/);
  assert.match(message, /Regalo Sin tarjeta/);
  assert.match(message, /Envío: por confirmar/);
  const url = new URL(whatsappUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(url.searchParams.size, 1);
});
test('direct WhatsApp destination can be configured without changing checkout', () => {
  const message = 'Hola & gracias # LVKARE';
  const url = new URL(whatsappUrl(message, '+57 300 123 4567'));
  assert.equal(url.pathname, '/573001234567');
  assert.equal(url.searchParams.get('text'), message);
  assert.throws(() => whatsappUrl(message, '12'));
});
test('empty carts cannot prepare an order', () => {
  assert.throws(() => orderMessage([]), /Agrega al menos/);
});
test('every configured product and presentation has a valid positive COP subtotal', () => {
  for (const p of products)
    for (let i = 0; i < p.options.length; i++) {
      const cart = addItem([], p.id, i, 1);
      assert.ok(Number.isSafeInteger(cartTotal(cart)));
      assert.ok(cartTotal(cart) > 0);
      assert.ok(orderMessage(cart).includes(p.options[i].label));
    }
});
