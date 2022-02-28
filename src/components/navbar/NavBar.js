import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../hooks/useTheme';
import { Children } from 'react/cjs/react.production.min';
import { GoogleLogin } from 'react-google-login';


const NavBar = ({handleSuccess, handleFailure, handleLogout, loginData}) => {
  const navigate = useNavigate()
  const [{ navBarColor }] = useContext(ThemeContext)

  
  return <nav style={{ backgroundColor: navBarColor.backgroundColor }}>
    <div className='nav-wrapper' style={{ backgroundColor: navBarColor.backgroundColor }}>
      <h1 className='title' onClick={() => navigate('/')}>CookBook</h1>
      <div className='items'>
        <SearchBar />
        {
          loginData ? ( <div>
            <button onClick={() => navigate('/create')} className='create-btn'>create recipe</button>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
            ) : <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy='single_host_origin'
            ></GoogleLogin>
        }

      </div>

    </div>
  </nav>;
};

export default NavBar;
