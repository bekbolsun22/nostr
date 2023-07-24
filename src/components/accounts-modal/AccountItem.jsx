import {
   Avatar,
   ListItem,
   ListItemAvatar,
   ListItemButton,
   ListItemText,
} from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { blue } from '@mui/material/colors'

const AccountItem = ({ email, onClick, ...listItemProps }) => {
   return (
      <ListItem disableGutters {...listItemProps}>
         <ListItemButton onClick={onClick}>
            <ListItemAvatar>
               <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
               </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
         </ListItemButton>
      </ListItem>
   )
}

export default AccountItem
