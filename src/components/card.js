// создание элемента

import { likeCard, dislikeCard } from "./api.js";

export const createCard = (
  element,
  cardOpen,
  cardLikeFunc,
  elementDelete,
  myId
) => {
  const card = getTemplate();
  card.id = element["_id"];
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");
  const cardLikeCount = card.querySelector(".card__like-count");
  const searchId = element.likes.find((el) => el["_id"] === myId);
  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;

  if (element.owner["_id"] != myId) {
    cardDelete.style.display = "none";
  } else {
    cardDelete.addEventListener("click", () => {
      elementDelete(card.id);
    });
  }
  if (searchId) {
    cardLike.classList.add("card__like-button_is-active");
  }
  cardLike.addEventListener("click", () =>
    cardLikeFunc(cardLike, cardLikeCount, card.id)
  );

  cardImage.addEventListener("click", cardOpen);

  return card;
};

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
};

export const handleLikeClick = (likeButton, likeCountElement, cardId) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId).then((data) => {
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
};
