import { Project } from "../screens/projectList/list";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
import { clearObject } from "./index";
import { User } from "../screens/projectList/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: clearObject(param || {}) }));
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
