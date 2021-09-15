import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CheckinCard from "../CheckinCard";
import { useEffect } from "react";

import './BarTalkPage.css'

const BarTalkPage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allCheckins = useSelector(state => state.checkins.allCheckins);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('bartalk-background')
  }, [])

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  return (
    <>
      <div className="bartalk-body" />
      <Navigation isLoaded={isLoaded}/>
      <div className="bartalk-feed-container">
        <h1 className="bartalk-title">Recent Bar Talk</h1>
        <div className="bartalk-divider"></div>
        {allCheckins.map(checkin => (
          <CheckinCard key={checkin.id} checkin={checkin}/>
        ))}

      </div>
    </>
  )
}

export default BarTalkPage;
