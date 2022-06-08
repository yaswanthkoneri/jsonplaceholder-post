import React, { useEffect } from "react";
import Cookies from 'js-cookie';

export const AppContext = React.createContext({
  isSignedIn: null,
  setIsSignedIn: null,
});

export const AppProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  useEffect(() => {
    if (Cookies.get('sessionId')) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
