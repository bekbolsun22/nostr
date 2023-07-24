import { useContext } from 'react'
import AppsList from './components/apps/AppsList'
import Header from './layout/Header'
import { db } from './db'
import useMountedEffect from './hooks/useMountedEffect'
import { AUTH_LS_INFO_KEY, USER_ID } from './utils/constants/general'
import { AuthContext } from './store/AuthContext'
import { LocalStorage } from './utils/helpers/general'

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

const addApp = async (appData, userId) => {
   try {
      const app = {
         ...appData,
         userId,
      }
      await db.apps.add(app)
   } catch (error) {
      console.error('Error adding app:', error)
   }
}

const addUser = async (userData) => {
   try {
      await db.users.add(userData)
      LocalStorage.save(AUTH_LS_INFO_KEY, userData)
   } catch (error) {
      console.error('Error adding user:', error)
   }
}

const App = () => {
   const { setCredentials } = useContext(AuthContext)
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
   }, [])

   return (
      <>
         <Header />
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
