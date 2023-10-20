// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { blue, blueGrey, lightBlue, grey } from '@mui/material/colors';

import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DatasetIcon from '@mui/icons-material/Dataset';
import KeyIcon from '@mui/icons-material/Key';
import { useEffect } from 'react';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: blue[500], // Change this to the desired primary color
        },
    }
});

export default function ResponsiveSearchContainer() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    // const classes = useStyles();
    const textFieldRef = useRef(null);
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