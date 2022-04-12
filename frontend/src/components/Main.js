import Card from './Card.js';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img 
              className="profile__picture" 
              src={currentUser.avatar} 
              alt="фото профиля"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser.name}
            </h1>
            <p className="profile__description">
              {currentUser.about}
            </p>
            <button 
              type="button" 
              className="profile__edit-button" 
              aria-label="знак редактировать" 
              onClick={props.onEditProfile}>
              {}
            </button>
          </div>
        </div>
        <button 
          type="button" 
          className="profile__add-button" 
          aria-label="знак добавить" 
          onClick={props.onAddPlace}>
          {}
        </button>
      </section>
      <section className="cards">
        <ul className="cards__list">
        {props.cards.map(item => <Card key={item._id}
          card={item}
          onCardClick={props.onCardClick}
          onCardLike={() => props.onCardLike(item)}
          onCardDelete={() => props.onCardDelete(item)}/>)
        }
        </ul>
      </section>
    </main>
  )
}

export default Main