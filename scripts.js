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

function addbuttonlistener(button, pokemon) {
  button.addEventListener("click", () => {
     showDetails(pokemon);
    console.log("pokemon.name");
  });
//   button.addeventlistener('click', function () {
//     this.style.backgroundColor = "red";
// });
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-List");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button"); 
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  addbuttonlistener(button, pokemon);
  };
 
function showDetails(pokemon) {
  console.log (pokemon);
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
