import axios from 'axios';
import {useFormik} from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import {
    useHistory
} from 'react-router-dom';
const dev = 'http://localhost:8000';

const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const validationSchema = yup.object({
    email: yup
    .string('Enter string')
    .email('Enter email')
    .required('this field is required'),
    password: yup
    .string('enter string')
    .required('password is required')
  })
function Login(){
    let history = useHistory();
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues:{
            email: '',
            password: ''
          },
          onSubmit: onSubmitFunction
    })
    function onSubmitFunction(values){
        axios.post(`${baseURL}/api/v1/login`,{
            email: values.email,
            password: values.password
        })
        .then(res=>{
            if(res.data.email){
                alert('login successfull');
                const email = values.email;
                localStorage.setItem('email', email)
                history.push('/dashboard');
            }
           
        })
        .catch(err=>{
            alert('login unsuccessfull error found');
        })
    }

    return(
        <div style={{ margin: "0 20% 0 20%" }}>
      <br />
      <h1 style={{ textAlign: "center", color: "whitesmoke", textDecoration: "5px solid underline", textDecorationColor: "brown" }}>Login</h1>
      <br />

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Email"
            variant="outlined"

            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}

            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            color="primary"
            id="filled-basic"
            label="Password"
            variant="outlined"
            type="password"

            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}

            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          /> 
          <div>
            <Button style={{ width: "20%",}} variant="contained" color="primary" type="submit">Login</Button>
            <Button style={{ width: "20%", marginLeft:"5px" }} onClick={() => { history.push("/signup") }} variant="contained" color="primary">I have no account</Button>
          </div>
        </Stack>

      </form>

    </div>
    )
}

export default Login;