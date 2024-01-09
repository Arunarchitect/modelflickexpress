import React from 'react'
import Layout from '../components/layout/Layout'
import {Link} from 'react-router-dom'
import Construct from '../images/construct.png'
import '../styles/Homestyles.css'

const Home = () => {
  return (
    <Layout>
        <div className='home' style={{ backgroundImage: `url(${Construct})`, height: '100vh' }}>
          <div className="headerContainer">
            <h1>Modelflick</h1>
            <p>Design Assistance!</p>
            <Link to="/tools">
            <button>
              Explore our Tools!
            </button>
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default Home