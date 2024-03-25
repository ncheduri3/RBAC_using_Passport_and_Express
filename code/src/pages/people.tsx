import { Grid, Card, CardActionArea, CardContent, Typography, CardMedia, Button, CardActions, IconButton } from '@mui/material';
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import styles from '../styles/People.module.css';


/**
 * 
 * @returns People page
 * 
 */
function People({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const peopleData = data.norp_people.map((value,i) => {
        return (
            <Grid item key={i}>
                {/* <Link href="/resources"> */}
                <Card sx={{ width: "20rem" }}>
                    <CardMedia
                        component="img"
                        alt="NORP contributor"
                        height="350"
                        image={value.profile_pic_url}
                    />
                    <CardContent>
                        <Typography fontWeight="bold" variant="h5" component="div" color="text.main" >
                            {value.first_name + " " + value.last_name}
                        </Typography>
                        <Typography variant="overline" color="text.main" fontSize={14}>
                            {value.project_title}
                        </Typography>
                        <Typography variant="body2" color="text.main">
                            {value.university}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href='mailto:calton.pu@cc.gatech.edu'>Email</Button>
                        {/* <Button size="small">Read more</Button> */}
                    </CardActions>
                </Card>
                {/* </Link> */}
            </Grid>
        );
    });

    return (
        <div className={styles.container}>
            <Typography variant="h2" align='center' color="primary.main" margin="0 2%">Meet the team</Typography>
            <Grid container direction="row" spacing={10} justifyContent="center" alignItems="center" p={5} paddingX="10vw" className={styles.card_container}>
                {peopleData}
            </Grid>
        </div>
    )
}

type Person = {
    first_name: string,
    last_name: string,
    project_title: string,
    job_type: string,
    university: string,
    profile_pic_url: string,
}

type PeopleData = {
    norp_people: Person[]
}


export const getServerSideProps: GetServerSideProps<{ data: PeopleData }> = async () => {
    // Fetch data from external API
    const res = await fetch(`http://localhost:4000/api/people`)
    console.log(res)
    console.log("hi")
    // const data = await res.json()
    const data = {
        norp_people: [
            {
                first_name: "Calton",
                last_name: "Pu",
                project_title: "Director",
                job_type: "Professor, John P. Imlay, Jr. Chair",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/CaltonPu.jpg",
            }, {
                first_name: "Lewis",
                last_name: "Faulk",
                project_title: "Research Partner",
                job_type: "Associate Professor",
                university: "American University",
                profile_pic_url: "/images/LewisFaulk.png",
            }, {
                first_name: "Mirae",
                last_name: "Kim",
                project_title: "Research Partner",
                job_type: "Associate Professor",
                university: "George Mason University",
                profile_pic_url: "/images/MiraeKim.jpg",
            }, {
                first_name: "Terisa",
                last_name: "Derrick-Mills",
                project_title: "Research Partner",
                job_type: "Principal Research Associate",
                university: "Urban Institute",
                profile_pic_url: "/images/TeresaDerrickMills.jpg",
            }, {
                first_name: "Rodrigo",
                last_name: "A. Lima",
                project_title: "Research Member",
                job_type: "Grad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            }, {
                first_name: "Pramod",
                last_name: "Chunduri",
                project_title: "Research Member",
                job_type: "Grad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            }, {
                first_name: "Abhijit",
                last_name: "Suprem",
                project_title: "Research Member",
                job_type: "Grad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            }, {
                first_name: "Bhanu",
                last_name: "Garg",
                project_title: "Research Member",
                job_type: "Grad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            }, {
                first_name: "Vadini",
                last_name: "Agrawal",
                project_title: "Project Contributor",
                job_type: "Grad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            }, {
                first_name: "Jackson",
                last_name: "Hall",
                project_title: "Project Contributor",
                job_type: "Undergrad Student",
                university: "Georgia Institute of Technology",
                profile_pic_url: "/images/person.jpeg",
            },
        ]
    };
    // Pass data to the page via props
    return { props: { data } }
}

export default People