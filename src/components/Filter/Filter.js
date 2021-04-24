import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

import s from './Filter.module.css';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = ({ target }) => {
    dispatch(changeFilter(target.value.trim()));
  };

  return (
    <div className={s.filter}>
      <label className={s.filterLabel}>Find contacts by name</label>
      <input
        className={s.filterInput}
        type="text"
        value={filter}
        onChange={onChange}
      ></input>
    </div>
  );
}
