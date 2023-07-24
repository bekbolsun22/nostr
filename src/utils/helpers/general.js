import { db } from '../../db'

export class LocalStorage {
   static save(key, value) {
      return localStorage.setItem(key, JSON.stringify(value))
   }

   static get(key) {
      return JSON.parse(localStorage.getItem(key))
   }

   static remove(key) {
      return localStorage.removeItem(key)
   }

   static clear() {
      return localStorage.clear()
   }
}

export const addApp = async (appData, userId) => {
   try {
      const appExists = await db.apps
         .where({ userId, title: appData.title })
         .count()

      if (appExists === 0) {
         const app = {
            ...appData,
            userId,
         }
         await db.apps.add(app)
         console.log('App added successfully:', app)
      } else {
         console.log('App already exists for this user.')
      }
   } catch (error) {
      console.error('Error adding app:', error)
   }
}

export const addUser = async (userData) => {
   try {
      const { userId } = userData
      const userExists = await db.users.where('userId').equals(userId).count()

      if (userExists === 0) {
         await db.users.add(userData)
      } else {
         console.log('User already exists.')
      }
   } catch (error) {
      console.error('Error adding user:', error)
   }
}
