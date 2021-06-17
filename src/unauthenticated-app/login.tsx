import * as React from "react";
import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  // 处理用户登录的时候的loading 状态
  // 这里不适用error，因为是异步操作，
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  /*const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };*/

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // await login(values);
      await run(login(values));
    } catch (e) {
      onError(e);
    }
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
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
