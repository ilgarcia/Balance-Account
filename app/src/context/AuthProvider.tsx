import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

interface providerProps {
  children: ReactNode;
}

interface contextDataProps {
  auth: {[key: string]: any};
  setAuth: Dispatch<SetStateAction<{}>>
}

export const AuthContext = createContext<contextDataProps>(
  {} as contextDataProps
);

export const AuthProvider = ({ children }: providerProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
