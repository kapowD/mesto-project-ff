// создание элемента
const content = document.querySelector("#card-template").content;
export const createCard = (element, deleteCard, likeCard, openImage) => {
  const card = content.querySelector(".places__item").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardDelete.addEventListener("click", deleteCard);

  cardLike.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => openImage(element));

  return card;
};
// удаление элемента
export const handleDelete = (evt) => {
  const card = evt.target.closest(".places__item");
  card.remove();
};
// лайк элемента
export const handleLike = (evt) => {
  const card = evt.target;
  card.classList.toggle("card__like-button_is-active");
};
