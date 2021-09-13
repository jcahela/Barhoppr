import { createContext, useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CheckinModal.css';

export const CheckinModalContext = createContext();

export const CheckinModalProvider = ({ children }) => {
  const checkinModalRef = useRef();
  const [checkinValue, setCheckinValue] = useState();

  useEffect(() => {
    setCheckinValue(checkinModalRef.current);
  }, []);

  return (
    <>
      <CheckinModalContext.Provider value={checkinValue}>
        {children}
      </CheckinModalContext.Provider>
      <div ref={checkinModalRef}></div>
    </>
  )
}

export const CheckinModal = ({ onClose, children }) => {
  const CheckinModalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="checkin-modal">
      <div id="checkin-modal-background" onClick={onClose}/>
      <div id="checkin-modal-content">
        {children}
      </div>
    </div>,
    CheckinModalNode
  )
}
