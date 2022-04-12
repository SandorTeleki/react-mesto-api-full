import { Link } from 'react-router-dom';
import useForm from '../utils/useForm';
import { useMemo } from 'react';

function Register({isLoading, onRegister}) {
  const initialValues = useMemo(()=>{return {email: '', password: ''}},[]);
  const { values, errors, isValid, handleChange } = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.password, values.email);
  }

  return (<div className={'auth page__auth'}>
    <form 
        className={'auth-form'}
        name={'registration-form'}
        noValidate={true}
        onSubmit={handleSubmit}>
        <h2 className={'auth__heading'}>
            Регистрация
        </h2>
        <input 
            className={'auth__input'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            required={true}
            onChange={handleChange}
            value={values.email}/>
        <span className={'auth__input-error'}>
            {errors.email}
        </span>
        <input 
            className={'auth__input'}
            type={'password'}
            name={'password'}
            placeholder={'Пароль'}
            required={true}
            onChange={handleChange}
            value={values.password}
            minLength={'8'}/>
        <span className={'auth__input-error'}>
            {errors.password}
        </span>
        <button 
            type={'submit'}
            className={`auth__submit-button ${(!isValid || isLoading) && 'auth__submit-button_inactive'}`}>
            {(!isLoading) ? 'Зарегистрироваться' : 'Регистрация ...'}
        </button>
      <p className={'auth__sign-in-link'}>
          Уже зарегистрированы?
        <Link to={'/sign-in'} className={'auth__sign-in-link ' + 'auth__sign-in-link_active'}>
            Войти
        </Link>
      </p>
    </form>
  </div>)
}

export default Register