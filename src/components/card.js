// создание элемента

import { likeCard, dislikeCard } from "./api.js";

export const createCard = (element,  cardOpen, cardLikeFunc) => { //(element, cardDelet, cardOpen, cardLikeFunc) 
  const card = getTemplate();
  const cardId = element["_id"];
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");
  const cardLikeCount = card.querySelector(".card__like-count");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;

  //cardDelete.addEventListener("click", handleDeleteCard); 
  // if (cardData.owner['_id'] != '0a4ac5110e6af2907d16b39b') {
  //   cardDeleteButton.style.display = 'none';
  // }else {
  //   // cardDeleteButton.addEventListener('click', delFunc);
  //   cardDeleteButton.addEventListener('click', () => {
  //     popDelOpnFunc(cardID);
  //   });
  // }

  cardLike.addEventListener("click", () =>
    cardLikeFunc(cardLike, cardLikeCount, cardId)
  );

  cardImage.addEventListener("click", cardOpen); // () => handleImageClick(element)

  return card;
};

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
};

export function handleLikeClick(likeButton, likeCountElement, cardId) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = data.likes.length;
      });
  } else {
    likeCard(cardId)
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// создание элемента архивное

// export const createCard = (
//   element,
//   { handleDeleteCard, handleLikeClick, handleImageClick }
// ) => {
//   const card = getTemplate();
//   const cardTitle = card.querySelector(".card__title");
//   const cardImage = card.querySelector(".card__image");
//   const cardDelete = card.querySelector(".card__delete-button");
//   const cardLike = card.querySelector(".card__like-button");

//   cardTitle.textContent = element.name;
//   cardImage.src = element.link;
//   cardImage.alt = element.name;
//   console.log( handleDeleteCard, handleLikeClick, handleImageClick)
//   cardDelete.addEventListener("click", handleDeleteCard);

//   cardLike.addEventListener("click", handleLikeClick);

//   cardImage.addEventListener("click", () => handleImageClick(element));

//   return card;
// };

// const getTemplate = () => {
//   return document
//     .querySelector("#card-template")
//     .content.querySelector(".places__item")
//     .cloneNode(true);
// };
// // удаление элемента

// export const handleDeleteCard = (evt) => {
//   const card = evt.target.closest(".places__item");
//   card.remove();
// };
// // лайк элемента
// export const handleLikeClick = (evt) => {
//   const card = evt.target;
//   card.classList.toggle("card__like-button_is-active");
// };
