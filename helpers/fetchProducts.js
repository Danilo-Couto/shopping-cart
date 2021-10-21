const fetchProducts = (param) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`)
  .then((response) => response.json())
  .then((data) => data);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}