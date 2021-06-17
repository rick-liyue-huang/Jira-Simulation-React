import * as React from "react";
import * as qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { useDebounce, useMount } from "../../utils";
import { clearObject } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

  // 处理页面 加载的问题 ，这里面我们将Table的属性通过...props传递，同时在List组件中添加额外的属性
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const client = useHttp();

  /*useEffect(() => {
    fetch(`${apiURL}/users`)
      .then(async res => {
        if (res.ok) {
          setUsers(await res.json());
        }
      });
  }, [])*/

  useMount(() => {
    client("users").then(setUsers);

    /*fetch(`${apiURL}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });*/
  });

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: clearObject(debouncedParam) })
      .then(setList)
      .catch((e) => {
        setList([]);
        setError(e);
      })
      .finally(() => setIsLoading(false));

    /*fetch(
      `${apiURL}/projects?${qs.stringify(clearObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });*/

    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {/*<List users={users} list={list} />*/}
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
