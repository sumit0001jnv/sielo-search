import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { blue, blueGrey } from '@mui/material/colors';

export default function Loader() {
    const resultTextStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5rem',
        fontFamily: 'Google Sans, Helvetica Neue, sans - serif',
        letterSpacing: 'normal',
        whiteSpace: 'pre - wrap',
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <div className="book" >
                <div className="inner">
                    <div className="left"></div>
                    <div className="middle"></div>
                    <div className="right"></div>
                </div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <Typography variant="h6" sx={{ ...resultTextStyle, color: blueGrey[800], pl: 1 }}>Searching...</Typography>

        </Box>


    )
}
