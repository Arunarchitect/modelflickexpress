import React from 'react';
import { Box, Grid, Card, CardContent } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { useGetProjectQuery } from '../../services/testApi';

const Projects = () => {
  const { data: projectData } = useGetProjectQuery();


  // Check if projectData and projects are available before mapping
  // const projects = projectData && projectData.projects ? projectData.projects : [];
  const projects = projectData ? projectData : [];
  // Log projectData to the console for debugging


// Check if projectData is available before mapping

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 240, sm: 300, md: 300, lg: 300 } }} className='gradient3'>
              <CardContent>
                <h2>Profile Info</h2>
              </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 120, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className='gradient3'>
              <CardContent>
                <h2>Project Detail</h2>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ height: '100%' }} className='gradient3'>
              <CardContent>
                
                <h2>My projects</h2>
                {projects.map((project) => (
                  <div key={project.id}>
                    <p>{project.name}-{project.description}</p>
                    <h4>Members:</h4>
                    <ul>
                      {project.members.map((member) => (
                        <li key={member.id}>{member.name}</li>
                      ))}
                    </ul>
                    {console.log(project)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Projects;
