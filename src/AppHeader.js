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
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'url("network.png")',
                    // background: gradientBackground,
                    boxShadow: 'none',
                    // filter: 'blur(1px)',
                    animation: '$slideBackground 5s linear infinite',
                    '@keyframes slideBackground': {
                        '0%': {
                            backgroundPosition: '0 0',
                        },
                        '100%': {
                            backgroundPosition: '100% 0', // Adjust as needed
                        },
                    },
                },

            },

        }
    },
});

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#FCAE1E', // Change this to the desired primary color
        },
    }
});

// const useStyles = makeStyles((theme) => ({
//     animatedBackground: {
//         background: 'url("network.png")', // Replace with your background image path
//         backgroundSize: 'cover',
//         animation: '$slideBackground 5s linear infinite', // Animation name, duration, and options
//         /* Other styles for positioning and sizing */
//       },

//       '@keyframes slideBackground': {
//         '0%': {
//           backgroundPosition: '0 0',
//         },
//         '100%': {
//           backgroundPosition: '100% 0', // Adjust as needed
//         },
//       },
//   }));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: '50vh',
    },
}));


export default function AppHeader() {
    // const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
        // Handle the search action here (e.g., make an API request)
        console.log(`Searching for: ${searchText}`);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className='abc'>
                    <StyledToolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 'auto' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
          >
            MUI
          </Typography> */}
                        <IconButton size="large" aria-label="search" color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="display more actions"
                            edge="end"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </StyledToolbar>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <TextField
                            id="margin-normal" margin="normal"
                            placeholder="Search"
                            variant="outlined"

                            value={searchText}
                            sx={{ background: "#fff", width: "60%", m: 0 }}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </ThemeProvider>

                    </Box>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}