import * as React from "react";
import * as qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { useDebounce, useMount } from "../../utils";
import { clearObject } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

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
    client("projects", { data: clearObject(debouncedParam) }).then(setList);

    /*fetch(
      `${apiURL}/projects?${qs.stringify(clearObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });*/
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
