import React from 'react'
import Layout from '../components/layout/Layout'
import { Box, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Layout>
        <Box sx={{
          my:5,
          textAlign:"center",
          p:2,
          "& h4":{
            fontWeight:'bold',
            my:'2',
            fontSize:'2rem',
          },
          "& p":{
            textAlign:'justify',
            padding: '50px'
          },
          "@media (max-width:600px)":{
            mt:0,
          }
        }}>
          <Typography variant='h4'>
            Get in Touch
          </Typography>
          <p>
            We appreciate your interest in Modelflick! Whether you have questions, feedback, or just want to say hello, we'd love to hear from you. Feel free to reach out using the contact information provided below.
          </p>
          <br />
          <p>
            For general inquiries and information, you can contact us via email at <strong>modelflick@gmail.com</strong>. We aim to respond to emails within 24 hours.
          </p>
          <br />
          <p>
            Connect with us on our social media pages for the latest updates, design inspirations, and more. You can find us on Facebook, Twitter, Instagram, and Pinterest – all under the name Modelflick.
          </p>
          <br />
         
          <p>
            Stay connected with Modelflick for design trends, project updates, and more. We look forward to hearing from you!
          </p>
        </Box>
    </Layout>
  )
}

export default Contact
