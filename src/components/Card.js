function Card({ card, onCardClick, onDeleteClick}) {

  function handleCardClick() {
    onCardClick(card)
  }

  return (
    <div className="card">
      <button className="card__delete" type="button" onClick={onDeleteClick}></button>
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="card__details">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button"></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card