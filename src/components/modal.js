export function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}
export function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export const handleOverlayClose = (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
};

const handleEscClose = (evt) => {
  const popupOpen = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(popupOpen);
  }
};

const closePopupByCross = document.querySelectorAll(".popup__close");
closePopupByCross.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});
