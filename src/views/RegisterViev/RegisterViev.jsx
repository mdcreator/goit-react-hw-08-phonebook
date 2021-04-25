import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Container, Typography } from '@material-ui/core';
import { Grid, ButtonGroup } from '@material-ui/core';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { useForm, Form } from '../../components/useForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function RegisterViev() {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getIsLoading);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Name is required.';

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

  const initialFValues = {
    name: '',
    email: '',
    password: '',
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate,
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      dispatch(authOperations.register(values));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h2">
        Register Page
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
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
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button
                startIcon={<NoteAddIcon />}
                type="submit"
                text={!isLoading ? 'Register' : 'Loading...'}
              />
              <Button
                endIcon={<BackspaceIcon />}
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}
