import { useAsync } from "./useAsync";
import { Project } from "../screens/projectList/list";
import { clearObject } from "./index";
import { useHttp } from "./http";
import { useEffect } from "react";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: clearObject(param || {}) }));
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
