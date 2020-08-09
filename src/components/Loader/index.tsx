import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loader: React.FC = () => {
  return <Box display="flex" height="100vh" width="100vw" justifyContent="center" alignItems="center">
    <CircularProgress color="primary" size="5rem" />
  </Box>
}

export default Loader
