import React, { createContext } from "react";
const MainContext = createContext(null);
export const MainContextProvider = MainContext.Provider;
export const MainContextConsumer = MainContext.Consumer;
export default MainContext;
