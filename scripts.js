var pokemonRepository = (function () {
  let repository = [
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
    },
];

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon 
  ) {
    repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
function getAll() {
  return repository;
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-List");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button"); 
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  };
 
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () { showDetails(pokemon) });
  }

  //clicks then shows pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showDetails(pokemon.name.toUpperCase(), pokemon.height, pokemon.types);
    });
  }

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
};
}());

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Kakuna", height: 2.00, types: ['Bug', 'Poison']});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
