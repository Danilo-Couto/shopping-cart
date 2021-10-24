const getSavedCartItems = () => 
  localStorage.getItem('cartItems');

  /* 
  const savedCart = localStorage.getItem('cartItems'); // li's
  const cartItem = document.querySelector('.cart__items'); // ol
  cartItem.innerHTML = savedCart; // tags coms as li's
  
  document.querySelectorAll('.cart__items')
    .forEach((item) => item.addEventListener('click', (event) => {
      event.target.remove();
      localStorage.setItem('cartItems', cartItem.innerHTML);
    }));
 */ 

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}