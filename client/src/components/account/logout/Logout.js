import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { update } from '../../../redux/userSlice';

const Logout = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  dispatch(update({ email: '', firstname: '', lastname: '' }));
  history.push('/');

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
