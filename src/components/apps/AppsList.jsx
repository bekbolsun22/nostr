import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import AppItem from './AppItem'

const AppsList = () => {
   return (
      <Container>
         <Typography variant="h5" gutterBottom color="white">
            Apps
         </Typography>
         <AppsContainer>
            <AppItem />
         </AppsContainer>
      </Container>
   )
}

const Container = styled(Box)(() => ({
   padding: '1rem',
   overflowX: 'scroll',
}))

const AppsContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '1.5rem',
   overflowX: 'scroll',
}))

export default AppsList
