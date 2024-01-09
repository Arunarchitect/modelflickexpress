import React from 'react'
import Layout from '../../components/layout/Layout'
import { Box, Typography } from '@mui/material'

const Schedule = () => {
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
,        }}>
          <h1>Under Development: Tools Page</h1>
                <h2>Our Commitment to Excellence</h2>
                <p>Welcome to the Tools Page! We are excited to share that this section is currently under development, and we want to assure you that we are dedicating careful attention and effort to create a seamless and effective user experience for you.</p>

                <h2>Why Development Matters</h2>
                <p>At our core, we believe in providing high-quality services and tools to enhance your experience. The development process is crucial in ensuring that each tool meets the highest standards of functionality, user-friendliness, and reliability. We understand the importance of the tools in streamlining processes and making your interaction with our platform more efficient.</p>

                <h2>Our Development Approach</h2>
                <p>Our development team is working diligently to create tools that not only meet but exceed your expectations. We employ the latest technologies and follow best practices to build robust and scalable solutions. Regular testing and optimization are integral parts of our development cycle to ensure that the tools perform flawlessly once they are released.</p>

                <h2>What to Expect</h2>
                <p>While the Tools Page is currently under construction, we want to keep you informed about our progress. You can anticipate a range of tools designed to cater to your specific needs. Whether it's enhanced navigation, data analysis, or any other functionality, our goal is to make your experience on our platform as smooth and efficient as possible.</p>

                <h2>Stay Tuned for Updates</h2>
                <p>We appreciate your patience and understanding as we work on perfecting the Tools Page. We will regularly update you on our progress and any new additions to the toolset. Your feedback is valuable to us, so please feel free to reach out with any suggestions or features you'd like to see.</p>

                <h2>Conclusion</h2>
                <p>In conclusion, the Tools Page is currently in the development phase, and we are prioritizing its creation to provide you with effective and valuable tools. Thank you for your continued support, and we look forward to unveiling a comprehensive suite of tools that will enhance your overall experience on our platform.</p>
        </Box>
    </Layout>
  )
}

export default Schedule