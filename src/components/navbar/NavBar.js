import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';
import { useContext } from 'react';
import { ThemeContext } from '../../hooks/useTheme';
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
            <button className='logout-btn' onClick={()=>{navigate('/profile')}}>My Profile</button>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
            ) : <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              render={renderProps => (
                <button onClick={renderProps.onClick} style={{height: '1.81rem', backgroundColor: 'transparent', cursor: 'pointer', border: '1px solid white',borderRadius: '3px', marginLeft: '13px', fontSize: '13px', padding: '0px 15px 0px 15px', color: 'white'}}>Login</button>
              )}
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
