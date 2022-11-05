export const $mainCard = document.querySelector('#main__card');
export const $buttonNext = document.querySelector('#button-next');
export const $buttonBack = document.querySelector('#button-back');
export const $pages = document.querySelector('#pages');
// const pages = 1;

export function removePokemons() {
  const $cardPokemon = document.querySelectorAll('#card-pokemon');
  for (let i = 0; i < $cardPokemon.length; i += 1) {
    $mainCard.removeChild($cardPokemon[i]);
  }
}

export function countPages(page) {
  $pages.textContent = `${page} de 10`;
  console.log(page);
}

export function showPokemon(image, name, baseExperience) {
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
