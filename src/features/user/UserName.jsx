import { useSelector } from 'react-redux';

function UserName() {
  //we use 'useSelector' hook proivded by react redux
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="test-sm hidden font-semibold md:block">{username}</div>
  );
}

export default UserName;
