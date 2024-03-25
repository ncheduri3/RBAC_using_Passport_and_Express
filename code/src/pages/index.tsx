import { Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import norp from '../../public/images/norpmain.png'
import Link from 'next/link';

/**
 * 
 * @returns Home page
 * 
 */
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" p={5} paddingX="10vw">
        <Grid item xs md>
          <Image
            src={norp}
            width="625"
            height="430">
          </Image>
        </Grid>
        <Grid item xs={12} md>
          <Typography variant='h2' color="text.main">About NORP</Typography>
          <Typography variant='body1' color="text.main">
            The Nonprofit Organization Research Panel is a collaboration of computer and social scientists from a variety of schools in an effort to increase the effectiveness of nonprofit organizations
          </Typography>
          <div className={styles.btn_container}>
            <Link href={"/people"} passHref>
              <Button
                variant="contained"
                onClick={(e) => { }}
              >
                See who we are
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={6} justifyContent="center" alignItems="center" p={5} paddingX="10vw">
        <Grid item xs md>
          <Link href="/resources">
            <Card sx={{ minWidth: 275 }}>
              <CardActionArea sx={{padding: "5px"}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="text.main" className={styles.card_title}>
                    Resources
                  </Typography>
                  <Typography variant="body2" color="text.main">
                    Learn more about using NORP through walkthroughs, sample queries on Metabase and more
                  </Typography>
                </CardContent>
              </CardActionArea>

            </Card>
          </Link>
        </Grid>
        <Grid item xs md>
          <Link href="/metabase">
            <Card sx={{ minWidth: 275 }}>
              <CardActionArea sx={{padding: "5px"}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="text.main" className={styles.card_title}>
                    Metabase
                  </Typography>
                  <Typography variant="body2" color="text.main">
                    Query, visualize and analyze public and privately sourced NORP datasets for more insights
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs md>
          <Link href="/contact">
            <Card sx={{ minWidth: 275 }}>
              <CardActionArea sx={{padding: "5px"}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="text.main" className={styles.card_title}>
                    Contact
                  </Typography>
                  <Typography variant="body2" color="text.main">
                    Send the NORP team your questions, feedback, suggestions, or anything else you want to say!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
