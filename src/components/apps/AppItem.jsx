import { Avatar, Box, Typography, styled } from '@mui/material'
import React from 'react'

const AppItem = ({ image, title = 'App Title', onAppClick }) => {
   return (
      <StyledBox onClick={onAppClick}>
         <Avatar
            alt={title}
            src={image}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
         />
         <Typography variant="body2">{title}</Typography>
      </StyledBox>
   )
}

const StyledBox = styled(Box)(() => ({
   display: 'inline-flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '0.5rem',
   color: 'white',
   padding: '0.5rem 0',
}))

export default AppItem
