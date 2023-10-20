import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";

// import AppBar from '@mui/material/AppBar';
///////////
import MuiAppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
////////
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';

import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { blue, blueGrey, lightBlue, grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Loader from './Loader';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import loginAction from './store/actions/loginAction';
import uiAction from './store/actions/uiAction';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DatasetIcon from '@mui/icons-material/Dataset';
import KeyIcon from '@mui/icons-material/Key';
import { useEffect } from 'react';

const lightColors = [
    '#FFDB58',
    '#FFA07A',
    '#98FB98',
    '#FFC0CB',
    '#87CEEB',
    '#FFD700',
    '#FF69B4',
    '#98FB98',
    '#FFA500',
    '#FF6347',
];

const theme = createTheme({
    palette: {
        primary: {
            main: '#24005E', // Change this to the desired primary color
        },
    }
});

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: blue[500], // Change this to the desired primary color
        },
    }
});


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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, isMobile }) => ({
    flexGrow: 1,
    backgroundColor: blue[50],
    minHeight: '100vh',
    padding: theme.spacing(isMobile ? 1 : 2),
    paddingTop: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${isMobile ? 0 : drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Layout() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawerOpen = () => {
        setOpenDrawer(!openDrawer);
    };
    // const classes = useStyles();
    const textFieldRef = useRef(null);
    const [login, setlogin] = useState(true);
    const options = [{ label: 'Knowledge Graph', value: 'knowledge-graph' }, { label: 'Table Data', value: 'table-data' }, { label: 'Snowflake Data', value: 'snowflake-data' }];

    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState({ label: 'Knowledge Graph', value: 'knowledge-graph' });
    const [queryResData, setQueryResData] = useState(null);
    const [isSourceSelected, setisSourceSelected] = useState(false);
    const focusTextField = () => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    };
    const handleButtonClick = (resSelected) => {
        setisSourceSelected(resSelected)
    }
    const handleSearch = async () => {
        // Handle the search action here (e.g., make an API request)
        setIsLoading(true);
        console.log(`Searching for: ${searchText}`);
        setQueryResData(null);

        if (selectedValue && searchText) {
            const headers = {
                'Content-Type': 'application/json', // Indicate that you're sending JSON data
            };
            const body = JSON.stringify({ "data_model": selectedValue.value, "text_query": searchText, "auth_token": "06c404da-1a6d-4770-884e-6367c9d2a8a6" });
            const response = await fetch(`https://search-dev.sieloapp.com/api/search`, { method: 'POST', headers, body });
            const data = await response.json();
            setIsLoading(false);
            console.log(data);
            setQueryResData(data);

        }

    };

    const searchCard = (text) => {
        setSearchText(text);
        setTimeout(() => {
            handleSearch();
        })

    }

    const handleSelectChange = (event, newValue) => {
        setSelectedValue(newValue);
        // You can perform any additional actions here when an option is selected
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {

        // setAnchorEl(event.currentTarget);
    };


    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const open = Boolean(anchorEl);

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

    const tabBtnStyle = (isSource) => {
        if ((isSource && isSourceSelected) || (!isSource && !isSourceSelected)) {
            return { textDecoration: 'underline', fontSize: '14px', color: blue['A700'], 'text-underline-offset': '4px', fontWeight: 600 };
        } else {
            return { textDecoration: '', fontSize: '14px', color: blueGrey['600'], 'text-underline-offset': '4px', fontWeight: 600 };
        }

    }

    const resultTextStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5rem',
        fontFamily: 'Google Sans, Helvetica Neue, sans - serif',
        letterSpacing: 'normal',
        whiteSpace: 'pre - wrap',
    }



    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const sampleCardClass = { backgroundColor: lightBlue[100], display: 'flex', flexDirection: 'column', p: 2, minHeight: '120px', borderRadius: '8px', mr: 2, '&:hover': { background: blue[200], fontWeight: '500', cursor: 'pointer' } };
    useEffect(() => {
        const storage = localStorage.getItem('sielo_search_app');
        if (storage) {
            const storageJson = JSON.parse(storage);
            if (!storageJson.isLoggedIn) {
                navigate("/sign-in");
            }
        }

    }, [])

    const menuObject = [{ name: 'Database', path: 'databases', icon: DatasetIcon }, { name: 'Credentials', path: 'credentials', icon: KeyIcon }, { name: 'Search', path: 'search', icon: ContentPasteSearchIcon }];
    const selectMenu = (path) => {
        navigate(path);
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: isMobile ? '90vw' : drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '90vw' : drawerWidth,
                        marginTop: '73px',
                        boxSizing: 'border-box',
                    },
                }}
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                open={openDrawer}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuObject.map((obj, index) => (
                        <ListItem key={obj.name} disablePadding>
                            <ListItemButton onClick={() => selectMenu(obj.path)}>
                                <ListItemIcon>
                                    {<obj.icon />}
                                </ListItemIcon>
                                <ListItemText primary={obj.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={openDrawer} isMobile={isMobile}>
                <DrawerHeader>
                </DrawerHeader>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    {!isMobile && !openDrawer && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawerOpen}
                        sx={{ mr: 1, color: blueGrey[900] }}
                    >
                        <MenuIcon sx={{ fontSize: 30 }} />
                    </IconButton>}
                    <Outlet />
                </Box>


            </Main>
        </Box>
    );
}