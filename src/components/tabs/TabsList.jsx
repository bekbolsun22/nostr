import { Box, Typography, styled } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useContext } from 'react'
import { AuthContext } from '../../store/AuthContext'
import { db } from '../../db'
import { USER_ID } from '../../utils/constants/general'
import TabItem from './TabItem'

const TabsList = () => {
   const { user } = useContext(AuthContext)
   const { userId } = user || {}
   const tabs = useLiveQuery(() => {
      if (!userId) {
         return []
      }
      return db.tabs.where(USER_ID).equals(userId).toArray()
   }, [userId])

   const renderedTabs = tabs || []

   const deleteTabHandler = async (tabId) => {
      try {
         await db.tabs.delete(tabId)
         console.log(`Tab with ID ${tabId} deleted successfully.`)
      } catch (error) {
         console.error(`Error deleting tab with ID ${tabId}:`, error)
      }
   }

   return (
      <Container>
         <Typography variant="h5" gutterBottom color="white">
            Tabs
         </Typography>

         <TabsContainer>
            {renderedTabs.length === 0 && (
               <Typography color="white">No Tabs</Typography>
            )}
            {renderedTabs.map((tab) => (
               <TabItem
                  image={tab.image}
                  source={tab.source}
                  key={tab.id}
                  onDelete={() => deleteTabHandler(tab.id)}
               />
            ))}
         </TabsContainer>
      </Container>
   )
}

const Container = styled(Box)(() => ({
   padding: '1rem',
   overflowX: 'scroll',
   minHeight: '10rem',
}))

const TabsContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '1.5rem',
   overflowX: 'scroll',
}))
export default TabsList
