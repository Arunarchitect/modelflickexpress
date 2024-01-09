import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Grid, Card, Typography, Tabs, Tab, Box } from '@mui/material'
import pic1 from '../../images/construct.png'
import UserLogin from './UserLogin'
import Registration from './Registration'

const TabPanel = (props) => {
    const {children, value, index} = props;
    return(
      <div role='tabpanel' hidden={value !== index}>
        {
          value === index && (
            <Box>{children}</Box>
          )
        }
      </div>
    )
  }

const LoginReg = () => {   
    const [value,setValue]= useState(0)
    const handleChange = (event,newValue) => {
        setValue(newValue)
    }
  return (
    <Layout>
        <Grid container sx={{height:'90vh'}}>
        <Grid item  lg={7} sm={5} sx={{
          backgroundImage:`url(${pic1})`,
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover',
          backgroundPosition:'center',
          display:{xs:'none', sm:'block'}
        }}>
        </Grid>
        <Grid item  xs={12} lg={5} sm={7} >
          <Card sx ={{width:'100%', height:'100%'}}>
            <Box sx={{ borderBottom:1, borderColor:'divider'}}>
              <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                <Tab label='Login' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
                <Tab label='Registration' sx={{textTransform:'none', fontWeight:'bold'}}></Tab>
              </Tabs>
              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Registration />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default LoginReg