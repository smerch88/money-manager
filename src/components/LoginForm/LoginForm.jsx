import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/auth-operation';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

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
    console.log(1);
    dispatch(logIn({ email, password }));
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          label="E-mail"
          id="email"
          name="email"
          type="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="standard"
          label="Password"
          id="password"
          name="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit">LOG IN</Button>
      </form>
      <Button variant="secondarybutton" href="/money-manager/auth/register">
        Register
      </Button>
    </>
  );
};
