import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, Grid, Typography, Box, Card, CardContent, TextField, Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken, removeToken } from '../services/LocalStorageService';
import { unsetUserToken } from '../features/authSlice';
import { useGetLoggedUserQuery, useSaveProfileMutation, useGetResumeprofileQuery } from '../services/testApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import ChangePassword from './auth/ChangePassword';
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [userData, setUserData] = useState({
    email: '',
    name: ''
  });

  const [blogs, setBlogs] = useState([]);

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setContent('');
    setBimage('');
    setPreviewImage(null);
    setIsImageSelected(false);
    document.getElementById('resume-form').reset();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name
      }));
    }
  }, [data, isSuccess, dispatch]);

  const Input = styled('input')({
    display: 'none',
  });

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [content, setContent] = useState();
  const [bimage, setBimage] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [saveProfile] = useSaveProfileMutation();
  const { data: resumeData, isSuccess: isResumeSuccess, refetch } = useGetResumeprofileQuery();

  useEffect(() => {
    if (resumeData && isResumeSuccess) {
      setBlogs(resumeData.blogs);
    }
  }, [resumeData, isResumeSuccess, refetch]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage.size > 1 * 1024 * 1024) {
      alert('Image size exceeds the limit (1MB). Please choose a smaller image.');
      return;
    }
    const previewURL = selectedImage ? URL.createObjectURL(selectedImage) : null;

    setBimage(selectedImage);
    setIsLoading(true);

    // Simulate a delay (replace this with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false);
      setPreviewImage(previewURL);
      setIsImageSelected(true);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (title && subtitle && content && isImageSelected) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      if (bimage) {
        formData.append('bimage', bimage);
      }

      console.log(formData)
      
      try {
        const res = await saveProfile(formData);
  
        if (res && res.data && res.data.status === 'success') {
          setError({ status: true, msg: 'Uploaded Successfully', type: 'success' });
          resetForm();
          refetch();
        } else {
          setError({ status: true, msg: 'Upload Failed', type: 'error' });
        }
      } catch (error) {
        // Handle other errors
        console.error('Error during form submission:', error);
        setError({ status: true, msg: 'An error occurred', type: 'error' });
      }
    } else {
      setError({ status: true, msg: 'All fields are required, and an image must be selected', type: 'error' });
    }
  };
  

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: '', email: '' }));
    dispatch(unsetUserToken({ access_token: null }));
    removeToken();
    navigate('/login');
  };

  return (
    <Layout>
      <CssBaseline />
      <Grid container>
        {/* Your Grid container content */}
      </Grid>
      <Box sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: 'gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 280, sm: 300, md: 300, lg: 300 } }} className="gradient3">
              <CardContent>
                <h5>Dashboard</h5>
                <Typography variant="h5">Email: {userData.email}</Typography>
                <Typography variant="h6">Hi {userData.name}, Welcome to the world of Modelflick</Typography>
                <Stack direction='row' alignItems='center' spacing={4}>
                  <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{ mt: 8 }}>
                    Logout
                  </Button>
                  <Button variant="contained" color="warning" size="large" component={NavLink} to={'/projects'} sx={{ mt: 8 }}>
                    My Projects
                  </Button>
                </Stack>

              </CardContent>
            </Card>
            <Card sx={{ width: '100%', height: { xs: 300, sm: 300, md: 300, lg: 300 }, mt: { xs: 2, sm: 2, md: 2, lg: 2 } }} className="gradient3">
              <CardContent>
                <ChangePassword />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ width: '100%', height: { xs: 650, sm: 615, md: 615, lg: 615 } }} className="gradient3">
              <CardContent>
                <h5>New Blog Article</h5>
                <Box component="form" sx={{ p: 3 }} noValidate id='resume-form' onSubmit={handleSubmit}>
                  <Typography variant="h5">Post</Typography>
                  <Typography variant="h6">Create Post</Typography>

                  <TextField
                    id="title" required fullWidth margin='normal' label='Title' onChange={(e) => { setTitle(e.target.value) }}
                  />
                  <TextField
                    id="subtitle" required fullWidth margin='normal' label='SubTitle' onChange={(e) => { setSubtitle(e.target.value) }}
                  />
                  <TextField
                    id="content" required fullWidth multiline rows={4} margin='normal' label='Content' onChange={(e) => { setContent(e.target.value) }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <label htmlFor="profile-photo">
                      <Input accept="image/*" id='profile-photo' type="file" onChange={handleImageChange} />
                      <Button variant='contained' component='span'>Upload Image</Button>
                    </label>

                    {/* Display a loading spinner while the image is loading */}
                    {isLoading && <div className="loading-spinner"></div>}

                    {/* Display image preview when available */}
                    {!isLoading && previewImage && (
                      <img src={previewImage} alt="Preview" style={{ maxWidth: '10%' }} />
                    )}

                    {/* Display animated tick mark when the image is selected */}
                    {isImageSelected && (
                      <div className="tick-mark-animation">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>

                  <Box>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }} color="error" disabled={!isImageSelected}>
                      Submit
                    </Button>
                    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
