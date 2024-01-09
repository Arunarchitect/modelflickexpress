import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Grid, Popover, MenuItem, IconButton, Snackbar } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/Dash.css';
import EditPost from './blog/EditPost';
import { BASE_URL } from '../services/urlApi'

import { useGetResumeprofileQuery, useDeleteProfileMutation } from '../services/testApi';

const Blog = () => {
  const { data, isSuccess, refetch } = useGetResumeprofileQuery();
  const [blogs, setBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteProfileMutation] = useDeleteProfileMutation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    // Handle edit logic for the selected blog (e.g., navigate to the edit page)
    console.log('Edit clicked for blog:', selectedBlog);
    navigate(`/edit/${selectedBlog.id}`);
    handleClose();
  };

  const handleDeleteClick = async () => {
    try {
      await deleteProfileMutation(selectedBlog.id);
      setSnackbarOpen(true);
      // Manually update the state after successful deletion
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== selectedBlog.id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      handleClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setBlogs(data.blogs);
    }
  }, [data, isSuccess, refetch]);

  const key = isSuccess ? 'success' : 'failure';

  return (
    <Layout key={key}>
      <Grid container spacing={2} padding={3} style={{ backgroundColor: 'gray' }} justifyContent="center">
        {blogs.map((blog, index) => (
          <Grid key={index} item xs={12} lg={4} sm={4} padding={2}>
            <Card
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              className='cardgradient'
            >
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label={blog.avatarLabel}>{blog.avatarLabel}</Avatar>}
                action={
                  <div>
                    <IconButton aria-label="settings" onClick={(event) => { handleClick(event); setSelectedBlog(blog); }}>
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleEditClick}>
                        <EditIcon />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteClick}>
                        <DeleteIcon />
                        Delete
                      </MenuItem>
                    </Popover>
                  </div>
                }
                title={
                  <Link to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h7">{blog.title}</Typography>
                    <Typography variant="subtitle1" style={{ fontSize: '0.8em' }}>{blog.subtitle}</Typography>
                  </Link>
                }
              />
              <Link to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  alt={blog.title}
                  height="140"
                  image={`${BASE_URL}${blog.bimage}`} 
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {blog.subheader}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          handleSnackbarClose();
          // Auto-refresh the data after deleting a post
          refetch();
        }}
        message="Blog deleted successfully."
      />
    </Layout>
  );
};

export default Blog;
