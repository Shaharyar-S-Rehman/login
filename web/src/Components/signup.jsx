import axios from 'axios';
import {useFormik} from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import {
  useHistory
} from "react-router-dom";
const dev = 'http://localhost:8000';

const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const validationSchema = yup.object({
  fullName: yup
  .string('Enter String')
  .required('this field is required'),
  email: yup
  .string('Enter string')
  .email('Enter email')
  .required('this field is required'),
  address: yup
  .string('Enter String')
  .required('this field is required'),
  password: yup
  .string('enter string')
  .min(8, 'Password should be of minimum 8 characters')
  .required('password is required'),
  number: yup
  .number('Enter your Number')
  // .min(11, 'Number should be of minimum 11 characters length')
  // .max(20, 'No more then 15')
  .required('Number is required'),

})
function Signup() {
  let history = useHistory();
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues:{
      fullName: '',
      email: '',
      password:'',
      address:'',
      number:''
    },
    onSubmit: onSubmitFunction
  });
  function onSubmitFunction(values){
    axios.post(`${baseURL}/api/v1/signup`,{
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      address: values.address,
      number: values.number

    })
    .then(res=>{
      alert('data Written');
      history.push('/login');
    })
    .catch((err)=>{
      alert('Some thing went wrong please try with different email');
    })
  }
  return (
    <div style={{ margin: "0 20% 0 20%" }}>
            <h1 style={{ textAlign: "center", color: "whitesmoke", textDecoration: "5px solid underline", textDecorationColor: "brown" }}>SignUp</h1>
            <br />
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"

                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}

                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"

                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}

                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Number"
                        variant="outlined"

                        name="number"
                        value={formik.values.number}
                        onChange={formik.handleChange}

                        error={formik.touched.number && Boolean(formik.errors.number)}
                        helperText={formik.touched.number && formik.errors.number}
                    />

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
                    <br />
                    <div>
                        <Button style={{ width: "20%", margin: 'auto' }} variant="contained" color="primary" type="submit">Signup</Button>
                        <Button style={{ width: "20%", marginLeft:"5px" }} onClick={() => { history.push("/login") }} variant="contained" color="primary">I have an account</Button>
          
                    </div>
                </Stack>

            </form>

        </div>
  );
}

export default Signup;
