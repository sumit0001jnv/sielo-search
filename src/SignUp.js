import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from "./utility/api/apiWithoutToken";
import uiAction from './store/actions/uiAction';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { blue, grey } from "@mui/material/colors";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Sielo App
            {' ' + new Date().getFullYear()}
            {'.'}
            All Rights Reserved
        </Typography>
    );
}
const theme = createTheme();
export default function SignUp() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset
    } = useForm({
        mode: 'onChange', // Enable live validation
    });

    const resultTextStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5rem',
        fontFamily: 'Google Sans, Helvetica Neue, sans - serif',
        letterSpacing: 'normal',
        whiteSpace: 'pre - wrap',
    }

    const [formData, setformData] = useState({
        username: '',
        password: '',
        email: '',
        mobile_number: '',
        org_name: '',
        _confirmPassword: '',
        _showPassword: false,
        _showConfirmPassword: false,
        _isValid: true
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = (form) => {

        // if(formData.password!==formData._confirmPassword){
        //   dispatch(uiAction.showSnackbar({ type: 'error', message: 'password and confirm password must be same' }));
        //   return;
        // }

        // if(!formData.password || !formData.username || !formData.email || !formData.org_name){
        //   dispatch(uiAction.showSnackbar({ type: 'error', message: 'Manadatory field(s) missing' }));
        // }

        let bodyFormData = new FormData();
        bodyFormData.append('username', form.username);
        bodyFormData.append('email', form.email);
        bodyFormData.append('password', form.password);
        bodyFormData.append('mobile_number', form.mobile_number);
        bodyFormData.append('org_name', form.org_name);

        setLoading(true);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/api/org-registration`,
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
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

    const validationRules = {
        email: {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
            },
        },
        username: {
            required: 'Name is required',
        },
        org_name: {
            required: 'Organization name is required',
        },
        password: {
            required: 'Password is required',
            // pattern: {
            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}(?=.*[@$!%*?&]).*$/,
            //   message: 'Invalid password',
            // },
        },
        _confirmPassword: {
            required: 'Confirm Password is required',
            // pattern: {
            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}(?=.*[@$!%*?&]).*$/,
            //   message: 'Invalid password',
            // },
            validate: (value) => value === watch('password') || 'Passwords do not match',
        },
        mobile_number: {
            required: 'Mobile number is required',
            // pattern: {
            //   value: /^[0-9]{10}$/,
            //   message: 'Invalid mobile number',
            // },
        },
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ minHeight: '100vh', justifyContent: 'center', backgroundColor: blue[50], p: 1 }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={6} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                }} component={Paper} elevation={1}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <Avatar sx={{ width: 20, height: 20, m: 1, border: `2px solid ${theme.palette.background.paper}`, bgcolor: 'secondary.main' }}>
                                <EditIcon sx={{ width: 12, height: 12, }} />
                            </Avatar>
                        }
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <PersonIcon />
                        </Avatar>
                    </Badge>
                    <Typography component="h1" variant="h5">
                        Create Account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="org_name"
                            label="Organization Name"
                            name="org_name"
                            type="text"
                            autoFocus
                            sx={{ mr: 2 }}
                            value={formData.name}
                            onChange={handleChange('org_name')}
                            {...register('org_name', {
                                ...validationRules.org_name,
                            })}
                            error={errors.org_name}
                            helperText={errors.org_name && errors.org_name.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="username"
                            label="User Name"
                            name="username"
                            type="text"
                            sx={{ mr: 2 }}
                            {...register('username', {
                                ...validationRules.username,
                            })}
                            error={errors.username}
                            helperText={errors.username && errors.username.message}
                        />
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            {...register('email', {
                                ...validationRules.email,
                            })}
                            error={errors.email}
                            helperText={errors.email && errors.email.message}
                        />
                        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                required
                                name="password"
                                label="Password"
                                type={formData._showPassword ? 'text' : 'password'}
                                id="password"
                                // autoComplete="current-password"
                                // value={formData.password}
                                // onChange={handleChange('password')}
                                {...register('password', {
                                    ...validationRules.password,
                                })}
                                error={errors.password}
                                helperText={errors.password && errors.password.message}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword('_showPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {formData._showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && <span>{errors.password.message}</span>}
                        </FormControl>
                        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password" required>Confirm Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                name="confirm-password"
                                label="Confirm Password"
                                type={formData._showConfirmPassword ? 'text' : 'password'}
                                id="_confirmPassword"
                                {...register('_confirmPassword', {
                                    ...validationRules._confirmPassword,
                                })}
                                error={errors._confirmPassword}
                                helperText={'sdfsdf' || errors.confirmPassword?.message}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword('_showConfirmPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {formData._showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors._confirmPassword && <span>{errors._confirmPassword.message}</span>}
                        </FormControl>
                        {/* <MuiPhoneNumber
              defaultCountry={"us"}
              onChange={e => handleChange('mobile_number',e)}
            /> */}
                        <TextField
                            margin="normal"
                            fullWidth
                            
                            id="mobile_number"
                            label="Mobile No"
                            name="mobile_number"
                            type="number"
                            {...register('mobile_number', {
                                ...validationRules.mobile_number,
                            })}
                            error={errors.mobile_number}
                            helperText={errors.mobile_number && errors.mobile_number.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="org_url"
                            label="Organization URL"
                            name="org_url"
                            type="text"
                            autoFocus
                            sx={{ mr: 2 }}
                            value={formData.name}
                            onChange={handleChange('org_url')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isValid || loading}
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            Create User
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/#/forget-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/#/sign-in" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Copyright sx={{ ...resultTextStyle, mt: 1, p: 1, width: '100%', order: 1, backgroundColor: blue['A100'], fontWeight: 400, color: '#000' }} />
            </Grid>
        </ThemeProvider>
    );
}