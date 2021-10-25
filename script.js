const cartItem = document.querySelector('.cart__items'); // ol
const productCard = document.querySelector('.items');
const ttt = '.total-price';
const subTotalStr = document.querySelector(ttt).innerHTML;
let subTotal = Number(subTotalStr);
const saveAmountCartItems = (item) => localStorage.setItem('amount', item);
const getSavedAmountCartItems = () => localStorage.getItem('amount');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// elimina o item clicado no cart
function cartItemClickListener(event) {
  event.target.remove();
  const subItem = Number(event.target.innerText.split('$').pop());
  subTotal -= subItem;
  document.querySelector(ttt).innerHTML = subTotal;
  saveAmountCartItems(subTotal);
  saveCartItems(cartItem.innerHTML);
  }

// elimina todos os itens do cart
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
  cartItem.innerHTML = '';
  document.querySelector(ttt).innerHTML = 0.00;
  localStorage.clear();
  // saveCartItems(cartItem.innerHTML);
  });

// cria element para o cart
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// soma os itens do cart
async function addAmount(price) {
  subTotal += price;
  document.querySelector(ttt).innerText = subTotal;
  saveAmountCartItems(subTotal);
}

// Adiciona produto clicado ao cart
async function addItemsOnCart(sku) {
  const clickedProduct = await fetchItem(sku); // traz objeto com atributos do produto em questão
  const itemAdded = createCartItemElement(clickedProduct); // insere o item no cart
  cartItem.appendChild(itemAdded); 
  addAmount(clickedProduct.price);
  saveCartItems(cartItem.innerHTML); // salva a ol do jeito que esta no local storage
  saveAmountCartItems(subTotal);
}
 
// cria os elementos de cada produto a ser exibido
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

  // cria cada produto a ser exibido
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

// Captura o objeto json da API e cria um array com id, title e thumbnail 
async function arrayComputador() {
  const arrayComputers = await fetchProducts('computador');
  const arrayProducts = arrayComputers.map((element) =>
    ({ id: element.id, name: element.title, image: element.thumbnail, price: element.price }));
    return arrayProducts;
}
/* async function printarrayComputador() {
console.log(await arrayComputador());
}
printarrayComputador();
*/

// Adiciona o array dos produtos à tela:
async function addProdutsOnScreen() {
  const newArray = await arrayComputador();
  newArray.forEach((element) => {
  const item = createProductItemElement(element); 
  productCard.appendChild(item);
  });
}
/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

window.onload = () => { 
  addProdutsOnScreen();  
  cartItem.innerHTML = getSavedCartItems();
  subTotal = getSavedAmountCartItems();
  document.querySelector(ttt).innerText = subTotal;
  
  const li = document.querySelectorAll('.cart__item');
  if (!li.addEventListener) {
    li.forEach(((element) => element.addEventListener('click', cartItemClickListener)));
  }
};