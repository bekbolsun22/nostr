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
