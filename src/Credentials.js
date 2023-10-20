import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "./utility/api/api";
import uiAction from './store/actions/uiAction';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import Container from "@mui/material/Container";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { blue, blueGrey, lightBlue, grey } from '@mui/material/colors';

export default function Credentials() {
  const resultTextStyle = {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5rem',
    fontFamily: 'Google Sans, Helvetica Neue, sans - serif',
    letterSpacing: 'normal',
    whiteSpace: 'pre - wrap',
  }
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const options = [{ label: 'My SQL', value: 'mysql' }, { label: 'Snowflake', value: 'snowflake' }];
  const [selectedValue, setSelectedValue] = useState({ label: 'Snowflake', value: 'snowflake' });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm({
    mode: 'onChange', // Enable live validation
  });

  const validationRules = {
    account_name: {
      required: 'Account name is required',
      // pattern: {
      //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      //     message: 'Invalid email',
      // },
    },
    user_name: {
      required: 'User name is required',
    },

    password: {
      required: 'Password is required',
      // pattern: {
      //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}(?=.*[@$!%*?&]).*$/,
      //   message: 'Invalid password',
      // },
    }

  };
  const [formData, setformData] = useState({ dbms: '', account_name: '', user_name: '', password: '', showPassword: false });
  const handleSelectChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  // const registerCred = (event, newValue) => {
  //   setSelectedValue(newValue);
  // };


  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = (prop) => () => {
    setformData({
      ...formData,
      [prop]: !formData[prop],
    });
  };
  const [loading, setLoading] = useState(false);

  const onSubmit = (form) => {
    let data = {
      db_credentials: {
        'user_name': form.user_name,
        'account_name': form.account_name,
        'password': form.password,
      },
      dbms: selectedValue.value
    };
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/register-db-access-details`,
      data
    })
      .then((res) => {
        if (!res.data.status) {
          dispatch(uiAction.showSnackbar({ type: 'error', message: res.data.message }));
          return;
        }
        setLoading(false);
        reset();
        dispatch(uiAction.showSnackbar({ type: 'success', message: res?.data?.message || 'User registered Successfuly!!!' }));
      })
      .catch((err) => {
        setLoading(false);
        dispatch(uiAction.showSnackbar({ type: 'error', message: 'Something went wrong.Please try after some time' }));
      });


  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: isMobile ? '100%' : '600px', maxWidth: '100%', minHeight: 'calc(100vh - 120px)', backgroundColor: "#fff", borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', p: 4 }}>
        <Typography variant="h6" sx={{ pb: 1, justifySelf: 'flex-start', alignSelf: 'flex-start' }}>Credentials</Typography>
        <Divider color={blue[500]} sx={{ height: 2, width: '102px' }} />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', pt: 5 }}>
          <Typography sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', px: 2 }} variant="subtitle2">Data Store Name</Typography>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', px: 2 }}>
            <Autocomplete
              id="three-options-autocomplete"
              options={options}
              getOptionLabel={(option) => option.label}
              value={selectedValue}
              onChange={handleSelectChange}
              {...register('dbms', {
                ...validationRules.dbms,
              })}
              variant='standard'
              sx={{
                width: isMobile ? '100%' : '300px', // Adjust the width as needed
                '& .MuiOutlinedInput-input': {
                  ...resultTextStyle,
                  padding: '32px 8px', // Adjust the padding as needed
                },
                borderRadius: '8px'
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="autocomplete-text-field"
                  placeholder="Select a database type"
                  variant="standard"
                  fullWidth
                />
              )}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', px: 2 }} variant="subtitle2">Account Name</Typography>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', px: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account_name"
              placeholder="Enter Account name"
              name="account_name"
              autoComplete="account_name"
              autoFocus
              variant='standard'
              {...register('account_name', {
                ...validationRules.account_name,
              })}
              error={errors.account_name}
              helperText={errors.account_name && errors.account_name.message}
              sx={{
                width: isMobile ? '100%' : '300px', // Adjust the width as needed
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', px: 2 }} variant="subtitle2">User Name</Typography>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', px: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              placeholder="Enter User name"
              name="user_name"
              autoComplete="user_name"
              autoFocus
              variant='standard'
              sx={{
                width: isMobile ? '100%' : '300px', // Adjust the width as needed
              }}
              {...register('user_name', {
                ...validationRules.user_name,
              })}
              error={errors.user_name}
              helperText={errors.user_name && errors.user_name.message}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', mb: isMobile ? 2 : 'auto' }}>
          <Typography sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', px: 2 }} variant="subtitle2">Password</Typography>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', px: 2 }}>
            <Input
              id="standard-adornment-password"
              type={formData.showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              {...register('password', {
                ...validationRules.password,
              })}
              error={errors.password}
              helperText={errors.password && errors.password.message}
              fullWidth
              variant='standard'
              sx={{
                py: 2,
                '& .MuiOutlinedInput-input': {
                  ...resultTextStyle,
                  padding: '10px', // Adjust the padding as needed
                },
                width: isMobile ? '100%' : '300px', // Adjust the width as needed
              }}
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
          </Box>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{ borderRadius: '8px', p: 1, mt: 2, px: 2, ml: isMobile ? 2 : 'auto' }}
            disableElevation
          >
            Register
          </Button>
        </Box>
      </Box>


    </Container>
  )
}
