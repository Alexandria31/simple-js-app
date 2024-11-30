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
  function i(e) {
    o(e).then(function () {
      let t = document.querySelector("#pokemonModalLabel"),
        n = document.querySelector(".pokemon-image"),
        o = document.querySelector(".pokemon-height"),
        i = document.querySelector(".pokemon-weight"),
        r = document.querySelector(".pokemon-types");
      (t.innerText = e.name),
        (n.src = e.imageUrl),
        (o.innerText = `Height: ${e.height} ft`),
        (i.innerText = `Weight: ${e.weight} lbs`),
        (r.innerText = `Type(s): ${e.types.join(", ")}`),
        new bootstrap.Modal(document.getElementById("pokemonModal")).show();
    });
  }
  function r(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("div");
    n.classList.add("col-md-4", "mb-4");
    let o = document.createElement("div");
    o.classList.add("card");
    let r = document.createElement("button");
    (r.innerText = e.name),
      r.classList.add("btn", "btn-primary", "w-100"),
      r.addEventListener("click", function () {
        i(e);
      }),
      o.appendChild(r),
      n.appendChild(o),
      t.appendChild(n);
  }
  return (
    document
      .querySelector("#searchInput")
      .addEventListener("input", function (t) {
        t.preventDefault();
        !(function t(n) {
          let o = e.filter((e) =>
            e.name.toLowerCase().includes(n.toLowerCase())
          );
          (document.querySelector(".pokemon-list").innerHTML = ""),
            o.forEach((e) => r(e));
        })(document.querySelector("#searchInput").value);
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
      addListItem: r,
      showDetails: i,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
