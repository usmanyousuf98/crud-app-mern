import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({title}) => {
  return (
    <Box padding={5}>
        <Typography variant='h3'>
            {title}
        </Typography>
    </Box>
  )
}

export default Header