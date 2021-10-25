const cartItem = document.querySelector('.cart__items'); // ol
const productCard = document.querySelector('.items');
const subTotalTag = document.querySelector('.total-price');
const subtotal = [];
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
  console.log('atual:', subTotalTag.innerText);
  const subItem = event.target.innerText.split('$').pop();
  console.log('subItem:', subItem);
  subTotalTag.innerText -= subItem;
  event.target.remove();
//  return amount - subItem;
  saveCartItems(cartItem.innerHTML);
  saveAmountCartItems(subTotalTag.innerHTML);
  // localStorage.getItem('cartItems').length para tirar a key
  }

// elimina todos os itens do cart
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
  cartItem.innerHTML = '';
  subTotalTag.innerText = 0;
  localStorage.clear();
  saveCartItems(cartItem.innerHTML);
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
  const clickedProduct = await fetchItem(sku); // traz objeto com atributos do produto em questão
  const itemAdded = createCartItemElement(clickedProduct); // insere o item no cart
  cartItem.appendChild(itemAdded); 
  saveCartItems(cartItem.innerHTML); // salva a ol do jeito que esta no local storage
}
 
// cria os elementos de cada produto a ser exibido
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// soma os itens do cart
async function addAmount(sku) {
  const clickedProduct = await fetchItem(sku);
  subtotal.push(clickedProduct.price); // guarda o preco do item 
  const amount = subtotal.reduce((acc, curr) => acc + curr);
  subTotalTag.innerText = amount.toFixed(2);
  saveAmountCartItems(subTotalTag.innerHTML);
  // return saveAmountCart;
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
  button.addEventListener('click', () => addAmount(sku)); // funcao para somar
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
  // console.log('newArray:', newArray[0]);
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
  const li = document.querySelectorAll('.cart__item');
  if (!li.addEventListener) {
    li.forEach(((element) => element.addEventListener('click', cartItemClickListener)));
  }
  // if para apenas ativar quando clicdo na li
  subTotalTag.innerHTML = getSavedAmountCartItems();
};
