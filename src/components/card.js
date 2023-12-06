// создание элемента

import {likeCard, dislikeCard} from './api.js';

export const createCard = (
  element,
  { handleDeleteCard, handleLikeClick, handleImageClick }
) => {
  const card = getTemplate();
  const cardId = element['_id'];
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");
  const cardLikeCount = card.querySelector(".card__like-count") 

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;
  

  cardDelete.addEventListener("click", handleDeleteCard);

  cardLike.addEventListener("click", ()=> handleLikeClick(cardLike, cardLikeCount, cardId));

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
function handleLikeCard(likeButton, likeCountElement, cardId){

  if ( likeButton.classList.contains('card__like-button_is-active') ) {

    disLikeCard(cardId)
    .then(res => res.json())
    .then(data => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
    })

  } else {

    likeCard(cardId)
    .then(res => res.json())
    .then(data => {
      likeButton.classList.add('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
    })

  }

}