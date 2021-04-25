import { useDispatch } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';

import { useForm, Form } from '../useForm';

import Input from '../Input';
import Button from '../Button';
import AddBoxIcon from '@material-ui/icons/AddBox';

const initialFValues = {
  name: '',
  number: '',
};

export default function ContactForm() {
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Name is required.';
    if ('number' in fieldValues)
      temp.number = fieldValues.number ? '' : 'Number is required.';
    setErrors({
      ...temp,
    });
    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate,
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      dispatch(contactsOperations.postContact(values));
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleInputChange}
        error={errors.name}
      />
      <Input
        label="Phone number"
        name="number"
        value={values.number}
        onChange={handleInputChange}
        error={errors.number}
      />
      <Button startIcon={<AddBoxIcon />} type="submit" text="Add contact" />
    </Form>
  );
}
