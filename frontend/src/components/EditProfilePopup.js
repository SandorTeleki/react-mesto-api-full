import PopupWithForm from './PopupWithForm';
import {useContext, useEffect, useMemo} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import useForm from '../utils/useForm';

function EditProfilePopup({onLoading, onClose, onUpdateUser, isOpen}) {
  const currentUser = useContext(CurrentUserContext);
  const initialValues = useMemo(() => ({name: '', about: ''}), [])
  const validation = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(validation.values.name, validation.values.about)
  }

  useEffect(() => {
    if (isOpen) {
      validation.setValues((prev) => ({
        ...prev,
        name: currentUser.name,
        about: currentUser.about
      }));
    } else {
      validation.resetForm()
    }
  }, [isOpen, currentUser])

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

  return (
    <PopupWithForm 
      name={'edit-profile-form'} 
      title='Pедактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={onLoading}
      isValid={validation.isValid}
      defaultTitle={'Сохранить'}
      loadingTitle={'Сохранение...'}>
      <div className={'popup__inputs'}>
        <input 
          type="text"
          className="popup__input"
          name="name"
          value={validation.values.name}
          onChange={validation.handleChange}
          placeholder="имя"
          id="nameinput"
          minLength="2"
          maxLength="40"
          required/>
        <span className={`popup__error popup__error_visible`}>
          {validation.errors.name}
        </span>
        <input 
          type="text"
          className="popup__input"
          name="about"
          value={validation.values.about}
          onChange={validation.handleChange}
          placeholder="работа"
          id="aboutinput"
          minLength="2"
          maxLength="200"
          required/>
        <span className={`popup__error popup__error_visible`}>
          {validation.errors.name}
        </span>
      </div> 
    </PopupWithForm>
  )
}

export default EditProfilePopup