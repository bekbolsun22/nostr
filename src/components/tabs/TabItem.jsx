/* eslint-disable no-unused-vars */
import React from 'react'
import {
   Avatar,
   Box,
   IconButton,
   Tooltip,
   Typography,
   styled,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

const TabItem = ({ image, source, onDelete = () => {} }) => {
   return (
      <StyledBox>
         <AvatarWrapper>
            <Avatar
               alt={source}
               src={image}
               variant="rounded"
               sx={{ width: 56, height: 56 }}
            />
            <StyledIconButton onClick={onDelete}>
               <ClearIcon
                  color="secondary"
                  sx={{ background: '#e9e9e9', borderRadius: '50%' }}
                  fontSize="small"
               />
            </StyledIconButton>
         </AvatarWrapper>

         <Typography variant="body2">{source}</Typography>
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
   cursor: 'pointer',
}))

const AvatarWrapper = styled('div')(() => ({
   position: 'relative',
}))

const StyledIconButton = styled(IconButton)(() => ({
   position: 'absolute',
   top: '-1rem',
   right: '-1rem',
}))

export default TabItem
