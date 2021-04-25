import { useSelector, useDispatch } from 'react-redux';
import { contactsSelectors, contactsOperations } from '../../redux/contacts';

import { Search } from '@material-ui/icons';
import { makeStyles, InputAdornment } from '@material-ui/core';

import Input from '../Input';

const useStyles = makeStyles(theme => ({
  searchInput: {
    marginTop: theme.spacing(3),
  },
}));

export default function Filter() {
  const classes = useStyles();
  const filter = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  const handleFilterChange = ({ target }) => {
    dispatch(contactsOperations.changeFilter(target.value.trim()));
  };

  return (
    <Input
      label="Filter"
      value={filter}
      className={classes.searchInput}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={handleFilterChange}
    />
  );
}
