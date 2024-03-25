import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styles from '../styles/Contact.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardContent, Typography } from '@mui/material';
import { Container } from '@mui/system';

/**
 * 
 * @returns Contact page
 * 
 */
const card = (
  <>
  <CardContent sx={{ }}>
    <Typography variant='h4'>
        STAY UPDATED
    </Typography>
    <Typography variant='h6' sx={{color: "#756F6F"}}>
        Stay in touch with us and find out what you're looking for
    </Typography>
    
    <Container disableGutters={true} sx={{padding: "5% 0 5% 0"}}> 
     <Container sx={{display: "flex", justifyContent: "space-between", paddingLeft:"0%"}}>
        <TextField sx={{"& .MuiInputBase-root": {  "&:after": { borderBottom: "2px solid #F8B224"}}, "& .MuiFormLabel-root.MuiInputLabel-root": {"&: focus": {color: "#F8B224"}}  }} id="standard-required" label="FIRST NAME" variant="standard" defaultValue="John"/>
        <TextField sx={{"& .MuiInputBase-root": {  "&:after": { borderBottom: "2px solid #F8B224"}}, "& .MuiFormLabel-root.MuiInputLabel-root": {"&: focus": {color: "#F8B224"}}  }} id="standard-required" label="LAST NAME" variant="standard" defaultValue="Doe"/>
      </Container>
      <Container sx={{display: "flex", justifyContent: "space-between", padding:"2%"}}>
      <TextField sx={{"& .MuiInputBase-root": {  "&:after": { borderBottom: "2px solid #F8B224"}}, "& .MuiFormLabel-root.MuiInputLabel-root": {"&: focus": {color: "#F8B224"}}  }} id="standard-required" label="EMAIL" variant="standard" defaultValue="user@norp.live"/>
      <TextField sx={{"& .MuiInputBase-root": {  "&:after": { borderBottom: "2px solid #F8B224"}}, "& .MuiFormLabel-root.MuiInputLabel-root": {"&: focus": {color: "#F8B224"}}  }} id="standard-required" label="PHONE NUMBER" variant="standard" defaultValue="123-456-7890"/>
      </Container>
      <Container sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding:"2%"}}>
        <TextField sx={{"& .MuiInputBase-root": {  "&:after": { borderBottom: "2px solid #F8B224"}}, "& .MuiFormLabel-root.MuiInputLabel-root": {"&: focus": {color: "#F8B224"}}, paddingBottom: "5%" }} id="standard-required" fullWidth={true} label="WRITE YOUR MESSAGE HERE" variant="standard" defaultValue="123-456-7890"/>
        <Button sx={{backgroundColor: "#F8B224", padding: "2% 5% 2% 5%", borderRadius: "20px"}} variant="contained">Submit</Button>
      </Container> 
    </Container>


  </CardContent>
  </>
)


const Contact: NextPage = () => {
  return (
    <div className={styles.container}>
      <Box sx={{ display: "flex", justifyContent: "center", alignSelf: "center", height: "100%"}}>
        <Card variant="outlined" sx={{ marginTop: "7.5%", marginBottom: "7.5%", padding: "2% 3% 0% 3%", paddingBottom: "0%"}}>{card}</Card>
      </Box>
    </div>
  )
}

export default Contact