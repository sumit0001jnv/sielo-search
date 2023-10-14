import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Loader() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: 'lightseagreen' }}>
            <div className="book">
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
            <Typography variant="h4" sx={{ color: '#fff', pl: 1, mt: 3 }}>Loading...</Typography>

        </Box>


    )
}
