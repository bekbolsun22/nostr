import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'

const AppModal = ({ isOpen, onClose, title = '', children, ...restProps }) => {
   return (
      <Dialog onClose={onClose} open={isOpen} {...restProps}>
         <DialogTitle>{title}</DialogTitle>
         {children}
      </Dialog>
   )
}

export default AppModal
