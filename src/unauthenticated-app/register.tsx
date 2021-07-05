import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../util/use-async";

const apiURL = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
  const { register, user } = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});

  // 因为使用了 antd，可以改变登录方法的定义
  const handleSubmit = async ({confirmpassword, ...values}: { username: string; password: string, confirmpassword: string }) => {
    // 增加确认密码功能
    if (confirmpassword !== values.password) {
      onError(new Error('确认两次密码相同'));
      return
    }

    try {
      await run(register(values));
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
      <Form.Item
        name={"confirmpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" id={"confirmpassword"} placeholder={"确认密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
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
