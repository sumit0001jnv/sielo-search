import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';

import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import { makeStyles } from '@mui/styles';

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
        minHeight: '72px',
    },
}));


export default function SearchContainer() {
    // const classes = useStyles();
    const inputStyle = {
        fontSize: '18px', // Adjust the font size as needed
        padding: '10px', // Adjust the padding as needed
        width: '100%', // Adjust the width as needed
        borderRadius: '16px'
    };

    const options = [{ label: 'Knowledge Graph', value: 'knowledge-graph' }, { label: 'Table Data', value: 'table-data' }, { label: 'Snowflake Data', value: 'snowflake-data' }];

    const [searchText, setSearchText] = useState('');
    const [leftPanelOpen, setLeftPanelOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [queryResData, setQueryResData] = useState(null);
    const [isSourceSelected, setisSourceSelected] = useState(false);

    const handleButtonClick = (resSelected) => {
        setisSourceSelected(resSelected)
    }
    const handleSearch = async () => {
        // Handle the search action here (e.g., make an API request)
        setIsSearching(true);
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
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const toggleLeftPanel = () => {
        setLeftPanelOpen(!leftPanelOpen);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" sx={{ boxShadow: '-1px -20px 0px 0px rgba(0,0,0,0.2), -1px 0px 4px 2px rgba(0,0,0,0.14), 0px -20px 0px 0px rgba(0,0,0,0.12)' }}>
                    <StyledToolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleLeftPanel}
                        >
                            <MenuIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <Typography variant="h4" sx={{
                            textAlign: "start",
                            background: '-webkit-linear-gradient(45deg, #000 30%, #42aaee 90%)',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent', mr: 'auto',
                            'text-shadow': '3px 4px 7px rgba(81,67,21,0.8);'
                        }}>Sielo Search</Typography>
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>SK</Avatar>
                    </StyledToolbar>

                </AppBar>
            </ThemeProvider>

            <Box sx={{ display: 'flex', justifyContent: 'center', m: 2, p: 0 }}>
                <Box sx={{ flex: leftPanelOpen ? 3 : 0, display: leftPanelOpen ? 'flex' : 'none', justifyContent: 'center', pr: 2 }}>
                    <Box sx={{ width: '100%', border: '1px solid #ccc' }}></Box>
                </Box>

                <Box sx={{ width: '100%', borderRadius: 2, p: isSearching ? 0 : 2, flex: leftPanelOpen ? 9 : 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box className="search-container" sx={{ width: '100%', borderRadius: 2, p: isSearching ? 0 : 2, flex: 12, display: 'flex', flexDirection: isSearching ? 'row' : 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {!isSearching && <Typography variant="h2" sx={{
                            textAlign: "center",
                            color: '#fff',
                            fontFamily: 'cursive',
                            fontWeight: '200 !important',
                            'text-shadow': '3px 4px 7px rgba(81,67,21,0.8);',
                            zIndex: 2
                        }}>Welcome  <br></br> to <br></br> Sielo Search</Typography>}
                        <TextField
                            id="margin-normal" margin="normal"
                            placeholder="Search"
                            variant="outlined"
                            value={searchText}
                            InputProps={{
                                style: inputStyle,
                            }}
                            maxRows={5}
                            onClick={handleOpenMenu}
                            sx={{ zIndex: 2, flex: isSearching ? '8' : '12', background: "#fff", borderRadius: '16px', width: "80%", my: 2, mx: 2 }}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Box sx={{ zIndex: 2, my: isSearching ? 0 : 2, p: 0, display: 'flex', flex: isSearching ? '4' : '12', width: '100%', justifyContent: isSearching ? 'start' : 'center', alignItems: 'center',px:2 }}>

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
                                >
                                    Search
                                </Button>
                            </ThemeProvider>
                        </Box>
                        {!isSearching && <img className='image-container-left' src="/dbms.png" width="220" height="201" alt='img'></img>}
                        {!isSearching && <img className='image-container-right' src="/dbms.png" width="300" height="271" alt='img'></img>}
                    </Box>
                    {isSearching && isLoading && <Box sx={{ width: '100%', p: 2 }}>
                        <Skeleton variant="rectangular" animation="pulse" sx={{ mb: 2, width: '100%', background: '#E1EADD', borderRadius: '8px' }} height={200} />
                        {/* <Skeleton variant="rectangular" animation="pulse" sx={{ ml: 5, mb: 2, width: '80%', background: '#E7DDEA', borderRadius: '8px' }} height={200} /> */}
                        {/* <Skeleton variant="rectangular" animation="pulse" sx={{ ml: 5, mb: 2, width: '80%', background: '#EADDDF', borderRadius: '8px' }} height={200} /> */}
                    </Box>}
                    {!isLoading && queryResData &&
                        <>
                            {/* <Box>{queryResData.query_response}</Box> */}
                            <Card sx={{ mt: 4 }}>
                                <CardActions>
                                    <Button variant={!isSourceSelected ? 'contained' : 'outlined'} size="large" onClick={() => handleButtonClick(false)} sx={{ textTransform: 'unset' }}>Response</Button>
                                    <Button variant={isSourceSelected ? 'contained' : 'outlined'} size="large" onClick={() => handleButtonClick(true)} sx={{ textTransform: 'unset' }}>Source</Button>
                                </CardActions>
                                {!isSourceSelected && <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Results:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#000', opacity: 0.8 }}>
                                        Search Result ({queryResData.response_id})
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 300, color: '#000', opacity: 0.5 }}>
                                        {queryResData.query_response}
                                    </Typography>
                                </CardContent>}
                                {isSourceSelected && <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                       References:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#000', opacity: 0.8 }}>
                                      Data sources ({queryResData.response_id})
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 300, color: '#000', opacity: 0.5 }} >
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