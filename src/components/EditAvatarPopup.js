import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm id={"edit-avatar"} title={"Change Profile"} formId={"edit-avatar-form"} buttonText={"Save"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="url" className="form__input" id="form-avatar" name="avatar" placeholder="Image link" required ref={avatarRef} />
      <span className="form__validation" id="form-avatar-error"></span>
    </PopupWithForm>
  )
}