import React from 'react';
import { Field, Form, Formik } from 'formik';

import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string,
  friend: 'true' | 'false' | 'null'
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
  const onSubmit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }; 
    onFilterChanged(filter);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'null' }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
        <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
        )}
      </Formik>
    </div>
  );
});