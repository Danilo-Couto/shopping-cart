// const { fetchProducts } = require('./helpers/fetchProducts');
// const { fetchItem } = require("./helpers/fetchItem");

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// cria elementos de cada produto
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// cria cada produto
function createProductItemElement({ id: sku, name: title, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', () => addItemsOnCart(sku));

  return section;
}

// 1. funcao que captura o objeto json da API e cria um array com id, title e thumbnail 
async function arrayComputador() {
  const arrayComputers = await fetchProducts('computador');
  // console.log(arrayComputers);
  const arrayProducts = arrayComputers.map((element) =>
    ({ id: element.id, name: element.title, image: element.thumbnail }));
    return arrayProducts;
}
/* async function printarrayComputador() {
console.log(await arrayComputador());
}
printarrayComputador();
*/

// 2. funcao que adiciona o array dos produtos à tela:
async function addProdutsOnScreen() {
  const classItems = document.querySelector('.items');
  const newArray = await arrayComputador();
    newArray.forEach((element) => {
    const item = createProductItemElement(element); 
    classItems.appendChild(item);
  });
}
/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

function cartItemClickListener() {
  //
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// 3. funcao que adiciona produto clicado ao cart
async function addItemsOnCart(sku) {
  const cartItem = document.querySelector('.cart__items');
  const clickedProduct = await fetchItem(sku);
  //
  const itemAdded = createCartItemElement(clickedProduct);
  cartItem.appendChild(itemAdded);
  }

window.onload = () => { 
  addProdutsOnScreen();
};
