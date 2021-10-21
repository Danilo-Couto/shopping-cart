const fetchItem = (param) =>{
  return fetch(`https://api.mercadolibre.com/items/${param}`)
  .then((response) => response.json())
  // .then((data) => console.log(data));
  .then((data) => data);
}; 

// fetchItem('MLB1790675058');

/* ou 
  const fetchItem = async (param) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${param}`); 
  const json = await response.json(); 
  // console.log(json);
  return json;
};
fetchItem('MLB1790675058');
 */

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
