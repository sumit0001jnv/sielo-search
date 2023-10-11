import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import MoreIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';

import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";

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

const gradientBackground = `linear-gradient(to right, ${lightColors.join(', ')})`;

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
            main: '#FCAE1E', // Change this to the desired primary color
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


export default function SearchContainer() {
    // const classes = useStyles();
    const textFieldRef = useRef(null);
    const [login, setlogin] = useState(true);
    const options = [{ label: 'Knowledge Graph', value: 'knowledge-graph' }, { label: 'Table Data', value: 'table-data' }, { label: 'Snowflake Data', value: 'snowflake-data' }];

    const [searchText, setSearchText] = useState('');
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState({ label: 'Knowledge Graph', value: 'knowledge-graph' });
    const [queryResData, setQueryResData] = useState(null);
    const [isSourceSelected, setisSourceSelected] = useState(false);
    const inputStyle = {
        fontSize: '20px', // Adjust the font size as needed
        padding: '0px', // Adjust the padding as needed
        width: '100%', // Adjust the width as needed
        borderRadius: '8px'
    };
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

    const handleSelectChange = (event, newValue) => {
        setSelectedValue(newValue);
        // You can perform any additional actions here when an option is selected
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {

        // setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const open = Boolean(anchorEl);
    const toggleLeftPanel = () => {
        setLeftPanelOpen(!leftPanelOpen);
    }

    const handleClick = (event, type) => {
        if (type === 'notification-menu') {
            //   setNotificationAnchorEl(event.currentTarget);

        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = (type) => (eventType) => {
        setAnchorEl(null);
        // setNotificationAnchorEl(null);
        // switch (type) {
        //   case "login": {
        //     history.push("/sign-in");
        //     break;
        //   }
        //   case "logout": {
        //     history.push("/");
        //     setlogin(false);
        //     setUserName("");
        //     setUserCategory("");
        //     localStorage.removeItem("pdf_parser_app");
        //     dispatch(loginAction.logOut());
        //     dispatch(
        //       uiAction.showSnackbar({
        //         message: "User logged out successfully",
        //         type: "info",
        //       })
        //     );
        //     break;
        //   }
        //   case "profile": {
        //     history.push("/profile");
        //     break;
        //   }
        //   case "notification": {
        //     break;
        //   }
        //   // case 'register': {
        //   //   history.push("/sign-up");
        //   //   break;
        //   // }
        //   default: {
        //     // history.push("/");
        //   }
        // }
    };

    const tabBtnStyle = (isSource) => {
        if ((isSource && isSourceSelected) || (!isSource && !isSourceSelected)) {
            return { textDecoration: 'underline', fontSize: '14px', color: '#FE5000', opacity: '', 'text-underline-offset': '4px', fontWeight: 600 };
        } else {
            return { textDecoration: '', fontSize: '14px', color: '#000', opacity: '0.4', 'text-underline-offset': '4px', fontWeight: 600 };
        }

    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" sx={{ boxShadow: '-1px -20px 0px 0px rgba(0,0,0,0.2), -1px 0px 4px 2px rgba(0,0,0,0.14), 0px -20px 0px 0px rgba(0,0,0,0.12)' }}>
                    <StyledToolbar>

                        {/* <Typography variant="h4" sx={{
                            textAlign: "start",
                            background: '-webkit-linear-gradient(45deg, #000 30%, #42aaee 90%)',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent', mr: 'auto',
                            'text-shadow': '3px 4px 7px rgba(81,67,21,0.8);'
                        }}>Sielo Search</Typography> */}
                        <img src="/company-logo.jpeg" width="70" alt="Logo" style={{ marginRight: 'auto' }} />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                                onClick={(event) => handleClick(event, 'login')}
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                    SK
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

            <Box sx={{ display: 'flex', my: 2, mx: 1, p: 0, alignItems: 'start' }}>
                <Box sx={{ flex: leftPanelOpen ? 3 : 0, display: leftPanelOpen ? 'flex' : '', justifyContent: 'center', pr: leftPanelOpen ? 1 : 0 }}>
                    <Box sx={{ width: leftPanelOpen ? '100%' : '', minHeight: leftPanelOpen ? 'calc(100vh - 102px)' : '', boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2);', backgroundColor: "#fff", borderRadius: leftPanelOpen ? 1 : 0 }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleLeftPanel}
                            style={{ padding: leftPanelOpen ? '8px' : '', marginLeft: '4px' }}

                        >
                            <MenuIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ width: '100%', borderRadius: 2, flex: leftPanelOpen ? 9 : 12, display: 'flex', flexDirection: 'column', padding: '0' }}>
                    <form onSubmit={handleSearch}>
                        <Box className="search-container" sx={{ width: '100%', flex: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2);', backgroundColor: "#fff" }}>
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
                                onClick={handleOpenMenu}
                                sx={{ zIndex: 2, flex: '8', fontSize: '20px', background: "#fff", borderRadius: '8px', width: "80%", my: 0, ml: 2 }}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleSearchKeyPress}
                            />
                            <Box sx={{ zIndex: 2, my: 0, p: 2, display: 'flex', flex: '4', width: '100%', justifyContent: 'start', alignItems: 'center', }}>

                                <Autocomplete
                                    id="three-options-autocomplete"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    value={selectedValue}
                                    onChange={handleSelectChange}
                                    sx={{
                                        width: '300px', // Adjust the width as needed
                                        '& .MuiOutlinedInput-input': {
                                            fontSize: '18px', // Adjust the font size as needed
                                            padding: '10px', // Adjust the padding as needed
                                        },
                                        borderRadius: '8px',
                                        background: '#fff', mr: 2
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
                                        {/* <SendIcon sx={{mr:1}}></SendIcon> */}
                                        Search
                                    </Button>
                                </ThemeProvider>
                            </Box>
                            {/* {!isSearching && <img className='image-container-left' src="/dbms.png" width="220" height="201" alt='img'></img>}
                        {!isSearching && <img className='image-container-right' src="/dbms.png" width="300" height="271" alt='img'></img>} */}
                        </Box>
                    </form>
                    {(isLoading) && <Box sx={{ width: '100%', p: 2, px: 0 }}>
                        <Skeleton variant="rectangular" animation="pulse" sx={{ mb: 2, width: '100%', background: '#DBF3FA', opacity: 0.6, borderRadius: '8px' }} height={200} />
                        {/* <Skeleton variant="rectangular" animation="pulse" sx={{ ml: 5, mb: 2, width: '80%', background: '#E7DDEA', borderRadius: '8px' }} height={200} /> */}
                        {/* <Skeleton variant="rectangular" animation="pulse" sx={{ ml: 5, mb: 2, width: '80%', background: '#EADDDF', borderRadius: '8px' }} height={200} /> */}
                    </Box>}
                    {!isLoading && !queryResData && <>
                        <Box  sx={{ width: '100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'calc(100vh - 240px)' }}>
                            <img onClick={focusTextField} className='image-container-left' src="/dbms.png" width="220" height="201" alt='img'></img>
                            <Typography onClick={focusTextField} sx={{color:'#000',opacity:0.5,fontSize:'20px'}}>Try Search on top</Typography>
                        </Box>
                    </>}
                    {!isLoading && queryResData &&
                        <>
                            {/* <Box>{queryResData.query_response}</Box> */}
                            <Card sx={{ mt: 1, background: '#FED8B1', boxShadow: 'unset' }}>
                                <CardActions>
                                    <Button size="large" onClick={() => handleButtonClick(false)} sx={{ ...tabBtnStyle(false) }}>Response</Button>
                                    <Button size="large" onClick={() => handleButtonClick(true)} sx={{ ...tabBtnStyle(true) }}>Source</Button>
                                </CardActions>
                                {!isSourceSelected && <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Results:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#1565b3', }}>
                                        Search Result ({queryResData.response_id})
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 300, color: '#000', opacity: 0.9, fontSize: '1.35rem' }}>
                                        {queryResData.query_response}
                                    </Typography>
                                </CardContent>}
                                {isSourceSelected && <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        References:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#1565b3' }}>
                                        Data sources ({queryResData.response_id})
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 300, color: '#000', opacity: 0.9, fontSize: '1.35rem' }} >
                                        {/* {queryResData.source_data} */}
                                        <div dangerouslySetInnerHTML={{ __html: queryResData.source_data }}></div>
                                    </Typography>
                                </CardContent>}

                            </Card>
                        </>
                    }
                </Box>
            </Box>

        </Box>
    );
}