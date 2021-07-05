import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../util/use-async";

const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
  const { login } = useAuth();

  // 将 useAsync应用到longin
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});

  // 因为使用了 antd，可以改变登录方法的定义
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // await login(values);
      await run(login(values))
    } catch (e) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

/*
const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

*/
