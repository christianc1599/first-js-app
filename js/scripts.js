let pokemonList = [
{name: "Espurr", height: "1", type: "psychic"},
{name: "Mismagius", height: "3", type: "ghost"},
{name: "Sceptile", height: "6", type: "grass"}
];
let pokemonList2 = [
{name: "Delphox", height: "5", type: "fire"},
{name: "Shuppet", height: "2", type: "ghost"},
{name: "Milotic", height: "20", type: "water"}
]

function printArrayDetails(list){
for (let i=0; i < list.length; i++){
    if (list[i].height > 0 && list[i].height < 6){
      document.write(list[i].name + " Height= " + list[i].height + " feet tall, thats pretty small!" + " ");
    } else if (pokemonList[i].height > 5) {
        document.write(list[i].name + " Height= " + list[i].height + " feet tall, thats quite large!" + " ");
    }
  }
}

printArrayDetails(pokemonList);
