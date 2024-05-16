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

let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonList.forEach(pokemon => {
  if (pokemon.height<0.7 ) {
    document.write(pokemon.name + "a small pokemon" + "<br>");
  } else if (pokemon.height>0.9) {
    document.write(pokemon.name + "a big pokemon" + "<br>");
  } else {
    document.write(pokemon.name + "a medium pokemon" + "<br>");
  }
})
