let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function n(t) {
    e.push(t);
  }
  function o(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = t.types.map((e) => e.type.name));
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function r(e) {
    o(e).then(function () {
      let t = document.querySelector("#pokemonModalLabel"),
        n = document.querySelector(".pokemon-image"),
        o = document.querySelector(".pokemon-height"),
        r = document.querySelector(".pokemon-weight"),
        i = document.querySelector(".pokemon-types");
      (t.innerText = e.name),
        (n.src = e.imageUrl),
        (o.innerText = `Height: ${e.height} ft`),
        (r.innerText = `Weight: ${e.weight} lbs`),
        (i.innerText = `Type(s): ${e.types.join(", ")}`),
        new bootstrap.Modal(document.getElementById("pokemonModal")).show();
    });
  }
  function i(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("div");
    n.classList.add("col-md-4", "mb-4");
    let o = document.createElement("div");
    o.classList.add("card");
    let i = document.createElement("button");
    (i.innerText = e.name),
      i.classList.add("btn", "btn-primary", "w-100"),
      i.addEventListener("click", function () {
        r(e);
      }),
      o.appendChild(i),
      n.appendChild(o),
      t.appendChild(n);
  }
  function l(t) {
    let n = e.filter((e) => e.name.toLowerCase().includes(t.toLowerCase()));
    (document.querySelector(".pokemon-list").innerHTML = ""),
      n.forEach((e) => i(e));
  }
  return (
    document
      .querySelector("#searchInput")
      .addEventListener("input", function (e) {
        console.log("Input event triggered with value:", e.target.value);
        l(e.target.value);
      }),
    document
      .querySelector("#searchForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        l(document.querySelector("#searchInput").value);
      }),
    {
      add: n,
      getAll: t,
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              n({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: o,
      addListItem: i,
      showDetails: r,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
