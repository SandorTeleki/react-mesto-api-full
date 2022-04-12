import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card (props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => (i._id === currentUser._id));
  
  function handleClick() {
      props.onCardClick(props.card);
    }
  
  function handleConfirmDelete() {
    props.onCardDelete(props.card);
  }

    return (
      (<li className="card" >
        <img 
          className="card__picture" 
          onClick={handleClick} 
          src={props.card.link} 
          alt={`${props.card.name}`}/> 
        <h2 className="card__title">
          {props.card.name}
        </h2>
        <div className="card__like-section">
          <button 
            type="button"
            onClick={props.onCardLike}
            className={`card__reaction  ${isLiked && 'card__reaction_active'} `} 
            aria-label="лайк">
            {}  
          </button>
          <span className="card__like-quantity">{props.card.likes.length}</span>
        </div>
        <button type="button" onClick={handleConfirmDelete} className={`card__delete${isOwn ? '' : '_inactive'}`} aria-label="удалить">
          {}
        </button>
      </li>))
  }
  
export default Card;

