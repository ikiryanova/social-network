import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

import { FilterType } from '../../redux/users-reducer';
import { getUsersFilter } from '../../redux/users-selectors';

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
  term: string,
  friend: FriendFormType
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
  const filter = useSelector(getUsersFilter);

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
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
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