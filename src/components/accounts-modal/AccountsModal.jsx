import React, { useContext } from 'react'
import { Divider, List } from '@mui/material'
import AppModal from '../UI/modal/AppModal'
import { AuthContext } from '../../store/AuthContext'
import AccountItem from './AccountItem'
import { LocalStorage, addApp, addUser } from '../../utils/helpers/general'
import { AUTH_LS_INFO_KEY } from '../../utils/constants/general'

const accounts = [
   {
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
   },
   {
      email: 'username@gmail.com',
      userId: 'npub1yfg0d955c2jrj2080ew7pa4xrtj7x7s7umt28wh0zurwmxgpyj9shwv6vg',
      username: 'John Doe',
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
      ],
   },
   {
      email: 'user02@gmail.com',
      userId: 'npub1klr0dy2ul2dx9llk58czvpx73rprcmrvd5dc7ck8esg8f8es06qs427gxc',
      username: 'Alexa Smith',
      apps: [],
   },
]

const AccountsModal = ({ isOpen, onClose }) => {
   const { user, setCredentials } = useContext(AuthContext)
   const { email: currentUserEmail, userId: currentUserId } = user || {}

   const changeAccountHandler = async (selectedUser) => {
      const { apps, ...user } = selectedUser
      await addUser(user)
      apps.forEach(async (app) => {
         await addApp(app, user.userId)
      })
      setCredentials(user)
      LocalStorage.save(AUTH_LS_INFO_KEY, user)
      onClose()
   }

   const renderedAccounts = accounts.filter(
      (acc) => acc.userId !== currentUserId
   )

   return (
      <AppModal isOpen={isOpen} onClose={onClose} title="Accounts">
         <List sx={{ pt: 0 }}>
            <AccountItem email={currentUserEmail} disabled />
            <Divider />
            {renderedAccounts.map((account) => (
               <AccountItem
                  onClick={() => changeAccountHandler(account)}
                  email={account.email}
                  key={account.userId}
               />
            ))}
         </List>
      </AppModal>
   )
}

export default AccountsModal
