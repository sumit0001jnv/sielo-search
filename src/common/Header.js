import MuiAppBar from '@mui/material/AppBar';
import { useTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material';
import { blue, blueGrey, lightBlue, grey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import loginAction from '../store/actions/loginAction';
import uiAction from '../store/actions/uiAction';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import AppContext from '../context/AppContext';
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    background: "#fff",
    color: "#000",
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: '56px',
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header() {
    const theme = useTheme();
    const { contextValue, updateContextValue } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [login, setlogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const toggleDrawerOpen = () => {
        updateContextValue(!contextValue);
    };
    const handleClick = (event, type) => {
        if (type === 'notification-menu') {
            //   setNotificationAnchorEl(event.currentTarget);

        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = (type) => (eventType) => {
        setAnchorEl(null);
        switch (type) {
            //   case "login": {
            //     navigate("/sign-in");
            //     break;
            //   }
            case "logout": {
                navigate("/sign-in");
                localStorage.setItem("sielo_search_app", '{}');
                dispatch(loginAction.logOut());
                dispatch(
                    uiAction.showSnackbar({
                        message: "User logged out successfully",
                        type: "info",
                    })
                );
                break;
            }
            case "profile": {
                navigate("/profile");
                break;
            }
            case "notification": {
                break;
            }
            default: {
                // history.push("/");
            }
        }
    };
    useEffect(() => {
        const storage = localStorage.getItem("sielo_search_app");
        if (storage) {
            const jsonStorage = JSON.parse(storage);
            setlogin(!!jsonStorage.isLoggedIn)
        } else {
            setlogin(false)
        }
    }, [])
    useEffect(() => {
        const storage = localStorage.getItem("sielo_search_app");
        if (storage) {
            const jsonStorage = JSON.parse(storage);
            setUserName(jsonStorage.user_name || '');
        } else {
            setlogin(false)
        }
    }, [localStorage.getItem("sielo_search_app")]);
    const abbreviateWord = (word = "") => {
        let abbrWord = "";
        word
            .split(" ")
            .forEach((w) => (abbrWord = abbrWord + (w[0] || "").toUpperCase()));
        return abbrWord;
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" style={{ zIndex: 1100 }} sx={{ boxShadow: '-1px -20px 0px 0px rgba(0,0,0,0.2), -1px 0px 4px 2px rgba(0,0,0,0.14), 0px -20px 0px 0px rgba(0,0,0,0.12)' }}>
                <StyledToolbar>
                    {isMobile && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawerOpen}
                        sx={{ mr: 1, color: blueGrey[900] }}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <img src="/company-logo.jpeg" width="70" alt="Logo" style={{ marginRight: 'auto' }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                            onClick={(event) => handleClick(event, 'login')}
                        >
                            <Avatar sx={{ bgcolor: blue[500] }}>
                                {abbreviateWord(userName)}
                            </Avatar>
                        </StyledBadge>
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose()}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        {login ? (
                            <>
                                <MenuItem onClick={handleClose("profile")}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={handleClose("login")}>Login</MenuItem>
                            </>
                        )}
                    </Menu>
                </StyledToolbar>

            </AppBar>
        </ThemeProvider>
    )
}
