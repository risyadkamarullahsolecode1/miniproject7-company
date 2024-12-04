import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../slices/authSlice';
import { Button, Card, Container, Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {    
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {      
      navigate('/profile'); 
    }
    
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
};

if (isLoading) {
    return (
      <div> <span>Loading...</span> </div>
    );
}

return (
    <Container>     
      <Card.Title className="text-center">Login</Card.Title>
        <Form onSubmit={onSubmit}>
            <FormField
                        label="Username"
                        id="username"
                        value={username}
                        name="username"
                        onChange={onChange}
                        required 
                        placeholder="Enter username"
            />
            <FormField
                        label="Password"
                        id="password"
                        value={password}
                        type="password"
                        name="password"
                        onChange={onChange}
                        required 
                        placeholder="Enter password"
            />
          <div className="d-grid">
            <Button type="submit" className="btn btn-primary" disabled={isLoading} >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </Form>         
        {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}  
    </Container>
  );
};

export default Login;
