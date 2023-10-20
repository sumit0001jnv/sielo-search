import { styled } from '@mui/material/styles';
import { Outlet, useLocation } from "react-router-dom";

// import AppBar from '@mui/material/AppBar';
///////////
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
import { useRef, useState, useContext } from 'react';
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
import AppContext from './context/AppContext';
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
    let location = useLocation();
    const { contextValue, updateContextValue } = useContext(AppContext);
    // const [contextValue, updateContextValue] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    // const [openDrawer, setOpenDrawer] = useState(false);
    // useEffect(() => {
    //     // setOpenDrawer(contextValue);
    //     updateContextValue(contextValue);
    // }, [contextValue]);
    const toggleDrawerOpen = () => {
        // setOpenDrawer(!openDrawer);
        updateContextValue(!contextValue);
    };

    const handleDrawerClose = () => {
        // setOpenDrawer(false);
        updateContextValue(false);
    };

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
                open={contextValue}
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
                            <ListItemButton onClick={() => selectMenu(obj.path)} selected={'/layout/' + obj.path === location.pathname}>
                                <ListItemIcon>
                                    {<obj.icon />}
                                </ListItemIcon>
                                <ListItemText primary={obj.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={contextValue} isMobile={isMobile}>
                <DrawerHeader>
                </DrawerHeader>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    {!isMobile && !contextValue && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawerOpen}
                        sx={{ mr: 1, color: blueGrey[900] }}
                    >
                        <MenuIcon sx={{ fontSize: 30 }} />
                    </IconButton>}
                    <Container>
                        <Outlet />
                    </Container>
                </Box>
            </Main>
        </Box>
    );
}