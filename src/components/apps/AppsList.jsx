/* eslint-disable import/no-extraneous-dependencies */
import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import AppItem from './AppItem'
import { db } from '../../db'
import { USER_ID } from '../../utils/constants/general'
import { AuthContext } from '../../store/AuthContext'

const AppsList = () => {
   const { user } = useContext(AuthContext)
   const { userId } = user || {}

   const apps = useLiveQuery(() => {
      if (!userId) {
         return []
      }
      return db.apps.where(USER_ID).equals(userId).toArray()
   }, [userId])

   const renderedApps = apps || []
   return (
      <Container>
         <Typography variant="h5" gutterBottom color="white">
            Apps
         </Typography>

         <AppsContainer>
            {renderedApps.length === 0 && (
               <Typography color="white">No Apps</Typography>
            )}
            {renderedApps.map((app) => (
               <AppItem image={app.image} title={app.title} key={app.id} />
            ))}
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
