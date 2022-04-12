import PopupWithForm from './PopupWithForm.js';
import { useEffect, useMemo } from 'react';
import useForm from '../utils/useForm'

function AddPlacePopup({onLoading, isOpen, onAddPlace, onClose}) {
  const initialValues = useMemo(() => {
    return {name: '', link: ''}
  }, [])
  const validation = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(validation.values.name, validation.values.link);
  }

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

  useEffect(() => {
    !isOpen && validation.resetForm();
  }, [isOpen])

  return (
    <PopupWithForm 
      name={'add-card-form'} 
      title='Новое место' 
      isOpen={isOpen}
      onClose={onClose} 
      onSubmit={handleSubmit}
      isValid={validation.isValid}
      isLoading={onLoading}
      defaultTitle={'Создать'}
      loadingTitle={'Сохранение...'}
      >
      <div className={'popup__inputs'}>
        <input 
          type="text"
          className="popup__input"
          name="name"
          value={validation.values.name}
          onChange={validation.handleChange}
          placeholder="Название"
          id="add-title"
          minLength="2"
          maxLength="30"
          required/>
        <span className={`popup__error popup__error_visible`}>
          {validation.errors.name}
        </span>
        <input 
          type="url"
          className="popup__input"
          name="link"
          value={validation.values.link}
          onChange={validation.handleChange}
          placeholder="Ссылка на картинку"
          id="add-link"
          required/>
        <span className={`popup__error popup__error_visible`}>
          {validation.errors.link}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup