import React, { useState } from 'react'
import { TextField, Box, Button,  FormControlLabel, Checkbox, Typography, Alert} from '@mui/material'
import {  useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/testApi'
import { storeToken } from '../../services/LocalStorageService'


const Registration = () => {
    const [server_error, setServerError] = useState({})
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    
    const navigate = useNavigate()
    const [registerUser, {isLoading}] = useRegisterUserMutation()
    const handleSubmit =  async (e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            tc: data.get('tc')
        }
        const res = await registerUser(actualData)
        if (res.error) {
          console.log(res.error.data.errors);
          setServerError(res.error.data.errors);
        }
      
        if (res.data) {
          console.log(res.data);
          // Move navigation inside the success block
          storeToken(res.data.token)
          navigate('/dashboard');
        }
    }
  return (
    <>
        {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]):""}
        {server_error.email ? console.log(server_error.email[0]):""}
        {server_error.password ? console.log(server_error.password[0]):""}
        {server_error.password2 ? console.log(server_error.password2[0]):""}
        {server_error.tc ? console.log(server_error.tc[0]):""}

        <Box component='form' noValidate sx={{mt:1, mx:1}} id='registration-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth
              id='name'
              label='Name'
              name='name'
            />
            {server_error.name ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.name[0]}</Typography>:""}
            <TextField margin='normal' required fullWidth
              id='email'
              label='Email Address'
              name='email'
            />
            {server_error.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.email[0]}</Typography>:""}
            <TextField margin='normal' required fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
            />
            {server_error.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.password[0]}</Typography>:""}
            <TextField margin='normal' required fullWidth
              id='password2'
              label='Retype-Password'
              name='password2'
              type='password'
            />
            {server_error.password2 ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.password2[0]}</Typography>:""}
            <FormControlLabel
            control={
                <Checkbox
                value={true}
                color='primary'
                name='tc'
                id='tc'
                checked={isChecked}
                onChange={handleCheckboxChange}
                />
            }
            label='I agree to the terms'
            />
            {server_error.tc ? <span style={{fontSize:12, color:'red', paddingLeft:10}} >{server_error.tc[0]}</span>:""}
            <Box textAlign='center' >
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Register</Button>
            </Box>
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert>:""}
        </Box>
    </>
  )
}

export default Registration