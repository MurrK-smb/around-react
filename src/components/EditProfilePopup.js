import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditPopupWithForm({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])
  
  return (
    <PopupWithForm id={"edit"} title={"Edit Profile"} isOpen={isOpen} onClose={onClose} formId={"edit-form"} buttonText={"Save"} onSubmit={handleSubmit}>
      <input className="form__input" id="form-name" type="text" name="name" autoComplete="off" required minLength="2" maxLength="40"/>
      <span className="form__validation" id="form-name-error"></span>
      <input className="form__input" id="form-caption" type="text" name="about" autoComplete="off" required minLength="2" maxLength="200"/>
      <span className="form__validation" id="form-caption-error"></span>
    </PopupWithForm>
  )
}