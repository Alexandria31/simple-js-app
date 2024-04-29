
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

for (let i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height<0.7 ) {
    document.write(pokemonList[i].name + "a small pokemon" + "<br>");
  } else if (pokemonList[i].height>0.9) {
    document.write(pokemonList[i].name + "a big pokemon" + "<br>");
  } else {
    document.write(pokemonList[i].name + "a medium pokemon" + "<br>");
  }
}
