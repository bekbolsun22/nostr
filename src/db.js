/* eslint-disable import/no-extraneous-dependencies */
import Dexie from 'dexie'

export const db = new Dexie('myDatabase')
db.version(1).stores({
   apps: '++id,title,image,userId',
   users: '++id,userId,username,email',
   tabs: '++id,source,image,userId',
})
