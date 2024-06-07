let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
          pokemonList.push(pokemon);
      } else {
          console.log('pokemon is not correct');
      }
  }
  function getAll() {
      return pokemonList;
  }

  function addbuttonlistener(button, pokemon) {
      button.addEventListener('click', () => {
          showDetails(pokemon);
          console.log('pokemon.name');
      });
      //   button.addeventlistener('click', function () {
      //     this.style.backgroundColor = "red";
      // });
  }

  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-List');
      let listpokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      addbuttonlistener(button, pokemon);
  }

  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
          console.log(pokemon);
      });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
          .then(function (response) {
              return response.json();
          })
          .then(function (details) {
              // Now we add the details to the item
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
          })
          .catch(function (e) {
              console.error(e);
          });
  }

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      // loadList: loadList,
  };
})();

// console.log(pokemonList.getAll());
pokemonRepository.add({ name: 'Kakuna', height: 2.0, types: ['Bug', 'Poison'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});