import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetResumeprofileQuery, useUpdateProfileMutation } from '../../services/testApi';
import Layout from '../../components/layout/Layout';

const EditPost = ({ id }) => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');

  const [updateProfile] = useUpdateProfileMutation();

  const { data, isSuccess} = useGetResumeprofileQuery();

  useEffect(() => {
    console.log('EditPost useEffect - id:', id);
    console.log('EditPost useEffect - data:', data);
    console.log('EditPost useEffect - isSuccess:', isSuccess);

    // Check if data exists and the query is successful
    if (isSuccess && data) {
      // Check if blogs array is not empty
      if (data.blogs && data.blogs.length > 0) {
        const selectedBlog = data.blogs.find((blog) => blog.id === id);

        console.log('EditPost useEffect - selectedBlog:', selectedBlog);

        if (selectedBlog) {
          setBlogData(selectedBlog);
          setTitle(selectedBlog.title);
          setSubtitle(selectedBlog.subtitle);
          setContent(selectedBlog.content);
        } else {
          console.log('EditPost useEffect - Redirecting to homepage');
          // navigate('/'); // Redirect to the home page if the blog is not found
        }
      } else {
        console.log('EditPost useEffect - Redirecting to homepage because blogs array is empty');
        // navigate('/');
      }
    }
  }, [id, data, isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && subtitle && content) {
      try {
        await updateProfile({
          id: id,
          title,
          subtitle,
          content,
        });

        setError({ status: true, msg: 'Updated Successfully', type: 'success' });
      } catch (err) {
        setError({ status: true, msg: 'Error updating post', type: 'error' });
      }
    } else {
      setError({ status: true, msg: 'All fields are required', type: 'error' });
    }
  };

  return (
    <Layout>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          width: '100%', // Take full width
          maxWidth: '600px', // Set a max width for large screens
          margin: 'auto', // Center the form on large screens
          padding: { xs: 2, sm: 4 }, // Add padding for small and medium screens
        }}
      >
        <Typography variant="h5" color="initial">Edit Post</Typography>
        <TextField
          id="title"
          required
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="subtitle"
          required
          fullWidth
          margin="normal"
          label="SubTitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <TextField
          id="content"
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
            color="error"
          >
            Update
          </Button>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Box>
    </Layout>
  );
  
};

export default EditPost;
