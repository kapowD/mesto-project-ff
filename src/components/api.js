const getInitialCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
    },
  }).then(handleResponse);
};

const updateInitialCards = (cardName, cardLink) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(handleResponse);
};

const likeCard = (cardId) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',  
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
      'Content-Type': 'application/json'
    },
  })
}

// убрать лайк

const dislikeCard = (cardId) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',  
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
      'Content-Type': 'application/json'
    },
  })

}

const getProfileInfo = (profileName, profileInfo, profileAvatar) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me", {
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      profileName.textContent = data.name;
      profileInfo.textContent = data.about;
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    })
};

const updateProfileInfo = (profileName, profileInfo) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "683144ff-c18d-4be4-8a6f-e4f83a97ea06",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileName,
      about: profileInfo,
    }),
  }).then(handleResponse);
};
const changeAvatar = (url) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar`, {
    method: 'PATCH',  
    headers: {
      authorization: '683144ff-c18d-4be4-8a6f-e4f83a97ea06',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })

}
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};


export {
  getInitialCards,
  updateInitialCards,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar,
  likeCard,
  dislikeCard,
  
};
