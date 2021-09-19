import { createContext, useContext, useState } from "react";

export const DrinkSelectedContext = createContext();

export const DrinkSelectedProvider = ({children}) => {
  const [drinkSelected, setDrinkSelected] = useState(false);
  const [currentDrink, setCurrentDrink] = useState({});
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [prevHost, setPrevHost] = useState('');

  return (
    <DrinkSelectedContext.Provider value={{
      drinkSelected, 
      setDrinkSelected, 
      currentDrink,
      setCurrentDrink,
      showCheckinModal, 
      setShowCheckinModal, 
      prevHost, 
      setPrevHost
    }}>
      {children}
    </DrinkSelectedContext.Provider>
  )
}

export  const useDrinkSelected = () => useContext(DrinkSelectedContext);
