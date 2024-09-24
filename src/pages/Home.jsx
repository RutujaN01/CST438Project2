import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export const Home = () => {
  return (
    <>
      {/* Box is a layout, we can add things on top (i.e. a Navbar) or below (i.e. a footer) and the content will still be centered */}
      <Box sx={{ p: 2, height: '100vh', display: 'flex' }} alignItems="center" justifyContent="center">
        <Typography textAlign="center" variant="h1">Home</Typography>
      </Box>
    </>
  )
}