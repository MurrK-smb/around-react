import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import '../index.css';
import api from '../utils/api'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(undefined)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then(info => setCurrentUser(info))
      .catch(err => console.log(err))
    api.getCardList()
      .then(cards => setCards(cards))
      .catch(err => console.log(err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id)
    function setCardState(newCard) {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    }
    if (isLiked) {
      api.addLike(currentUser._id)
        .then(newCard => setCardState(newCard))
    } 
    else {
      api.removeLike(currentUser._id)
        .then(newCard => setCardState(newCard))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(list => list.filter(item => item._id !== card._id))
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(currentUser) {
    api.editProfile({ name: currentUser.name, about: currentUser.about })
      .then(info => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(currentUser) {
    api.editAvatar({ avatar: currentUser.avatar })
      .then(info => {
        setCurrentUser(info)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard(undefined)
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header />

          <Main
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteClick={handleDeleteClick}
            cards={cards}
          />
          
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm id={"delete"} title={"Are You Sure?"} isOpen={isDeletePopupOpen} onClose={closeAllPopups} formId={"delete-form"} buttonText={"Yes"} onCardDelete={handleCardDelete} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
