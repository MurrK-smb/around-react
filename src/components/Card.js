import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onDeleteClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const cardDeleteButtonClassName = (`card__delete ${!isOwn && 'card__delete_invisible'}`)
  const isLiked = card.likes.some(like => like._id === currentUser._id)
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_a'}`)

  function handleCardClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick(card) {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <button className={cardDeleteButtonClassName} type="button" onClick={onDeleteClick}></button>
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="card__details">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card