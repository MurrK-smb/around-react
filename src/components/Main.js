import React from 'react'
import Card from './Card'
import { api } from '../utils/api'
import edit from '../images/edit.svg'
import add from '../images/add.svg'

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick, onDeleteClick }) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then((info) => {
          setUserName(info.name)
          setUserDescription(info.about)
          setUserAvatar(info.avatar)
      })
      .catch((err) => {
          console.log(err);
      })

    api.getCardList()
      .then((data) => {
          setCards(data)
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="avatar-container" onClick={onEditAvatarClick}>
          <img className="avatar" src={userAvatar} alt="Your custom profile picture"/>
          <button className="avatar-edit"  type="button"></button>
        </div>
        <div className="info">
          <div className="info__name-group">
            <h1 className="info__name">{userName}</h1>
              <button className="info__edit-button" type="button" onClick={onEditProfileClick}>
                <img className="info__edit-image" src={edit} alt="pencil image"/>
              </button>
          </div>
          <p className="info__caption">{userDescription}</p>
        </div>
        <button className="add-button" type="button" onClick={onAddPlaceClick}>
          <img className="add-image" src={add} alt="plus image"/>
        </button>
      </section>

      <section className="cards">
        {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onDeleteClick={onDeleteClick}/>))}
      </section>
    </main>
  )
}

export default Main