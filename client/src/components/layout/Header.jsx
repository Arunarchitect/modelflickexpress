import React,{useState} from 'react'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, Button, TextField } from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, NavLink} from 'react-router-dom'
import '../../styles/Headerstyles.css';
import { getToken } from '../../services/LocalStorageService';

const Header = () => {
  const {access_token} = getToken()
  const [mobileOpen, setMobileOpen]= useState(false)

  // handlemenu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  


  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign:'center'}}>
      <Typography color={'goldenrod'} variant='h6' component={"div"} sx={{flexGrow:1, my:2}}>
            <SettingsSuggestIcon />
              Modelflick
          </Typography>
          <Divider />
            <ul className='mobile-navigation'>
            <li>
              <Button component={NavLink} to={'/'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Home
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/tools'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Tools
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/blog'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Blog
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/contact'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Contact
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/product'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                product
              </Button>
            </li>
            <li>
              {access_token ? <Button component={NavLink} to={'/dashboard'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Dashboard
              </Button> : <Button component={NavLink} to={'/login'} style={({ isActive }) => ({ color: isActive ? 'white' : 'black', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Login/Register
              </Button> }
              
            </li>
            <li>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            <TextField
                sx={{ display: 'flex', borderBottom: '1px solid white', '::placeholder': { color: '#fff' } }}
                label="Search"
                id="standard-basic"
                variant="standard"
                InputLabelProps={{ style: { color: 'black' } }}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
            </li>
            </ul>
    </Box>
  )
  return (
    <Box>
      <AppBar component={'nav'} sx={{bgcolor:'black'}}>
        <Toolbar>
          <IconButton  color='inherit' aria-label='open drawer' edge='start' sx={{mr: 2, display:{sm:'none'},}} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography color={'goldenrod'} variant='h6' component={"div"} sx={{flexGrow:1}}>
            <SettingsSuggestIcon />
              Modelflick
          </Typography>
          <Box sx={{display:{xs:'none', sm:'block'}}}>
          <ul className='navigation-menu'>
            <li>
              <Button component={NavLink} to={'/'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Home
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/tools'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Tools
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/blog'}  style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Blog
              </Button>
            </li>      
            <li>
              <Button component={NavLink} to={'/contact'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Contact
              </Button>
            </li>
            <li>
              <Button component={NavLink} to={'/product'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                product
              </Button>
            </li>
            <li>
              {access_token ? <Button component={NavLink} to={'/dashboard'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Dashboard
              </Button> : <Button component={NavLink} to={'/login'} style={({ isActive }) => ({ color: 'white', textTransform: 'none', backgroundColor: isActive ? 'blue' : '' })}>
                Login/Register
              </Button> }
              
            </li>
            <li>
            <TextField
              sx={{
                display: 'flex',
                borderBottom: '1px solid white',
                '::placeholder': { color: '#fff' },
                '& input': { color: 'white' }, // Text color when typing
              }}
              label="Search here"
              id="standard-basic"
              variant="standard"
              InputLabelProps={{ style: { color: 'white' } }}
            />
            </li>
            
          </ul>
          
  
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} sx={{display:{xs:'block', sm:'none'}, "& .MuiDrawer-paper":{boxSizing:"boreder-box", width:"240px"}}}>
          {drawer}
        </Drawer>
      </Box>
      <Box >
        <Toolbar />
      </Box>
    </Box>
  )
}

export default Header