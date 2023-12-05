const getInitialCards = () => {

  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    headers: {
      authorization: '683144ff-c18d-4be4-8a6f-e4f83a97ea06'
    }
  })
  .then(res => res.json())
  .catch(error => console.log(error))

}

// отправка новой карточки на сервер

const updateInitialCards = (cardName, cardLink) => {

  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    method: 'POST',  
    headers: {
      authorization: '683144ff-c18d-4be4-8a6f-e4f83a97ea06',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))

}

// получение профиля с сервера

const getProfileInfo = (profileName, profileInfo, profileAvatar) => {

return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
  headers: {
    authorization: '683144ff-c18d-4be4-8a6f-e4f83a97ea06'
  }
})
.then(res => res.json())
.then((data) => {
  profileName.textContent = data.name;
  profileInfo.textContent = data.about;
  profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен');
})

}

const updateProfileInfo = (profileName, profileInfo) => {

return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '683144ff-c18d-4be4-8a6f-e4f83a97ea06',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: profileName,
    about: profileInfo
  })
})
.catch(error => console.log(error))

}

// EXPORT => => =>

export {getInitialCards, getProfileInfo, updateProfileInfo, updateInitialCards};