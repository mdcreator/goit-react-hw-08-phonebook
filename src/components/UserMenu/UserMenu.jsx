import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Button from '../../components/Button';
import s from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const email = useSelector(authSelectors.getUserEmail);
  const isLoading = useSelector(authSelectors.getIsLoading);

  return (
    <div className={s.container}>
      <span className={s.name}>
        Welcome, {name} ({email})
      </span>
      <Button
        endIcon={<PowerSettingsNewIcon />}
        type="button"
        text={isLoading ? 'Loading...' : 'Logout'}
        onClick={() => dispatch(authOperations.logOut())}
      >
        Logout
      </Button>
    </div>
  );
}
