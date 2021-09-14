import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const BarTalkPage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  return (
    <Navigation isLoaded={isLoaded}/>
  )
}

export default BarTalkPage;
