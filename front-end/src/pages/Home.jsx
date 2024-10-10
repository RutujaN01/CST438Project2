import Typography from '@mui/material/Typography'
import { Box, useTheme } from '@mui/material'

export const Home = () => {
  // To use theme colors, use the "useTheme()" hook
  // See the "Color: ..." Typography below to see an example of how to use it
  const theme = useTheme();
  return (
    <>
      {/* Box is a layout, we can add things on top (i.e. a Navbar) or below (i.e. a footer) and the content will still be centered */}
      { /* Note: You can nest Box (or other) layouts to get more complex layouts, similar to <View> components in React-Native */}
      <Box sx={{ p: 2, height: '100vh', display: 'flex', flexDirection: 'column' }} alignItems="center" justifyContent="center">
        <Typography textAlign="center" variant="h3" color="primary">Home</Typography>
        <Typography textAlign="center" variant="subtitle1" color="secondary">Color (Secondary): {theme.palette.secondary.main}</Typography>
      </Box>
    </>
  )
}