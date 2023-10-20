import { styled } from '@mui/material/styles';
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


export default function ResponsiveSearchContainer() {
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
        <Box sx={{ borderRadius: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '0' }}>
            <CssBaseline />
            <form onSubmit={handleSearch}>
                <Box className="search-container" sx={{ width: '100%', flex: 12, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: isMobile ? 'flex-start' : 'center', boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2);', backgroundColor: "#fff", p: 1, rowGap: 1 }}>
                    <OutlinedInput
                        id="search-box" margin="normal"
                        placeholder="Search"
                        autoComplete="off"
                        inputRef={textFieldRef}
                        endAdornment={<InputAdornment position="end"><SearchIcon sx={{ fontSize: 30, color: '#797EF6' }} /></InputAdornment>}
                        variant="outlined"
                        value={searchText}
                        // InputProps={{
                        //     style: inputStyle,
                        // }}
                        maxRows={5}
                        multiline
                        onClick={handleOpenMenu}
                        sx={{ ...resultTextStyle, flex: isMobile ? 12 : 8, background: "#fff", borderRadius: '8px', width: isMobile ? "100%" : "80%", my: 0, mr: isMobile ? 0 : 1 }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearchKeyPress}
                    />
                    <Box sx={{ zIndex: 2, my: 0, display: 'flex', flex: isMobile ? 12 : 4, width: '100%', justifyContent: 'start', alignItems: 'center' }}>

                        <Autocomplete
                            id="three-options-autocomplete"
                            options={options}
                            getOptionLabel={(option) => option.label}
                            value={selectedValue}
                            onChange={handleSelectChange}
                            sx={{
                                width: isMobile ? '100%' : '300px', // Adjust the width as needed
                                '& .MuiOutlinedInput-input': {
                                    ...resultTextStyle,
                                    padding: '10px', // Adjust the padding as needed
                                },
                                borderRadius: '8px',
                                background: '#fff', mr: 1
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="autocomplete-text-field"
                                    placeholder="Select a database type"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearch}
                                sx={{ borderRadius: '8px', p: 2, px: 3 }}
                                disableElevation
                            >
                                Search
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>
            </form>
            {(isLoading) && <Loader></Loader>}
            {!isLoading && !queryResData && <>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 240px)' }}>
                    <Grid container sx={{ width: '100%', display: 'flex', rowGap: "8px", p: 2 }}>
                        <Grid item xs="12" sm="4" md="4">
                            <Box onClick={() => searchCard('Summarize the data')} sx={{ ...sampleCardClass }}>
                                <Box sx={{ fontSize: '1.25rem', pb: 2, }}>Summarize the data</Box>
                                <Box sx={{ opacity: 0.5 }}>To get short summary </Box>
                            </Box>
                        </Grid>
                        <Grid item xs="12" sm="4" md="4">
                            <Box onClick={() => searchCard('List all the medicines')} sx={{ ...sampleCardClass }}>
                                <Box sx={{ fontSize: '1.25rem', pb: 2 }}>List all the medicines</Box>
                                <Box sx={{ opacity: 0.5 }}>Query to listout all the medicines</Box>
                            </Box>
                        </Grid>
                        <Grid item xs="12" sm="4" md="4">
                            <Box onClick={() => searchCard('Find all the proteins')} sx={{ ...sampleCardClass }}>
                                <Box sx={{ fontSize: '1.25rem', pb: 2 }}>Find all the proteins</Box>
                                <Box sx={{ opacity: 0.5 }}>Query to listout all the proteins</Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <img onClick={focusTextField} className='image-container-left' src="/dbms.png" width="220" height="201" alt='img'></img>
                    <Typography onClick={focusTextField} sx={{ color: '#000', opacity: 0.5, fontSize: '20px' }}>Try Search on top</Typography>
                </Box>
            </>}
            {!isLoading && queryResData &&
                <>
                    <Card sx={{ mt: 1, background: lightBlue['100'], boxShadow: 'unset' }}>
                        <CardActions>
                            <Button size="large" onClick={() => handleButtonClick(false)} sx={{ ...tabBtnStyle(false) }}>Response</Button>
                            <Button size="large" onClick={() => handleButtonClick(true)} sx={{ ...tabBtnStyle(true) }}>Source</Button>
                        </CardActions>
                        {!isSourceSelected && <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ ...resultTextStyle, fontSize: '1.25rem' }}>
                                Results:
                            </Typography>
                            <Typography variant="h6" sx={{ ...resultTextStyle, fontWeight: 400, color: blue['A400'], }}>
                                Search Result ({queryResData.response_id})
                            </Typography>
                            <Typography variant="h6" sx={{ ...resultTextStyle }}>
                                {queryResData.query_response}
                            </Typography>
                        </CardContent>}
                        {isSourceSelected && <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ ...resultTextStyle, fontSize: '1.25rem' }}>
                                References:
                            </Typography>
                            <Typography variant="h6" sx={{ ...resultTextStyle, fontWeight: 400, color: blue['A400'] }}>
                                Data sources ({queryResData.response_id})
                            </Typography>
                            <Typography variant="h6" sx={{ ...resultTextStyle }} >
                                <div dangerouslySetInnerHTML={{ __html: queryResData.source_data }}></div>
                            </Typography>
                        </CardContent>}

                    </Card>
                </>
            }
        </Box>

    );
}