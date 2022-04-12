import useForm from '../utils/useForm';
import { useMemo } from 'react';

function Login({isLoading, onLogin}) {
  const initialValues = useMemo(()=>{return {email: "", password: ""}},[]);
  const {values, errors, isValid, handleChange} = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.password, values.email)
  }

  return (<div className={'auth'}>
    <form 
        className={'auth-form'}
        name={'authorization-form'}
        noValidate={true}
        onSubmit={handleSubmit}>
        <h2 className={'auth__heading'}>
            Вход
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
            {(!isLoading) ? 'Войти' : 'Вход...'}
        </button>
    </form>
  </div>)
}

export default Login
