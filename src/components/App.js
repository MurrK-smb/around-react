import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import PopupImage from './PopupImage'
import '../pages/index.css';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(undefined)

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard(undefined)
  }

  return (
    <div className="content">
      <Header />

      <Main 
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
      />
      
      <Footer />

      <PopupWithForm id={"edit"} title={"Edit Profile"} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} formId={"edit-form"}>
        <input className="form__input" id="form-name" type="text" name="name" autoComplete="off" required minLength="2" maxLength="40"/>
        <span className="form__validation" id="form-name-error"></span>
        <input className="form__input" id="form-caption" type="text" name="about" autoComplete="off" required minLength="2" maxLength="200"/>
        <span className="form__validation" id="form-caption-error"></span>
        <button className="form__submit" id="edit-submit" type="submit">Save</button>
      </PopupWithForm>

      <PopupWithForm id={"add"} title={"New Place"} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} formId={"add-form"}>
        <input className="form__input" id="form-title" type="text" name="name" placeholder="Name" autoComplete="off" required minLength="2" maxLength="30"/>
        <span className="form__validation" id="form-title-error"></span>
        <input className="form__input" id="form-link" type="url" name="link" placeholder="Image link" autoComplete="off" required/>
        <span className="form__validation" id="form-link-error"></span>
        <button className="form__submit form__submit_disabled" id="add-submit" type="submit" disabled>Create</button>
      </PopupWithForm>

      <PopupWithForm id={"edit-avatar"} title={"Change Profile"} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} formId={"edit-avatar-form"}>
        <input type="url" className="form__input" id="form-avatar" name="avatar" placeholder="Image link" required/>
        <span className="form__validation" id="form-avatar-error"></span>
        <button className="form__submit form__submit_disabled" id="avatar-submit" type="submit" disabled>Save</button>
      </PopupWithForm>

      <PopupWithForm id={"delete"} title={"Are You Sure?"} isOpen={isDeletePopupOpen} onClose={closeAllPopups} formId={"delete-form"}>
        <button className="form__submit" id="delete-submit" type="submit">Yes</button>
      </PopupWithForm>

      <PopupImage card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
