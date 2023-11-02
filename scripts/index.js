import { initialCards } from "./cards";

const placesList = document.querySelector(".places__list");
const content = document.querySelector("#card-template").content;

const createCard = (element) => {
  const card = content.querySelector(".places__item").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardDelete.addEventListener("click", deleteCard);
  return card;
};
function deleteCard() {
  //   const target = evt.target;
  //   const card = target.closest('.card');
  card.remove();
}

const renderCard = (cardElement) => {
    placesList.append(cardElement);
}

initialCards.forEach((card) => {
    renderCard(createCard(card));
});
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

