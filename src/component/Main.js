import {
  Form,
  Input,
  Space,
  Checkbox,
  Table,
  Popconfirm,
  Row,
  Col,
} from "antd";
import { useFormik } from "formik";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUser, DeleteUser, UpdatePhone } from "../redux/userSlice";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import {
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Typography,
  Button,Select
} from "@mui/material";
import "./form.css";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();
export default function Main() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agree: false,
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        AddUser({
          id: userList[userList.length - 1].id + 1,
          name: values.name,
          username: values.username,
          phone: values.phone,
          email: values.email,
          subject: values.subject,
        })
      );
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      subject: Yup.string().required("Required.").typeError("Please select a program."),
      message: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  //handle table
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.user);
  const [newPhone, setNewPhone] = useState(0);
  const { Option } = Select;

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "5%",
      // sorter: (a, b) => a.vehicleId > b.vehicleId,
      // sortOrder: sortedInfo.columnKey === 'vehicleId' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "New Phone",
      dataIndex: "newPhone",
      key: "newPhone",

      render: (_, id) => (
        <Input
          onChange={(event) => {
            setNewPhone(event.target.value);
          }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, id) => (
        <>
          <Popconfirm
            className="p-2"
            title="Sure to change?"
            onConfirm={() =>
              dispatch(UpdatePhone({ id: id.id, phone: newPhone }))
            }
          >
            <a>Update</a>
          </Popconfirm>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => dispatch(DeleteUser({ id: id.id }))}
          >
            <a>Delete</a>
          </Popconfirm>
        </>
      ),
    },
  ];


  return (
      <Row>
        <Col lg={8} xs={24} sm={24}>

    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" className="card p-2"> 
      
        <CssBaseline />
        <Typography component="h1" variant="h5">
            Add contact
          </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
 <form className="form p-2 m-2" onSubmit={formik.handleSubmit}>
 <Grid container spacing={2}>
              <Grid item xs={12} >
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              </Grid>
              {formik.errors.name && (
                <Typography variant="caption" color="red">
                  {formik.errors.name}
                </Typography>
              )}
                            <Grid item xs={12} >

              <TextField
                label="Email"
                name="email"
                fullWidth

                value={formik.values.email}
                onChange={formik.handleChange}
              />
              </Grid>
              {formik.errors.email && (
                <Typography variant="caption" color="red">
                  {formik.errors.email}
                </Typography>
              )}
                            <Grid item xs={12} >
                            <TextField
                label="phone"
                name="phone"
                fullWidth

                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              </Grid>
              {formik.errors.phone && (
                <Typography variant="caption" color="red">
                  {formik.errors.phone}
                </Typography>
              )}
                            <Grid item xs={12} >

              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">program</InputLabel>
                <Select
                defaultValue={1}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  label="Program of Study"
                  name="subject"
                  fullWidth
                  value={formik.values.program}
                  onChange={formik.handleChange}
                >
          <MenuItem value="SE">Software Engineering</MenuItem>
          <MenuItem value="IS">Information System</MenuItem>
          <MenuItem value="IA">Information Assurance</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              {formik.errors.program && (
                <Typography variant="caption" color="red">
                  {formik.errors.program}
                </Typography>
              )}
              <Grid item xs={12} >

              <TextField                 fullWidth
                id="outlined-multiline-static"
                label="Message"
                multiline
                name="message"
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
              />
</Grid>
<Grid item xs={12} >

              <FormControlLabel
                control={<Switch />}
                label="Agree to terms and conditions."
                name="agree"
                value={formik.values.agree}
                onClick={formik.handleChange}
              />
              </Grid>
              {formik.errors.agree && (
                <Typography variant="caption" color="red">
                  {formik.errors.agree}
                </Typography>
              )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            </Grid>
          </form>


          </Box>
      </Container>
    </ThemeProvider>
         
        </Col>
        <Col lg={16} xs={24} sm={24}>
          <Table columns={columns} dataSource={userList} />
        </Col>
      </Row>
  );
}
