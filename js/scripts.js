let pokemonRepository = (function() {

let pokemonList = []
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

let modalContainer = document.querySelector('#modal-container');
function showModal(title, height, types, img) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div')
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText= 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1')
  titleElement.innerText = title;

  let heightElement = document.createElement('p');
  heightElement.innerText = 'Height: ' + height;

  let typeElement = document.createElement('p');
  typeElement.innerText = 'Type: ' + types

  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", img);
  imageElement.setAttribute("width", "304");
  imageElement.setAttribute("height", "228");
  imageElement.setAttribute("alt", "picture of pokemon");

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(heightElement);
  modal.appendChild(typeElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal)

  modalContainer.classList.add('is-visible');
}

function hideModal(){
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


function getAll() {
    return pokemonList;
}

function add (pokemon){
    return pokemonList.push(pokemon);
}

function addListItem(item) {
  let pokeList = document.querySelector('.poke-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = item.name;
  button.classList.add('button-custom')
  listItem.appendChild(button);
  pokeList.appendChild(listItem);

  button.addEventListener('click', function() {
    showDetails(item);
  });
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

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
  })
}

return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});

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
        loadDetails(pokemon).then(function(){
          showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
        })
      }

      listItem.appendChild(button);
      container.appendChild(listItem);

  });
 });
}
  makePokedex();


