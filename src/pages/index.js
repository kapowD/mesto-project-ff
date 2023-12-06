import "./index.css";
import {
  openModal,
  closeModal,
  handleCloseByClick,
} from "../components/modal.js";
import { createCard, handleLikeClick } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getInitialCards,
  updateInitialCards,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar,
  deleteCard,
} from "../components/api.js";

const promises = [getInitialCards, getProfileInfo];

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

const profileAvatar = document.querySelector(".profile__image");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarButton = document.querySelector(".profile__image-edit");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const avatarFormInput = editAvatarForm.querySelector(
  ".popup__input_type_avatar-url"
);
const cardDeletePopup = document.querySelector(".popup_type_delete-card");
const cardDeleteForm = cardDeletePopup.querySelector(".popup__form");
const cardDeleteButton = cardDeleteForm.querySelector(".popup__button");

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

let myId = "";

Promise.all(promises).then(() => {
  getProfileInfo()
    .then((data) => {
      myId = data["_id"];
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch((err) => {
      console.log(err);
    });
  getInitialCards().then((data) => {
    data.forEach((card) => {
      renderCard(
        createCard(
          card,
          handleImageClick,
          handleLikeClick,
          handleOpenRemoveCard,
          myId
        )
      );
    });
  });
});

const renderLoading = (isLoading, formButton) => {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
};

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  renderLoading(
    true,
    editProfileForm.querySelector(validationConfig.submitButtonSelector)
  );
  updateProfileInfo(editProfileName.value, editProfileDescription.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        editProfileForm.querySelector(validationConfig.submitButtonSelector)
      );
    });
  closeModal(editProfilePopup);
};

const submitAddCardButton = (evt) => {
  evt.preventDefault();
  renderLoading(
    true,
    addCardForm.querySelector(validationConfig.submitButtonSelector)
  );
  const newPlaceElement = {
    name: addCardName.value,
    link: addCardUrl.value,
  };
  updateInitialCards(newPlaceElement.name, newPlaceElement.link)
    .then((data) => {
      renderCard(
        createCard(
          data,
          handleImageClick,
          handleLikeClick,
          handleOpenRemoveCard,
          myId
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        addCardForm.querySelector(validationConfig.submitButtonSelector)
      );
    });

  closeModal(addCardPopup);
  evt.target.reset();
};

const submitChangeAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(
    true,
    editAvatarForm.querySelector(validationConfig.submitButtonSelector)
  );
  changeAvatar(avatarFormInput.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        editAvatarForm.querySelector(validationConfig.submitButtonSelector)
      );
    });
};

const handleOpenRemoveCard = (id) => {
  cardDeleteButton.dataset.id = id;
  openModal(cardDeletePopup);
};

const submitRemoveCard = (evt) => {
  evt.preventDefault();
  const cardId = cardDeleteButton.dataset.id;

  deleteCard(cardId)
    .then(() => {
      const deleteTarget = document.querySelector(`[id='${cardId}']`);
      deleteTarget.remove();
      closeModal(cardDeletePopup);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleImageClick = (evt) => {
  imagePopupCard.src = evt.target.src;
  imagePopupCard.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
};

const setCloseByClick = (popup) => {
  popup.addEventListener("click", handleCloseByClick);
};

const renderCard = (cardElement) => {
  cardsContainer.prepend(cardElement);
};

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

editAvatarButton.addEventListener("click", () => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);
addCardForm.addEventListener("submit", submitAddCardButton);
editAvatarForm.addEventListener("submit", submitChangeAvatar);
cardDeleteForm.addEventListener("submit", submitRemoveCard);

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
