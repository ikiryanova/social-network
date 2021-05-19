import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import cn from 'classnames';

import { FieldValidatorType } from '../../../utils/validators/validators';

import './formsControls.css';

type FormControlPropsType = {
  meta: WrappedFieldMetaProps,
  typeForm: string
  input: any
}

const FormControl: React.FC<FormControlPropsType> = ({ input, meta: { touched, error }, typeForm, ...props }) => {
  let hasError = touched && error;

  return (
    <div className={cn({ 'form-control error': hasError })}>
      {typeForm === 'textarea' ? <textarea {...input} {...props} /> : <input {...input} {...props} />}

      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  return <FormControl typeForm='textarea' {...props}/>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  return <FormControl typeForm="input" {...props} />;
};

export function createField<FormKeysType extends string> (
  placeholder: string | undefined, 
  name: FormKeysType, 
  validators: Array<FieldValidatorType>, 
  component: React.FC<WrappedFieldProps>, 
  props = {}, 
  className="form-field", 
  text = ''
  ) {
  return <>
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
}

export type GetStringKeys<T> = Extract<keyof T, string>;
    


