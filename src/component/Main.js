import { Form, Input,Space,Select,Checkbox , Button, Table, Popconfirm, Row, Col } from "antd";
import { useFormik } from "formik";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUser, DeleteUser, UpdatePhone } from "../redux/userSlice";
import * as Yup from "yup";
export default function Main() {
  //hanle Form
  const handleSubmit = (values) => {
    dispatch(
      AddUser({
        id: userList[userList.length - 1].id + 1,
        name: values.name,
        username: values.username,
        phone: values.phone,
        email: values.email,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject:"",
      // message:"",
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
          subject:values.subject
        })
      );
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      subject: Yup.string().typeError("Please select a program."),      // message: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  //handle table
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.user);
  const [newPhone, setNewPhone] = useState("");
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
    }, {
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
          <Popconfirm className="p-2"
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
    <div className="container p-5">
      <Row>
<Col lg={24} xs={24} sm={24} >      <Form onFinish={formik.handleSubmit}     className="mt-5 pt-5 card"  labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}>
        {/* <Form.Item label="Vehicle type" name="vehicleType">
                    <Radio.Group>
                        <Radio value="BUS"> Bus - 40 seats </Radio>
                        <Radio value="LIMOUSINE"> limo - 9 seats</Radio>
                    </Radio.Group>
                </Form.Item> */}
        <Form.Item label="Name">
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <span variant="caption" color="red">
              {formik.errors.name}
            </span>
          )}
        </Form.Item>
        {/* <Form.Item label="Subject">
    
            <Form.Item label="Select">
          <Select name="subject" 
    placeholder="select one country"
    DefaultValue={formik.values.subject}
    onChange={formik.handleChange}
    optionLabelProp="label">
            <Select.Option value="a">Demo</Select.Option>
          </Select>
        </Form.Item>      
        {formik.errors.subject && (
    <span variant="caption" color="red">
      {formik.errors.subject}
    </span>
  )}
          </Form.Item> */}

        <Form.Item label="Phone">
          <Input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && (
            <span variant="caption" color="red">
              {formik.errors.phone}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <span variant="caption" color="red">
              {formik.errors.email}
            </span>
          )}
        </Form.Item>
        <Form.Item  >
        <Checkbox name='agree' value={formik.values.agree}  onClick={formik.handleChange} >Agree</Checkbox >
          {formik.errors.agree && (
            <span variant="caption" color="red">
              {formik.errors.agree}
            </span>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add Contact
          </Button>
        </Form.Item>
      </Form></Col>
      <Col lg={12} xs={24} sm={24} >    ;
</Col>
      </Row>
      <Table columns={columns} dataSource={userList} />

    </div>
  );
}
