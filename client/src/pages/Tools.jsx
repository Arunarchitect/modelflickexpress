import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/Dash.css';
import constructImage from '../images/construct.png';

const Tools = () => {
  const imageSource = constructImage;

  const [isRotated, setIsRotated] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const resetRotation = () => {
    setIsRotated(false);
  };

  useEffect(() => {
    const blinkTimers = [];

    // Function to generate a random blink for each card
    const blinkRandomly = (index) => {
      blinkTimers[index] = setInterval(() => {
        setOpacity((prevOpacity) => (Math.random() > 0.5 ? 1 : 0.5));
      }, 250);
    };

    // Set up the blink timers for each card
    const toolsLength = tools.length;
    for (let i = 0; i < toolsLength; i++) {
      blinkRandomly(i);
    }

    // Clear all timers when the component unmounts
    return () => {
      blinkTimers.forEach((timer) => clearInterval(timer));
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const tools = [
    { title: 'Cost Analyzer', subheader: 'Analyze project costs', avatarLabel: 'C', route: '/test' },
    { title: 'Project Scheduler', subheader: 'Get instantaneous schedules', avatarLabel: 'S', route: '/scheduler' },
    { title: 'Employee Manager', subheader: 'Empoyee and work database', avatarLabel: 'E', route: '/employee' },
    { title: 'Regulatory Compliance', subheader: 'Ensure compliance', avatarLabel: 'R', route: '/schedule' },
    
    { title: 'Data Analysis Suite', subheader: 'Analytical insights', avatarLabel: 'D', route: '/schedule' },
    { title: 'Project Evaluation', subheader: 'Evaluate project viability', avatarLabel: 'P', route: '/schedule' },
  ];

  return (
    <Layout>
      <Grid container spacing={2} padding={3} style={{ backgroundColor: 'gray' }} justifyContent="center">
        {tools.map((tool, index) => (
          <Grid key={index} item xs={12} lg={4} sm={4} padding={2}>
            <Link to={tool.route} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  position: 'relative',
                  '&:hover': {
                    transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)',
                  },
                }}
                className='cardgradient'
                onClick={handleRotate}
              >
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label={tool.avatarLabel}>{tool.avatarLabel}</Avatar>}
                  action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                  title={tool.title}
                  subheader={tool.subheader}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={imageSource}
                  alt={tool.title}
                  style={{
                    transition: 'transform 0.5s, opacity 0.5s',
                    opacity: opacity,
                  }}
                  onAnimationEnd={resetRotation}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {tool.subheader}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Tools;
