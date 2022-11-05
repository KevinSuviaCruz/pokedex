import {
  removePokemons,
  countPages,
  showPokemon,
  $buttonBack,
  $buttonNext,
} from './ui.js';

// export let pages = 1;

export function spendPokemon(pokemon) {
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

export function backPages(pokemon, first, last, cardPokemonArray, arrayPokemon, page) {
  let array = arrayPokemon;
  let firstPokemon = first;
  let lastPokemon = last;
  let pages = page;
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

export function nextPage(
  pokemon,
  fisrtPokemonArray,
  lastPokemonArray,
  cardPokemonArray,
  arrayPokemon,
  pages,
) {
  const cardPokemon = cardPokemonArray;
  let array = arrayPokemon;
  let firstPokemon = fisrtPokemonArray;
  let lastPokemon = lastPokemonArray;
  let page = pages;
  $buttonNext.onclick = () => {
    if (page < 10) {
      removePokemons();
      page += 1;
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
        page,
      );
      countPages(page);
      return spendPokemon(array);
    }
    return false;
  };
}

export function cardsPokemon(pokemon) {
  const fisrtPokemonArray = 0;
  const lastPokemonArray = 12;
  const cardPokemonArray = 12;
  const arrayPokemon = [];
  const pages = 1;
  nextPage(
    pokemon,
    fisrtPokemonArray,
    lastPokemonArray,
    cardPokemonArray,
    arrayPokemon,
    pages,
  );
  for (let i = fisrtPokemonArray; i < lastPokemonArray; i += 1) {
    arrayPokemon.push(pokemon.results[i]);
  }
  return spendPokemon(arrayPokemon);
}
export function iniciar() {
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=960')
    .then((resolve) => resolve.json())
    .then((resolveJSON) => {
      cardsPokemon(resolveJSON);
    })
    .catch((error) => console.error('ERROR', error));
}
