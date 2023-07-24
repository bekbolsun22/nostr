import { createContext, useCallback, useMemo, useState } from 'react'

export const AuthContext = createContext({
   isAuthorized: false,
   setCredentials: () => {},
   user: {
      userId: '',
      email: '',
      username: '',
   },
})

const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null)

   const setCredentialsHandler = useCallback((user) => {
      setUser(user)
   }, [])

   const memoizedContextValues = useMemo(
      () => ({
         user,
         setCredentials: setCredentialsHandler,
         isAuthorized: Boolean(user),
      }),
      [user, setCredentialsHandler]
   )

   return (
      <AuthContext.Provider value={memoizedContextValues}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContextProvider
