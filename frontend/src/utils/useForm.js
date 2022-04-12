import {useCallback, useEffect, useState} from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const isDirtyInput = Object.values(initialValues).every(value=> {return value === ''});
  const [isValid, setIsValid] = useState(isDirtyInput);

  function handleChange(e) {
    const input = e.target;
     handleError(input);
     setValues((prev)=>({...prev, [e.target.name]: e.target.value}));
  }

  function handleError(input) {
    setErrors((prev)=>({...prev, [input.name]: input.validationMessage}));
  }

  const resetForm = useCallback(() => {
    setErrors((prev)=>{
      return Object.fromEntries(Object.keys(prev).map((key)=>{
        return [key, '']
      }))
    });
    setValues(initialValues);
  },[initialValues])

  useEffect(()=>{
    const areErrorsEmpty = Object.values(errors).every(error=>{
      return error === ''
    }) || errors === {};
    const isAnyInputClear = Object.values(values).some(value=>{
      return value === '';
    }) || values === {};
    if (areErrorsEmpty && !isAnyInputClear) {
      setIsValid(true);
    } else {
     setIsValid(false)
    }
  }, [values, errors])

  return {
    values,
    handleChange,
    handleError,
    errors,
    resetForm,
    isValid,
    setValues,
    setErrors
  }
}

export default useForm