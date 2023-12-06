function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

const handleCloseByClick = (evt) => {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
};

export { openModal, closeModal, handleCloseByClick}