let pokemonRepository = (function() {

let pokemonList = []
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


function getAll() {
    return pokemonList;
}

function add (pokemon){
    return pokemonList.push(pokemon);
}

function loadList() {
  return fetch(apiUrl).then(function(response) {
    return response.json()
  }).then (function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch (function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response){
    return response.json();
  }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
  }).catch(function(e) {
    console.error(e)
  });
}

function showDetails(pokemon){
  loadDetails(pokemon).then(function() {
    console.log(pokemon);
  })
}

return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails
};
})();

function makePokedex(){
    var container = document.querySelector('.poke-list');
  pokemonRepository.loadList().then (function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
  
      let listItem = document.createElement('li');
  
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
  
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
      function showDetails(pokemon){
        console.log(pokemon);
      }

      listItem.appendChild(button);
      container.appendChild(listItem);

  });
 });
}
  makePokedex();



