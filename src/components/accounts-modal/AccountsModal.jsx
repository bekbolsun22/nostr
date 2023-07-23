import React from 'react'
import {
   Avatar,
   List,
   ListItem,
   ListItemAvatar,
   ListItemButton,
   ListItemText,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { blue } from '@mui/material/colors'
import AppModal from '../UI/modal/AppModal'

const emails = ['username@gmail.com', 'user02@gmail.com']

const AccountsModal = ({ isOpen, onClose }) => {
   return (
      <AppModal isOpen={isOpen} onClose={onClose} title="Accounts">
         <List sx={{ pt: 0 }}>
            {emails.map((email) => (
               <ListItem disableGutters>
                  <ListItemButton
                     //  onClick={() => handleListItemClick(email)}
                     key={email}
                  >
                     <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                           <PersonIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={email} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </AppModal>
   )
}

export default AccountsModal
