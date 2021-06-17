import * as React from "react";
import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

const apiURL = process.env.REACT_APP_API_URL;

// 这里面加入error的属性
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // 同时增加确认密码的功能, 但是cpassword不参与用户交互，所以单独拿出来
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("confirm the same passwords input"));
      return;
    }
    try {
      // await register(values);
      // register(values).catch(e)
      await run(register(values));
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "confirm password" }]}
      >
        <Input placeholder={"confirm password"} type="text" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
