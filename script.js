// const { fetchProducts } = require('./helpers/fetchProducts');

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

// criar array com id, title e thumbnail
  async function arrayComputador() {
    const array = await fetchProducts('computador');
    return array.map((element) =>
      ({ sku: element.id, title: element.title, image: element.thumbnail }));
  }
/* async function printarrayComputador() {
  console.log(await arrayComputador());
}
printarrayComputador();
 */

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

/* function cartItemClickListener(event) {
  // coloque seu código aqui
} */

/* function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} */

// Adicione o elemento retornado da função createProductItemElement(product) como filho do elemento <section class="items">.

async function addProdutsOnScreen() {
  const classItems = document.querySelector('.items');
  const newArray = await arrayComputador();
    newArray.forEach((element) => {
    const item = createProductItemElement(element); 
    classItems.appendChild(item);
  });
}
  
addProdutsOnScreen();
  
window.onload = () => { };