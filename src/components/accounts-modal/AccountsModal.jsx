import React, { useContext } from 'react'
import { Divider, List } from '@mui/material'
import AppModal from '../UI/modal/AppModal'
import { AuthContext } from '../../store/AuthContext'
import AccountItem from './AccountItem'

const accounts = [
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
   const { user } = useContext(AuthContext)
   const { email } = user || {}
   return (
      <AppModal isOpen={isOpen} onClose={onClose} title="Accounts">
         <List sx={{ pt: 0 }}>
            <AccountItem email={email} disabled />
            <Divider />
            {accounts.map((account) => (
               <AccountItem email={account.email} key={account.userId} />
            ))}
         </List>
      </AppModal>
   )
}

export default AccountsModal
