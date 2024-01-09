import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Box, Grid, CardMedia, Container, Typography } from "@mui/material";
import constructImage from '../../images/construct.png';
import { useParams } from "react-router-dom";
import { useGetResumeprofileQuery } from '../../services/testApi';
import { BASE_URL } from '../../services/urlApi'

const Post = () => {
  const { id } = useParams();
  const imageSource = constructImage;

  const { data, isSuccess, isError } = useGetResumeprofileQuery();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && isSuccess) {
      const selectedBlog = data.blogs.find(blog => blog.id === parseInt(id));
      setBlog(selectedBlog);
      setLoading(false);
    }
  }, [data, isSuccess, id]);

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography variant="h5" align="center" mt={4}>
            Loading...
          </Typography>
        </Container>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout>
        <Container>
          <Typography variant="h5" align="center" mt={4}>
            {isError ? 'An error occurred while fetching the blog.' : 'Blog Not Found'}
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
        
          <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography variant="h5" align="center" mt={4}>
              {blog.title}
            </Typography>
            <Typography variant="body2" align="center" color={"GrayText"} p={4}>
              by {blog.subtitle}
            </Typography>
            <CardMedia
              sx={{ height: "500px", width: "100%" }}
              component="img"
              image={`${BASE_URL}${blog.bimage}`}
              alt="architect"
            />
            
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            
            
            <Typography variant="body1" align="center" m={2}>
              {blog.content}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Post;
