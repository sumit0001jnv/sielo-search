// import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import axios from './utility/api/apiWithoutToken';
// import axiosWithToken from '../../utility/api/api';
import { useDispatch } from 'react-redux';
import loginAction from './store/actions/loginAction';
import uiAction from './store/actions/uiAction';
import { blue, grey } from "@mui/material/colors";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="start" {...props}>
      {'Copyright © '}
      Sielo App
      {' ' + new Date().getFullYear()}
      {'.'}
      All Rights Reserved
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({ email: '', password: '', showPassword: false });
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('sielo_search_app') || '{}');
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = { login: true, userName: '', pathname: '/', userCategory: '' }
    let data = {
      email_id: formData.email,
      password: formData.password
    };
    axios({
      method: 'post',
      url: process.env.REACT_APP_BASE_URL + "/api/user-login",
      data
    }).then(async res => {
      if (!res.data.status) {
        dispatch(uiAction.showSnackbar({ type: 'error', message: res.data.message }));
        return;
      }

      const data = res.data.user_data;
      obj.userName = data.user_name;

      dispatch(loginAction.logIn());
      dispatch(uiAction.showSnackbar({ type: 'success', message: res.data.message || 'User logged in successfully' }));
      let store = localStorage.getItem('sielo_search_app');
      if (!store) {
        localStorage.setItem('sielo_search_app', '{}');
        store = localStorage.getItem('sielo_search_app');
      }

      // switch (parsedStore.userCategory) {
      //   case 'super_admin': {
      //     obj.pathname = '/organizations';
      //     break;
      //   }
      //   default: {
      //     obj.pathname = '/'
      //   }
      // }
      // obj.userCategory = parsedStore.userCategory
      navigate({
        pathname: '/search',
        state: obj
      })
    }).catch(err => {
      console.log(err);
      dispatch(uiAction.showSnackbar({ type: 'error', message: 'Something went wrong.Please try after some time' }));
    });


  };

  async function getOrgData(store) {
    try {
      const orgDataRes = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${store.token}` },
        url: process.env.REACT_APP_BASE_URL + `/api/get-org-data`,
        data: { user_id: store.user_id }
      })
      store.header = orgDataRes.data.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function getProjectColorData(store) {
    try {
      const orgDataRes = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${store.token}` },
        url: process.env.REACT_APP_BASE_URL + `/api/get-org-project-table-color`,
        data: { user_id: store.user_id }
      })
      store.project_color = orgDataRes.data.project_table_color;
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setformData({
      ...formData,
      [prop]: !formData[prop],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const resultTextStyle = {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5rem',
    fontFamily: 'Google Sans, Helvetica Neue, sans - serif',
    letterSpacing: 'normal',
    whiteSpace: 'pre - wrap',
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: blue[50] }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} sx={{ display: 'flex', flexDirection: 'column', p: 2, m: 1 }} component={Paper} elevation={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 6,
              py: 0,
              // boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant='standard'
                value={formData.email}
                onChange={handleChange('email')}
              />
              <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('showPassword')}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', px: 2, pb: 2 }}>
            <Grid item xs>
              <Link href="/#/forget-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Link href="/#/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Grid>
        <Copyright sx={{ ...resultTextStyle, mt: 'auto', p: 1, backgroundColor: blue['100'], fontWeight: 400, color: '#000', width: '100%', textAlign: 'center' }} />
      </Grid>

    </ThemeProvider>
  );
}