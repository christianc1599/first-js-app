let pokemonList = [
{name: "Espurr", height: "1", type: "psychic"},
{name: "Mismagius", height: "3", type: "ghost"},
{name: "Sceptile", height: "6", type: "grass"}
];

for (let i=0; i < 3; i++){
    if (pokemonList[i].height > 0 && pokemonList[i].height < 6){
      document.write(pokemonList[i].name + " Height= " + pokemonList[i].height + " feet tall, thats pretty small!" + " ");
    } else if (pokemonList[i].height > 5) {
        document.write(pokemonList[i].name + " Height= " + pokemonList[i].height + " feet tall, thats quite large!" + " ");
    }
  }
