// const { fetchProducts } = require('./helpers/fetchProducts');
// const { fetchItem } = require("./helpers/fetchItem");

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, title, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Adicione o elemento retornado da função createProductItemElement(product) como filho do elemento <section class="items">.

// criar array com id, title e thumbnail
async function arrayComputador() {
  const array = await fetchProducts('computador');
  const arrayProducts = array.map((element) =>
    ({ sku: element.id, title: element.title, image: element.thumbnail }));
    return arrayProducts;
}
/* async function printarrayComputador() {
console.log(await arrayComputador());
}
printarrayComputador();
*/

async function addProdutsOnScreen() {
  const classItems = document.querySelector('.items');
  const newArray = await arrayComputador();
    newArray.forEach((element) => {
    const item = createProductItemElement(element); 
    classItems.appendChild(item);
  });
}
addProdutsOnScreen(); 
 
// criar array com sku, name, salePrice
async function objComputador() {
  const obj = await fetchItem('MLB1790675058');
  // console.log(obj.price);
  const newObj = await { sku: obj.id, name: obj.title, salePrice: obj.price };
  return newObj;
  }
  
objComputador(); 

// Adicione o elemento retornado da função createCartItemElement(product) como filho do elemento <ol class="cart__items">

async function addItemsOnCart() {
  const cartItem = document.querySelector('.cart__items');
  const newObj = await objComputador();
  const itemAdded = await createCartItemElement(newObj);
  cartItem.appendChild(itemAdded);
  }
addItemsOnCart();
 
window.onload = () => { };
