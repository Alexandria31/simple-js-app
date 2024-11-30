let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map((type) => type.type.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector("#pokemonModalLabel");
      let modalImage = document.querySelector(".pokemon-image");
      let modalHeight = document.querySelector(".pokemon-height");
      let modalWeight = document.querySelector(".pokemon-weight");
      let modalTypes = document.querySelector(".pokemon-types");

      modalTitle.innerText = pokemon.name;
      modalImage.src = pokemon.imageUrl;
      modalHeight.innerText = `Height: ${pokemon.height} ft`;
      modalWeight.innerText = `Weight: ${pokemon.weight} lbs`;
      modalTypes.innerText = `Type(s): ${pokemon.types.join(", ")}`;

      // $("#pokemonModal").modal("show");
      var modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
      modal.show();
    });
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4", "mb-4");

    let card = document.createElement("div");
    card.classList.add("card");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "w-100");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    card.appendChild(button);
    colDiv.appendChild(card);
    pokemonListElement.appendChild(colDiv);
  }

  function filterPokemon(query) {
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    // Clear the current list
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";

    // Display the filtered Pokémon
    filteredPokemon.forEach((pokemon) => addListItem(pokemon));
  }

  // Event listener for search form submission
  document
    .querySelector("#searchInput")
    .addEventListener("input", function (event) {
      event.preventDefault(); // Prevent the form from submitting
      let query = document.querySelector("#searchInput").value;
      filterPokemon(query);
    });

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// Load the list of Pokémon and display them
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
