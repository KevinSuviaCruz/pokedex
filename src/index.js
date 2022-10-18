/* eslint-disable no-console */
// - Consultar documentación
// - Listar pokemones, y poder cambiar de página'
// - Ver detalles de 1 pokemón, incluyendo al menos 1 foto.

const $mainCard = document.querySelector('#main__card');
const $buttonNext = document.querySelector('#button-next');
const $buttonBack = document.querySelector('#button-back');
const $pages = document.querySelector('#pages');
let pages = 1;

function removePokemons() {
  const $cardPokemon = document.querySelectorAll('#card-pokemon');
  for (let i = 0; i < $cardPokemon.length; i += 1) {
    $mainCard.removeChild($cardPokemon[i]);
  }
}

function countPages(page) {
  $pages.textContent = `${page} de 10`;
  console.log(page);
}

function showPokemon(image, name, baseExperience) {
  const $cardPokemon = document.createElement('div');
  $cardPokemon.classList.add('card__pokemon');
  $cardPokemon.id = 'card-pokemon';
  const $cardImage = document.createElement('img');
  $cardImage.classList.add('card__pokemon-image');
  $cardImage.id = 'card-image';
  $cardImage.src = image;
  const $cardText = document.createElement('p');
  $cardText.classList.add('card__pokemon-text-name');
  $cardText.textContent = `Name: ${name}`;
  const $cardText2 = document.createElement('p');
  $cardText2.classList.add('card__pokemon-text-name');
  $cardText2.textContent = `Base experience: ${baseExperience}`;
  $cardPokemon.appendChild($cardImage);
  $cardPokemon.appendChild($cardText);
  $cardPokemon.appendChild($cardText2);
  $mainCard.append($cardPokemon);
}

function spendPokemon(pokemon) {
  pokemon.forEach((key) => {
    fetch(key.url)
      .then((resolve) => resolve.json())
      .then((resolveJSON) => {
        const $name = key.name;
        const $baseExperience = resolveJSON.base_experience;
        showPokemon(resolveJSON.sprites.front_default, $name, $baseExperience);
      })
      .catch((error) => console.error('ERROR', error));
  });
}

function backPages(pokemon, first, last, cardPokemonArray, arrayPokemon) {
  let array = arrayPokemon;
  let firstPokemon = first;
  let lastPokemon = last;
  $buttonBack.onclick = () => {
    if (pages > 1) {
      removePokemons();
      pages -= 1;
      array = [];
      firstPokemon -= cardPokemonArray;
      lastPokemon -= cardPokemonArray;
      for (let i = firstPokemon; i < lastPokemon; i += 1) {
        array.push(pokemon.results[i]);
      }
      countPages(pages);
      spendPokemon(array);
      return nextPage(pokemon, firstPokemon, lastPokemon, cardPokemonArray, array);
    }
    return false;
  };
}

function nextPage(
  pokemon,
  fisrtPokemonArray,
  lastPokemonArray,
  cardPokemonArray,
  arrayPokemon,
) {
  const cardPokemon = cardPokemonArray;
  let array = arrayPokemon;
  let firstPokemon = fisrtPokemonArray;
  let lastPokemon = lastPokemonArray;
  $buttonNext.onclick = () => {
    if (pages < 10) {
      removePokemons();
      pages += 1;
      array = [];
      firstPokemon += cardPokemon;
      lastPokemon += cardPokemon;
      for (let i = firstPokemon; i < lastPokemon; i += 1) {
        array.push(pokemon.results[i]);
      }
      backPages(
        pokemon,
        firstPokemon,
        lastPokemon,
        cardPokemon,
        array,
      );
      countPages(pages);
      return spendPokemon(array);
    }
    return false;
  };
}

function cardsPokemon(pokemon) {
  const fisrtPokemonArray = 0;
  const lastPokemonArray = 12;
  const cardPokemonArray = 12;
  const arrayPokemon = [];
  nextPage(
    pokemon,
    fisrtPokemonArray,
    lastPokemonArray,
    cardPokemonArray,
    arrayPokemon,
  );
  for (let i = fisrtPokemonArray; i < lastPokemonArray; i += 1) {
    arrayPokemon.push(pokemon.results[i]);
  }
  return spendPokemon(arrayPokemon);
}

fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=120')
  .then((resolve) => resolve.json())
  .then((resolveJSON) => {
    cardsPokemon(resolveJSON);
  })
  .catch((error) => console.error('ERROR', error));
