import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
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
import Input from '@mui/material/Input';
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
    const isMobile = useMediaQuery('(max-width:600px)');
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
        user_name: '',
        password: '',
        email_id: '',
        contact_num: '',
        org_name: '',
        _confirmPassword: '',
        _showPassword: false,
        _showConfirmPassword: false,
        _isValid: true,
        org_url: ''
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = (form) => {
        let data = {
            'user_name': form.user_name,
            'email_id': form.email_id,
            'password': form.password,
            'contact_num': form.contact_num,
            'org_url': form.org_url,
            'org_name': form.org_name
        };
        setLoading(true);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/api/user-registration`,
            data,
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
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
        email_id: {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
            },
        },
        user_name: {
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
        contact_num: {
            required: 'Mobile number is required',
            // pattern: {
            //   value: /^[0-9]{10}$/,
            //   message: 'Invalid mobile number',
            // },
        },
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ minHeight: '100vh', justifyContent: 'center', backgroundColor: blue[50] }}>
                <CssBaseline />
                <Grid xs={12} sm={8} md={5} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    m: isMobile ? 1 : 3
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
                            variant='standard'
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
                            id="user_name"
                            label="User Name"
                            name="user_name"
                            variant='standard'
                            type="text"
                            sx={{ mr: 2 }}
                            {...register('user_name', {
                                ...validationRules.user_name,
                            })}
                            error={errors.user_name}
                            helperText={errors.user_name && errors.user_name.message}
                        />
                        <TextField
                            required
                            margin="normal"
                            fullWidth
                            id="email_id"
                            label="Email Address"
                            variant='standard'
                            name="email_id"
                            {...register('email_id', {
                                ...validationRules.email_id,
                            })}
                            error={errors.email_id}
                            helperText={errors.email_id && errors.email_id.message}
                        />
                        <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                            <Input
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
                        <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password" required>Confirm Password</InputLabel>
                            <Input
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
                        <TextField
                            margin="normal"
                            fullWidth
                            id="contact_num"
                            label="Mobile No"
                            name="contact_num"
                            type="number"
                            variant="standard"
                            {...register('contact_num', {
                                ...validationRules.contact_num,
                            })}
                            error={errors.contact_num}
                            helperText={errors.contact_num && errors.contact_num.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="org_url"
                            label="Organization URL"
                            name="org_url"
                            type="text"
                            variant="standard"
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
                        <Grid container sx={{ mt: 4 }}>
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
                {/* <Copyright sx={{ ...resultTextStyle, mt: 1, p: 1, width: '100%', order: 1, backgroundColor: blue['100'], fontWeight: 400, color: '#000' }} /> */}
            </Grid>
        </ThemeProvider>
    );
}