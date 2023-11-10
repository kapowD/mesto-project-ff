// создание элемента

export const createCard = (
  element, 
  handleDeleteCard,
  handleLikeClick,
  handleImageClick
) => {
  const card = getTemplate();
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardDelete.addEventListener("click", handleDeleteCard);

  cardLike.addEventListener("click", handleLikeClick);

  cardImage.addEventListener("click", () => handleImageClick(element));

  return card;
};

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
};
// удаление элемента

export const handleDeleteCard = (evt) => {
  const card = evt.target.closest(".places__item");
  card.remove();
};
// лайк элемента
export const handleLikeClick = (evt) => {
  const card = evt.target;
  card.classList.toggle("card__like-button_is-active");
};
