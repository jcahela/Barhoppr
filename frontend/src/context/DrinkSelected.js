import { createContext, useContext, useState } from "react";

export const DrinkSelectedContext = createContext();

export const DrinkSelectedProvider = ({children}) => {
  const [drinkSelected, setDrinkSelected] = useState(false);
  const [currentDrink, setCurrentDrink] = useState({});
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  return (
    <DrinkSelectedContext.Provider value={{
      drinkSelected, 
      setDrinkSelected, 
      currentDrink,
      setCurrentDrink,
      showCheckinModal, 
      setShowCheckinModal
    }}>
      {children}
    </DrinkSelectedContext.Provider>
  )
}

export  const useDrinkSelected = () => useContext(DrinkSelectedContext);
