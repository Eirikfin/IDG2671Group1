import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    
      setUser({token}); 
    }
  }, []);

    const login = (userData) => {
  localStorage.setItem("token", userData.token);
  setUser(userData);
};
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>


    )

}

export function useAuth() {
    return useContext(AuthContext);
}