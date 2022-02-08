import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlaceSubmit({ name, link })
  }

  return (
    <PopupWithForm id={"add"} title={"New Place"} isOpen={isOpen} onClose={onClose} formId={"add-form"} onSubmit={handleSubmit} buttonText={"Create"}>
      <input className="form__input" id="form-title" type="text" name="name" placeholder="Name" autoComplete="off" required minLength="2" maxLength="30" value={name} onChange={handleNameChange} />
      <span className="form__validation" id="form-title-error"></span>
      <input className="form__input" id="form-link" type="url" name="link" placeholder="Image link" autoComplete="off" required value={link} onChange={handleLinkChange} />
      <span className="form__validation" id="form-link-error"></span>
    </PopupWithForm>
  )
}