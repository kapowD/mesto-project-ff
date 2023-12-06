import "./index.css";
import { initialCards } from "../components/cards.js";
import {
  openModal,
  closeModal,
  handleCloseByClick,
} from "../components/modal.js";
import {
  createCard,
  handleLikeClick
} from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getInitialCards,
  updateInitialCards,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar
} from "../components/api.js";

const promises = [getInitialCards, getProfileInfo];
const profileDescription = document.querySelector(".profile__description");
const profileName = document.querySelector(".profile__title");
const profileAvatar = document.querySelector(".profile__image");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editProfileName = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const editProfileDescription = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
//
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarButton = document.querySelector('.profile__image-edit');
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const avatarFormInput = editAvatarForm.querySelector(".popup__input_type_avatar-url");
console.log(avatarFormInput)
//
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

const newInitialCards = await getInitialCards();
Promise.all(promises)
.then(() => {
  getInitialCards().then((data) => {
    data.forEach((card) => {
      renderCard(createCard(card, handleImageClick, handleLikeClick));///////////////////////////////////////////
    });
  });
  getProfileInfo(profileName, profileDescription, profileAvatar);
});
const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;

  updateProfileInfo(profileName.textContent, profileDescription.textContent);

  // update profile
  closeModal(editProfilePopup);
};
const handleImageClick = (evt) => {
  
  imagePopupCard.src = evt.target.src;
  imagePopupCard.alt =  evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
};

const submitAddCardButton = (evt) => {
  evt.preventDefault();
  const newPlaceElement = {
    name: addCardName.value,
    link: addCardUrl.value,
  };
  updateInitialCards(newPlaceElement.name, newPlaceElement.link);
  renderCard(createCard(newPlaceElement,  handleImageClick, handleLikeClick));///////////////////////////////////////////
  closeModal(addCardPopup);
  evt.target.reset();
};

function setCloseByClick(popup) {
  popup.addEventListener("click", handleCloseByClick);
}

const renderCard = (cardElement) => {
  cardsContainer.prepend(cardElement);
};
function handleAvatarChange(evt) {

  evt.preventDefault()

  const avatarUrl = avatarFormInput.value;

  changeAvatar(avatarUrl)
  .then(() => {
    location.reload();
  })

}

popups.forEach(setCloseByClick);
popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
});

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});

editAvatarButton.addEventListener("click",()=>{
  console.log('s')
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);
addCardForm.addEventListener("submit", submitAddCardButton);
editAvatarForm.addEventListener("submit", handleAvatarChange);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
getInitialCards();

fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
  headers: {
    authorization: "278bb077-1673-45bd-9597-3e9d7ec352d4",
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
