import { useContext } from 'react'
import AppsList from './components/apps/AppsList'
import Header from './layout/Header'
import { db } from './db'
import useMountedEffect from './hooks/useMountedEffect'
import { AUTH_LS_INFO_KEY, USER_ID } from './utils/constants/general'
import { AuthContext } from './store/AuthContext'
import { LocalStorage, addApp, addUser } from './utils/helpers/general'
import TabsList from './components/tabs/TabsList'

const DEFAULT_USER = {
   userId: 'npub1exv22uulqnmlluszc4yk92jhs2e5ajcs6mu3t00a6avzjcalj9csm7d828',
   username: 'Bekbolsun',
   email: 'admin@gmail.com',
   apps: [
      {
         image: 'https://nostr.band/android-chrome-192x192.png',
         title: 'Nostr',
      },
      {
         image: 'https://iris.to/img/android-chrome-192x192.png',
         title: 'Iris',
      },
      {
         image: 'https://getumbrel.github.io/umbrel-apps-gallery/snort/icon.svg',
         title: 'Snort',
      },
      {
         image: 'https://coracle.social/images/logo.png',
         title: 'Coracle',
      },
   ],
}

const App = () => {
   const { setCredentials, user } = useContext(AuthContext)
   const { userId } = user || {}

   useMountedEffect(() => {
      const setDefaultUserToDB = async () => {
         try {
            const dbUsers = await db.users
               .where(USER_ID)
               .equals(DEFAULT_USER.userId)
               .toArray()

            if (dbUsers.length === 0) {
               const { apps, ...user } = DEFAULT_USER
               await addUser(user)
               apps.forEach(async (app) => {
                  await addApp(app, user.userId)
               })
               LocalStorage.save(AUTH_LS_INFO_KEY, user)
            }
            if (dbUsers.length === 1) {
               const [defaultUser] = dbUsers
               LocalStorage.save(AUTH_LS_INFO_KEY, defaultUser)
               setCredentials(defaultUser)
            }
         } catch (error) {
            console.log(error)
         }
      }
      setDefaultUserToDB()
   }, [])

   useMountedEffect(() => {
      const autoLogin = async () => {
         try {
            const authInfo = LocalStorage.get(AUTH_LS_INFO_KEY)
            setCredentials(authInfo)
         } catch (error) {
            console.log(error)
         }
      }
      autoLogin()
   }, [userId])

   return (
      <>
         <Header />
         <TabsList />
         <AppsList />
      </>
   )
}

export default App

// Tabs
// TabItem
// Apps
// AppItem
// SearchBar
// Profile
