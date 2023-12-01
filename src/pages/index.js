import "./index.css";
import { initialCards } from "../components/cards.js";
import {
  openModal,
  closeModal,
  handleCloseByClick,
} from "../components/modal.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeClick,
} from "../components/card.js";
import {enableValidation, clearValidation} from "../components/validation.js";

const profileDescription = document.querySelector(".profile__description");
const profileName = document.querySelector(".profile__title");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editProfileName = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileDescription = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const addCardName = addCardPopup.querySelector(".popup__input_type_card-name");
const addCardUrl = addCardPopup.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCard = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeModal(editProfilePopup);
};
const handleImageClick = (element) => {
  openModal(imagePopup);
  imagePopupCard.src = element.link;
  imagePopupCard.alt = element.name;
  imagePopupCaption.textContent = element.name;
};
const handlers = {
  handleDeleteCard,
  handleLikeClick,
  handleImageClick,
};
const submitAddCardButton = (evt) => {
  evt.preventDefault();
  const newPlaceElement = {
    name: addCardName.value,
    link: addCardUrl.value,
  };
  renderCard(
    createCard(
      newPlaceElement,
      handlers
    )
  );
  closeModal(addCardPopup);
  evt.target.reset();
};



function setCloseByClick(popup) {
  popup.addEventListener("click", handleCloseByClick);
}

const renderCard = (cardElement) => {
  cardsContainer.prepend(cardElement);
};

popups.forEach(setCloseByClick);
popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
});

initialCards.forEach((card) => {
  renderCard(
    createCard(card, handlers)
  );
});

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig)
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig)
  openModal(addCardPopup);
  
});

editProfileForm.addEventListener("submit", submitEditProfileForm);
addCardForm.addEventListener("submit", submitAddCardButton);



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);