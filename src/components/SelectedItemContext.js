import React, { createContext, useContext, useRef, useState } from 'react';
const SelectedItemContext = createContext();
export const useSelectedItem = () => useContext(SelectedItemContext);
export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState([]);
  const desktopinputRef= useRef();
  const mobileInputRef=useRef();
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  
  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem ,desktopinputRef,isSearchBarVisible,setSearchBarVisible,mobileInputRef}}>
      {children}
    </SelectedItemContext.Provider>
  );
};
