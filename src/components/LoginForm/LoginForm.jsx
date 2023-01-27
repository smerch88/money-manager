import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/auth-operation';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string().min(6).max(12).required(),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }, { resetForm }) => {
    dispatch(logIn({ email, password }));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form>
          <label htmlFor="email"></label>
          <Field
            id="email"
            name="email"
            placeholder="E-mail"
            type="email"
            required
          />
          <label htmlFor="password"></label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <Link to="/auth/register">Register</Link>
    </>
  );
};