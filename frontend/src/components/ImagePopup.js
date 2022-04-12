import { useEffect } from 'react';

function ImagePopup({card, onClose, isOpen}) {

  useEffect(()=>{
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return ()=>{
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])


  function handleOverlayClose(e) {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  }
    
  return (
      <div className={`popup popup_full-picture ${card? 'popup_opened' : ''}`}
        onClick={handleOverlayClose}>
        <div className="popup__frame">
          <button 
            type="button" 
            onClick={onClose} 
            className="popup__close-button" 
            aria-label="закрыть фото">
            {}
          </button>
          <img 
            src={card? card.link : ''} 
            alt={card? card.name : ''} 
            className="popup__image"/>
          <p className="popup__caption">
            {card? card.name : ''}
          </p>
        </div>
      </div>
    )
}
  
export default ImagePopup;