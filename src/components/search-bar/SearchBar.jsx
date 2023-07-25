/* eslint-disable no-nested-ternary */
import { InputBase, alpha, styled } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import { addTab } from '../../utils/helpers/general'
import { AuthContext } from '../../store/AuthContext'

const SearchBar = () => {
   const [enteredValue, setEnteredValue] = useState('')

   const { user } = useContext(AuthContext)
   const { userId } = user || {}

   const searchValueChangeHandler = (e) => {
      setEnteredValue(e.target.value)
   }

   const searchHandler = (evt) => {
      const keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : evt.keyCode
      if (keyCode === 13) {
         addTab(
            {
               source: enteredValue,
               image: '',
            },
            userId
         ).then(() => setEnteredValue(''))
      }
   }

   return (
      <Search>
         <SearchIconWrapper>
            <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={searchValueChangeHandler}
            value={enteredValue}
            onKeyUp={searchHandler}
         />
      </Search>
   )
}

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

export default SearchBar
