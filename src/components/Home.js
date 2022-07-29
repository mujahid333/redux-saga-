import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPosts, delete_post ,add_post } from "../redux/actions/actions";
// import { Dispatch } from 'react';
import "antd/dist/antd.css";
import { Table, Space, Button, Modal, Checkbox, Form, Input } from "antd";

export const Home = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userid , setuserid] = useState('')
  const [title , settitle] = useState('')
  const [body , setbody] = useState('')

  function submit()
  {
    const data = {"userid":userid,"title":title,"body":body}
    props.addpost(data);
    setuserid('');
    settitle('');
    setbody('')
    setIsModalVisible(false);


  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    props.getPost();
  }, []);

  const apivalue = props.posts;
  // console.warn(props.posts);

  const columns = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <a> {text}</a>,
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, apivalue) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>{showModal()}}>Edit</Button>
          <Button type="primary" danger onClick={()=>{props.deletepost(apivalue.id)}}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {  
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // console.warn("api --------");
  console.warn(apivalue);
  // apivalue.length !==0 ? console.log("done"):console.log("ooooooooooooooo")

  return (
    <div>
      {/* <h1>hello saga</h1> */}

      <Button type="primary" onClick={showModal}>
        Add post
      </Button>

      <Modal
        title="add post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User ID"
            name="userid"
            rules={[
              {
                required: true,
                message: "Please enter user id!",
              },
            ]}
          >
            <Input onChange={(e)=>{setuserid(e.target.value)}}/>
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter post title!",
              },
            ]}
          >
          <Input onChange={(e)=>{settitle(e.target.value)}}/>
          </Form.Item>

          <Form.Item
            label="Body"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter body contant",
              },
            ]}
          >
           <Input onChange={(e)=>{setbody(e.target.value)}}/>
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={submit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns}  dataSource={apivalue}  />

      {/* <button onClick={()=>{props.getPost()}}>Get Api Data</button> */}
      <h3>{}</h3>
    </div>
  );
};

const mapStateToprops = (state) => ({
  // items: state.gotposts,
  posts: state.gotposts.posts,
});

const mapDispatchToprops = (dispatch) => ({
  getPost: () => dispatch(getPosts()),
  deletepost:(data) => dispatch(delete_post(data)),
  addpost:(data)=>dispatch(add_post(data))
});

export default connect(mapStateToprops, mapDispatchToprops)(Home);
