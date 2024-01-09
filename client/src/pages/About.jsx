import React from 'react';
import Layout from '../components/layout/Layout';
import Typography from '@mui/material/Typography';
import { Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <h1>About this Project</h1>
            <Typography variant="body1" paragraph>
              Welcome to our platform! We are dedicated to providing valuable
              information and assistance to help you with designing and planning.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you are a DIY enthusiast, a homeowner, or someone looking for
              inspiration, we've got you covered. Our mission is to simplify the
              process and make it enjoyable for everyone.
            </Typography>
            <Typography variant="body1" paragraph>
              Explore our resources, tips, and <Link to="/tools">tools</Link> to unleash your creativity and
              turn your ideas into reality. We believe that everyone deserves a
              well-designed and planned space, and we are here to support you on
              your journey.
            </Typography>
            <p>You can read our terms & conditions by clicking <Link to="/tools">here!</Link></p>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <h1>Donate</h1>
            <p>Support our venture by donating to us !</p>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
