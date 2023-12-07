import {useState, SyntheticEvent} from 'react';
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { UserErrors } from "../../models/errors";
import {useNavigate} from 'react-router-dom';
import { setIsAuthenticated } from '../../store/authSlice';
import './style.css';
import { useDispatch } from 'react-redux';

export const AuthPage = () => {
    const [isLoginMode, setLoginMode] = useState(true);

    const toggleMode = () => {
        setLoginMode((prevMode) => !prevMode);
    };
    return (
        <div className="auth">
            {isLoginMode ? (
        <div>
          <Login />
          <p className='auth-toogle-link'>
            Don't have an account?{' '}
            <span className="pe-auto" onClick={toggleMode}>Click here to register</span>
          </p>
        </div>
      ) : (
        <div>
          <Register />
          <p className='auth-toogle-link'>
            Already have an account?{' '}
            <span className="cursor-pointer" onClick={toggleMode}>Click here to login</span>
          </p>
        </div>
      )}
        </div>
    )
};

const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();


    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/user/register", {
                username, password,
            });
            alert("Registration Completed! Now Login.");
            navigate("/");

        } catch (error) {
            if (error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                alert ("ERROR: Username already in use.")
            } else {
                alert ("ERROR: Something went wrong.")
            }
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2> Register</h2> 
                <div className="form-group">
                    <label htmlFor="username">
                         Username: 
                    </label> 
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password: 
                    </label> 
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/> 
                </div>
                <button type="submit">Register</button>
            </form> 
        </div>
    );
};
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [_, setCookies] = useCookies(["access_token"]);
    const dispatch = useDispatch();
    const navigate = useNavigate()



    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            const resp = await axios.post("http://localhost:3001/user/login", {
                username, password,
            });
            setCookies("access_token", resp.data.token);
            localStorage.setItem("userID", resp.data.userID);
            dispatch(setIsAuthenticated(true))
            navigate("/");
        } catch (error) {
            let errorMessage: string = "";
            switch (error.response.data.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = "User doesn't exist";
                    break;
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = "Wrong username/password combination";
                    break;
                default:
                    errorMessage = "Something went wrong";
            }
            alert ("ERROR: " + errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2> Login</h2> 
                <div className="form-group">
                    <label htmlFor="username">
                         Username: 
                    </label> 
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password: 
                    </label> 
                    <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/> 
                </div>
                <button type="submit">Login</button>
            </form> 
        </div>
    );
}