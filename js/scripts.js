let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (detailedPokemon) {
      showModal(detailedPokemon);
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // console.log(details);
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;

        return item;
      })
      .catch(function (e) {
        console.error(e);
        throw e;
      });
  }
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    imageElement.attr("alt", item.name + " Image");
    let heightElement = $("<p>" + "height: " + item.height + "</p>");
    let typesString = item.types.map((type) => type.type.name).join(", ");
    let typesElement = $("<p>" + "type: " + typesString + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  function addListItem(pokemon) {
    let ulItem = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.innerText = pokemon.name;

    button.classList.add("btn-primary");
    listItem.classList.add("list-group-item");
    listItem.appendChild(button);
    ulItem.appendChild(listItem);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
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
            //imageUrl: "",
          };

          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
