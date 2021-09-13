import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const DrinksPage = ({ isLoaded }) => {
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

export default DrinksPage;
