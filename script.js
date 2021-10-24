/* const getSavedCartItems = require('./helpers/getSavedCartItems');
 */
const cartItem = document.querySelector('.cart__items'); // ol
const productCard = document.querySelector('.items');
// const subTotalTag = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// elimina o item clicado no cart
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItem.innerHTML);
  // localStorage.getItem('cartItems').length para tirar a key
  }

// elimina todos os itens do cart
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
  cartItem.innerHTML = '';
  subTotalTag.innerText = 0;
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

// Adiciona produto clicado ao cart
async function addItemsOnCart(sku) {
  const clickedProduct = await fetchItem(sku);
  // console.log(clickedProduct); // traz objeto com atributos do produto em questão
  const itemAdded = createCartItemElement(clickedProduct); // insere o item no cart
  cartItem.appendChild(itemAdded);  
  // createSubTotal(clickedProduct); // ???
  saveCartItems(cartItem.innerHTML); // salva a ol do jeito que esta no local storage
}
 
// cria os elementos de cada produto a ser exibido
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

/* const subtotal = [];

async function addAmount(sku) {
  const clickedProduct = await fetchItem(sku);
  subtotal.push(clickedProduct.price); // guarda o preco do item 
  // criar funcao que soma de acordo com os itens:
  // array guardando valores - ok
  // reduce para somar os elementos do array:
  const amount = subtotal.reduce((acc, curr) => acc + curr);
  subTotalTag.innerText = amount.toFixed(2);
  // return subTotalTag;
  localStorage.setItem('amount', subTotalTag.innerHTML);
}
 */
  // cria cada produto a ser exibido
function createProductItemElement({ id: sku, name: title, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(button);
  button.addEventListener('click', () => addItemsOnCart(sku));
  // button.addEventListener('click', () => addAmount(sku)); // funcao para somar
  return section;
}

// Captura o objeto json da API e cria um array com id, title e thumbnail 
async function arrayComputador() {
  const arrayComputers = await fetchProducts('computador');
  // console.log('arrayComputers:', arrayComputers[0].price);
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
  // console.log('newArray:', newArray[0]);
  newArray.forEach((element) => {
  const item = createProductItemElement(element); 
  productCard.appendChild(item);
  });
}
/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

function load() {
  const savedCart = getSavedCartItems();
  cartItem.innerHTML = savedCart;
  cartItem.addEventListener('click', cartItemClickListener);
}

window.onload = () => { 
  addProdutsOnScreen();  
  // getSavedCartItems();
  // localStorage.getItem('amount', subTotalTag.innerHTML);
  load();
};
