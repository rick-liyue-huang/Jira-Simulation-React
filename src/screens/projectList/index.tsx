import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { useDebounce, cleanObject, useMount, useDocumentTitle } from "../../util";
import { useHttp } from "../../util/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "../../util/use-async";
import { useProjects } from "../../util/project";
import { useUsers } from "../../util/user";
import { Helmet } from "react-helmet";
import {Test} from './test-closure';
import { useUrlQueryParam } from "../../util/url";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  /*const [param, setParam] = useState({
    name: "",
    personId: "",
  });*/

  // console.log(useUrlQueryParam(["name"]));
  // 因为使用了 useUrlQueryParam(), 所以param就可以从这里引入
  // const [keys] = useState<('name' |  'personId')[]>(['name', 'personId']);
  // const [param] = useUrlQueryParam(keys);

  const [param, setParam] = useUrlQueryParam(['name', 'personId']);

  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

  // 处理页面的加载和异常处理
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  // 使用 自定义 http hook, 这样可以将token传入到登录后的项目展示列表中
  // const client = useHttp();

  // 同意定义一个use-async方法来处理接口
  // const {run, isLoading, error, data: list} = useAsync<Project[]>();

  const {isLoading, error, data: list} = useProjects(debouncedParam);

  const {data: users} = useUsers();

  /*useEffect(() => {
    // setIsLoading(true);
    run(client("projects", { data: cleanObject(debouncedParam) }));

    /!*client("projects", { data: cleanObject(debouncedParam) })
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .then(setList)
      .finally(() => setIsLoading(false));*!/

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);*/

  /*useMount(() => {
    client("users").then(setUsers);

    /!*fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });*!/
  });*/

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      {/*<Test />*/}
      {/*<Helmet>*/}
      {/*  <title>项目列表</title>*/}
      {/*</Helmet>*/}
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {/*<List /!*list={list}*!/ dataSource={list} users={users} />*/}
      {
        error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
      }
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
}

// 开始追踪该组件引起的无限渲染
ProjectListScreen.whyDidYouRender = true;

//相当于
/*class Test extends React.Component<any, any> {
  static whyDidYouRender = true;
}*/

const Container = styled.div`
  padding: 3.2rem;
`;
