import * as React from "react";
import { FormEvent } from "react";

const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const handleLogin = (param: { username: string; password: string }) => {
    fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    handleLogin({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>Login</button>
    </form>
  );
};
