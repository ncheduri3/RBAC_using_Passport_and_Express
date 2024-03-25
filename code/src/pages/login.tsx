import type { NextPage } from 'next';
import styles from '../styles/Login.module.css';
import { CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Container,
  Divider,
  IconButton,
  Button,
  Card,
  Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * 
 * @returns Login page
 * 
 */

const loginContent = (
  <>
  <CardContent>
    <Container>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel>Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type={""}
            value={""}
            onChange={() => {}}
            label="Username"
          />
      </FormControl>
    </Container>

    <Container sx={{paddingBottom:"5%"}}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={""}
            value={""}
            onChange={() => {}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {}}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  {true ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </Container>
    <Container sx={{direction:"column", alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column", marginBottom:"10%"}}>
      <Button variant="outlined" size="medium"> Login </Button>
    </Container>
    <Divider />

    <Container sx={{direction:"column", alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column", paddingTop:"5%"}}>
      <Button variant="outlined" size="large"> Login with Google </Button>
    </Container>
  </CardContent>
  </>
)
const Login: NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
      <Box sx={{ display: "flex", justifyContent: "center", alignSelf: "center", height: "100%"}}>
        <Card variant="outlined" sx={{ marginTop: "7%", marginBottom: "7%"}}>{loginContent}</Card>
      </Box>
    </div>
    </div>
  )
}

export default Login