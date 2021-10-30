import * as React from 'react';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import axios from 'axios';
// import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import * as yup from 'yup';
const dev = 'http://localhost:8000';

const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
function Dashboard() {
    const [Data, setData] = React.useState([]);
    const [Posts, setPosts] = React.useState([]);
    const [submit, setSubmit] = React.useState(false);
    React.useEffect(() => {
        const Email = localStorage.getItem('email')
        console.log(Email);
        axios.post(`${baseURL}/api/v1/profile`, {
            email: Email
        })
        .then((res) => {
                let data = res.data
                setData(data);
                console.log(Data);
        })
        .catch((err) => {
                console.log(err.message);
        })
        return () => {
            console.log('clean up')
        }
    }, [])
    React.useEffect(()=>{
        axios.get(`${baseURL}/api/v1/getpost`)
        .then((res)=>{
            setPosts(res.data);
            console.log(Posts);
        })
    },[submit])
    const validationSchema = yup.object({
        post: yup
            .string('Enter string')
            .required('this field is required')
    })
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            post: ''
        },
        onSubmit: (values) => {
            axios.post(`${baseURL}/api/v1/post`,{
                email: localStorage.getItem('email'),
                post: values.post
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err.message);
            })
        }
    })
    const useStyles = makeStyles((theme) => ({
        root: {
          "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(32),
            height: theme.spacing(16)
          }
        },
        yellowPaper: {
          backgroundColor: yellow[300]
        },
        customBorder: {
          border: `3px solid ${yellow[200]}`
        },
        customBorderRadius: {
          borderRadius: 25
        }
      }));
    const classes = useStyles();
    return (
        <div className="dashboard">
            <Box>
                <h1>Dashboard</h1>
                <h3> Profile Info </h3>
                {
                    Data.map(eachData => {
                        return (
                            <div>
                                <h5>{`Full Name: ${eachData.fullName}`}</h5>
                                <h5>{`Email: ${eachData.email}`}</h5>
                                <h5>{`Address: ${eachData.address}`}</h5>
                            </div>
                        )
                    })
                }

            </Box>
           
        </div>
    );
}

export default Dashboard;