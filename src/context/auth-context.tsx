import * as React from "react";
import { ReactNode, useState } from "react";
import * as auth from "auth-providers";
import { User } from "../screens/projectList/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

interface AuthForm {
  username: string;
  password: string;
}

// 让页面刷新初始化user的时候保留token
const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // endpints 如果为 me, 就会有 data.user
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser); // 消参
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // 页面加载的时候引入user token
  useMount(() => {
    // boostrapUser().then(setUser);
    run(boostrapUser());
  });

  // 需要设置组件用来全局显示loading状态, 在处理刷新列表页面的时候
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 处理 me 接口有问题的时候，将错误信息显示在页面
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthContext.Provider");
  }
  return context;
};
