import * as React from "react";
import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login } = useAuth();

  /*const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };*/

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "need username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "need password" }]}
      >
        <Input placeholder={"password"} type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
