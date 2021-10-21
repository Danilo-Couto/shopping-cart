const fetchProducts = (param) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${param}`)
  .then((response) => response.json())
  .then((data) => data.results);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}