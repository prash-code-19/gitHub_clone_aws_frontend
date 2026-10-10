import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext();

export const useAuth = ()=>{
   return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
   const [currentUser, setCurrentUser] = useState(() => {
      const userId = localStorage.getItem('userId');
      if (!userId || !/^[a-f\d]{24}$/i.test(userId)) {
         localStorage.removeItem('userId');
         localStorage.removeItem('token');
         return null;
      }
      return userId;
   });

   const value = {
      currentUser, setCurrentUser
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}