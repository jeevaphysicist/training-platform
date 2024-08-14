// useHandleLogout.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { LogoutHandler } from '../Redux/userSlice';

export function useHandleLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // console.log('Logging out user');
        // Clear tokens
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');

        // Dispatch logout action
        dispatch(LogoutHandler(null));

        // Redirect to login page
        window.location.reload();
    };

    return handleLogout;
}
