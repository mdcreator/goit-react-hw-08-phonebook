import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Grid, Container, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useForm, Form } from '../../components/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function LoginView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getIsLoading);
  const initialFValues = {
    email: '',
    password: '',
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('email' in fieldValues) {
      temp.email = fieldValues.email
        ? /$^|.+@.+..+/.test(fieldValues.email)
          ? ''
          : 'Email is not valid.'
        : 'Email is required.';
    }
    if ('password' in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? '' : 'Minimum 6 simbols required.';
    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate,
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) dispatch(authOperations.logIn(values));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h2">
        Login Page
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              inputType="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              startIcon={<ExitToAppIcon />}
              type="submit"
              text={isLoading ? 'Loading...' : 'Login'}
            />
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}
