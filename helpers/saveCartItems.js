// salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems. Todas as adições e remoções devem ser abordadas para que a lista esteja sempre atualizada.

const saveCartItems = (item) => {
  // seu código aqui
  localStorage.setItem('cartItems', item);
  
  /* const savedCart = localStorage.getItem('cartItems');
  const cartItem = document.querySelector('.cart__items');
  cartItem.innerHTML = savedCart;
  document.querySelectorAll('.cart__items')
    .forEach((item) => item.addEventListener('click', cartItemClickListener));
 */
  };
  
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}