import React, { useContext, useState } from 'react'
import {
   AppBar,
   Avatar,
   Box,
   Divider,
   IconButton,
   InputBase,
   Menu,
   MenuItem,
   Toolbar,
   Typography,
   alpha,
   styled,
} from '@mui/material'
import { AccountCircle, Search as SearchIcon } from '@mui/icons-material'
import AccountsModal from '../components/accounts-modal/AccountsModal'
import { AuthContext } from '../store/AuthContext'

const getFirstLetter = (nameStr) => {
   return nameStr?.[0] || ''
}

const Header = () => {
   const { user } = useContext(AuthContext)
   const { email, username } = user || {}

   const [anchorEl, setAnchorEl] = React.useState(null)

   const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false)

   const isMenuOpen = Boolean(anchorEl)

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   const handleChangeAccount = () => {
      setIsAccountsModalOpen(true)
      handleMenuClose()
   }

   const menuId = 'primary-search-account-menu'
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         id={menuId}
         keepMounted
         transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <ProfileContainer>
            <Avatar>{getFirstLetter(username)}</Avatar>
            <div className="credentials_block">
               <Typography variant="h6">{username}</Typography>
               <Typography>{email}</Typography>
            </div>
         </ProfileContainer>
         <Divider />
         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
         <MenuItem onClick={handleChangeAccount}>Change account</MenuItem>
      </Menu>
   )

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" sx={{ background: '#625df5' }}>
            <StyledToolbar>
               <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
               >
                  <AccountCircle fontSize="large" />
               </IconButton>
               <Search>
                  <SearchIconWrapper>
                     <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                     placeholder="Search…"
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </Search>
            </StyledToolbar>
         </AppBar>

         {renderMenu}

         <AccountsModal
            isOpen={isAccountsModalOpen}
            onClose={() => setIsAccountsModalOpen(false)}
         />
      </Box>
   )
}

const StyledToolbar = styled(Toolbar)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '1rem',
}))

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      minWidth: '30rem',
   },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: '12ch',
         '&:focus': {
            width: '20ch',
         },
      },
   },
}))

const ProfileContainer = styled(Box)(() => ({
   display: 'flex',
   padding: '1rem',
   gap: '1rem',
   flexWrap: 'wrap',
   '& .credentials_block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
}))

export default Header
