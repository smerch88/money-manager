import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/auth-operation';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputAdornment } from '@mui/material';
import { CssTextField } from './LoginForm.styled';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

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
      {/* <Example />
      <Example2 /> */}
      <form onSubmit={formik.handleSubmit}>
        <CssTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
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
        <CssTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
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
