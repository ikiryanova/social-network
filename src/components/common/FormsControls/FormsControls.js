import React from 'react';
import { Field } from 'redux-form';
import cn from 'classnames';
import './formsControls.css';

const FormControl = ({ input,  meta: {touched, error}, typeForm,  ...props }) => {
  let hasError = touched && error;

  return (
    <div className={cn({'form-control error': hasError})}>
      {
        (typeForm === 'textarea') 
        ? <textarea {...input} {...props} />
        : <input {...input} {...props} />
      }
      
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  return <FormControl typeForm='textarea' {...props}/>
}

export const Input = (props) => {
  return <FormControl typeForm='input' {...props} />;
};


export const createField = (placeholder, name, validators, component, props = {}, className="form-field", text = '') => (
  <>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      className={className}
      {...props}
    />{' '}
    {text}
  </>
);


