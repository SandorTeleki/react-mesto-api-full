import { useEffect } from 'react';

function InfoToolTip({isSuccess, isOpen, onClose}) {

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

  return (<div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className={'popup__container'}>
        <button 
            type={'button'}
            className={`popup__close-button`}
            onClick={onClose}
            aria-label={'закрыть'}>
            {}
        </button>
        <div className={'popup__form popup__form_type_infotooltip'}>
            <div className={`popup__form-icon ${isSuccess ? 'popup__form-icon_type_success' : 'popup__form-icon_type_failure'}`}>
                {}
            </div>
            <h2 className={'popup__form-heading'}>
                {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
            </h2>
        </div>
      </div>
    </div>)

}

export default InfoToolTip