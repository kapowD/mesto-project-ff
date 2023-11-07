console.log(initialCards);

// формы

const profileDescription = document.querySelector(".profile__description");
const profileName = document.querySelector(".profile__title");
// popups buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// popups
//edit
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form"); // повешать слушатель сабмита
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
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form"); // повешать слушатель сабмита

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
  renderCard(createCard(newPlaceElement));
  closeModal(addCardPopup);
  evt.target.reset();
};
addCardForm.addEventListener("submit", submitaddCardButton);

// image
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCard = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// функции попапов
const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
};

// закрытие cross

const closePopupByCross = document.querySelectorAll(".popup__close");

closePopupByCross.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

// создание элемента

const placesList = document.querySelector(".places__list");
const content = document.querySelector("#card-template").content;

const createCard = (element) => {
  const card = content.querySelector(".places__item").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelete = card.querySelector(".card__delete-button");
  const cardLike = card.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  card.querySelector(".card__image").addEventListener("click", () => {
    openModal(imagePopup);
    imagePopupCard.src = element.link;
    imagePopupCard.alt = element.name;
    imagePopupCaption.textContent = element.name;
  });
  // Функция удаления карточки
  const handleDelete = () => {
    card.remove();
  };
  // Функция лайка карточки
  const handleLike = () => {
    cardLike.classList.toggle("card__like-button_is-active");
  };

  cardDelete.addEventListener("click", handleDelete);
  cardLike.addEventListener("click", handleLike);

  return card;
};

// Вывести карточки на страницу
const renderCard = (cardElement) => {
  placesList.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCard(createCard(card));
});

// импорты
import { initialCards } from "./cards.js";
