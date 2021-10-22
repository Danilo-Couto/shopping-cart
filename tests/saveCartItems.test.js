const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

// Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;

// Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems.

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test ('saveCartItems com o argumento <ol><li>Item</li></ol> chama o método localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(fetch).toHaveBeenCalled();
  })
  fail('Teste vazio');
});
