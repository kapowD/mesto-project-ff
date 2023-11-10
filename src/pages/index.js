import './index.css';
import { initialCards } from "../components/cards.js";
import {
  openModal,
  closeModal,
  handleOverlayClose,
} from "../components/modal.js";
import { createCard, handleDelete, handleLike } from "../components/card.js";
// формы
const profileDescription = document.querySelector(".profile__description");
const profileName = document.querySelector(".profile__title");
// popups

//edit
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editProfileName = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileDescription = editProfilePopup.querySelector(
  ".popup__input_type_description"
);

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeModal(editProfilePopup);
};
editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", submitEditProfileForm);

// add
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const addCardName = addCardPopup.querySelector(".popup__input_type_card-name");
const addCardUrl = addCardPopup.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

const submitaddCardButton = (evt) => {
  evt.preventDefault();
  const newPlaceElement = {
    name: addCardName.value,
    link: addCardUrl.value,
  };

  renderCard(
    createCard(newPlaceElement, handleDelete, handleLike, handleOpenImage)
  );
  closeModal(addCardPopup);
  evt.target.reset();
};
addCardForm.addEventListener("submit", submitaddCardButton);

// зум изображения
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCard = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const handleOpenImage = (element) => {
  openModal(imagePopup);
  imagePopupCard.src = element.link;
  imagePopupCard.alt = element.name;
  imagePopupCaption.textContent = element.name;
};

// закрытия

const popups = document.querySelectorAll(".popup");
function setOverlayClose(popup) {
  popup.addEventListener("click", handleOverlayClose);
}

popups.forEach(setOverlayClose);
popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
});
// Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

const renderCard = (cardElement) => {
  placesList.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDelete, handleLike, handleOpenImage));
});


