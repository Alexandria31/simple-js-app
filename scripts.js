let pokemonRepository = (function () {

let pokemonList = [
    {
      name: "balbasaur",
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: "charmander",
      height: 0.6,
      types: "fire"
    },
    {
      name: "butterfree",
      height: 1.1,
      types: ['bug, flying']
    }
]

function add(pokemon) {
  if (typeof pokemon === 'object') {
    pokemonList.push(pokemon);  
}  
}

function getAll() {
  return pokemonList;
}

return {
  add: add,
  getAll: getAll
};
})();

pokemonRepository.add({
name: "Kakuna", height: 2.00, type: ['Bug', 'Poison']
});

const pokemonLoop = pokemonRepository.getAll().forEach((pokemon) => {
if (pokemon.height<0.7 ) {
  document.write(pokemon.name + "a small pokemon" + "<br>");
} else if (pokemon.height>0.9) {
  document.write(pokemon.name + "a big pokemon" + "<br>");
} else {
  document.write(pokemon.name + "a medium pokemon" + "<br>");
}
})

for (let i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height<0.7 ) {
    document.write(pokemonList[i].name + "a small pokemon" + "<br>");
  } else if (pokemonList[i].height>0.9) {
    document.write(pokemonList[i].name + "a big pokemon" + "<br>");
  } else {
    document.write(pokemon.name + "a medium pokemon" + "<br>");
  }
}
