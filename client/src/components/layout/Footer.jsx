import React from 'react'
import { Box, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <>
        <Box sx={{textAlign:'center', bgcolor:'#1A1A19', color:'white', p:1}}>
            <Box sx={{my:2, "& svg":{
                fontSize:"20px",
                cursor:"pointer",
                mx:3,
            },
            "& svg:hover":{
                color:'goldenrod',
                transform:'translateX(5px)',
                transition:'all 400ms',
            }}}>
                <Link to={'https://instagram.com/modelflick?igshid=OGQ5ZDc2ODk2ZA=='}><InstagramIcon /></Link>
                <Link to={'https://www.facebook.com/profile.php?id=100092985097432&mibextid=ZbWKwL'}><FacebookIcon /></Link>
                <Link to={'https://youtube.com/@Modelflick?si=7IuI-8uqdng2lzg1'}><YouTubeIcon /></Link>
                <Link to={'https://x.com/modelflick?t=7POKJbh0SWT5v51X33xMkA&s=09'}><TwitterIcon /></Link>
            </Box>
            <Typography sx={{ "@media(max-width:600px)": { fontSize: "1rem" } }}>
                All Rights Reserved &copy; Modelflick
            </Typography>
            <Typography sx={{ "@media(max-width:600px)": { fontSize: "1rem" } }}>
                <Link to={'/terms'}>Terms and Conditions</Link>
            </Typography>
        </Box>
    </>
  )
}

export default Footer