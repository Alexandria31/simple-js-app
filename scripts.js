const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector('.pokemon-list');
    const listItem = document.createElement('li');
    const button = document.createElement('button');
  
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    // Add event listener to the button to show details on click
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        addListItem(pokemon);  // Ensure addListItem is called here
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Adding details to the pokemon object
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types.map((typeInfo) => typeInfo.type.name).join(', ');
    });
  }
 function showDetails(pokemon) {
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = modalContainer.querySelector('h2');
    const modalText = modalContainer.querySelector('p');
    const modalLoader = modalContainer.querySelector('.loader');
   const modal = document.querySelector('.modal');
  
// //  Display loader while fetching details
//     modalLoader.style.display = 'block';
//     modalText.style.display = 'none';
   
   modalTitle.innerText = '';
   modalText.innerText = '';
   const existingImage = modal.querySelector('img');
   if (existingImage) {
     existingImage.remove();
   }

    loadDetails(pokemon).then(function () {
      modalTitle.innerText = pokemon.name;
      modalText.innerText = `Height: ${pokemon.height} \n Types: ${pokemon.types}`;

      const modalImage = document.createElement('img');
      modalImage.src = pokemon.imageUrl;
      modalText.appendChild(modalImage);
      // modal.appendChild(modalImage);
      // modalTitle.appendChild(modalImage);
      
 // Hide loader and display details
      modalLoader.style.display = 'none';
      modalText.style.display = 'block'; 
      modalImage.style.display = 'block';
    });

    modalContainer.style.display = 'flex';
  }

 return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Load the Pokémon list on page load
document.addEventListener('DOMContentLoaded', function() {
  pokemonRepository.loadList();
});

document.getElementById('show-modal').addEventListener('click', function() {
  document.getElementById('modal-container').style.display = 'flex';
});

document.querySelector('.modal-close').addEventListener('click', function() {
  document.getElementById('modal-container').style.display = 'none';
});
