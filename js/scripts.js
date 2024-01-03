let pokemonRepository = (function() {

let pokemonList = [
{name: "Espurr", height: "1", type: "psychic"},
{name: "Mismagius", height: "3", type: "ghost"},
{name: "Delphox", height: "5", type: "fire"},
{name: "Shuppet", height: "2", type: "ghost"},
{name: "Sceptile", height: "6", type: "grass"},
{name: "Milotic", height: "20", type: "water"}
]

function getAll() {
    return pokemonList;
}

function add (pokemon){
    return pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add
};
})();

function makePokedex(){
    var container = document.querySelector('.poke-list');
  
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
  }
  makePokedex();


//document.write(pokemon.name + ' is ' + pokemon.height + ' feet tall and is a ' + pokemon.type + ' type. ');

/*for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 0 && pokemonList[i].height <= 5){
      document.write(pokemonList[i].name + " Height= " + pokemonList[i].height + " feet tall, thats pretty small!" + " ");
  } else if (pokemonList[i].height > 5) {
    document.write(pokemonList[i].name + " Height= " + pokemonList[i].height + " feet tall, thats quite large!" + " ");
  }
}*/


/*function myLoopFunction(pokemon) {
    document.write(pokemon.name + ' is ' + pokemon.height + ' feet tall and is a ' + pokemon.type + ' type. ');
}
pokemonList.forEach(myLoopFunction);*/

