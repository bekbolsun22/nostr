import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const AppsList = () => {
   return (
      <Container>
         <Typography variant="h5" gutterBottom color="white">
            Apps
         </Typography>
      </Container>
   )
}

const Container = styled(Box)(() => ({
   padding: '1rem',
   overflowX: 'scroll',
}))

export default AppsList
