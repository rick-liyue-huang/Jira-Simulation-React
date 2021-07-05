import { useAsync } from "./use-async";
import { Project } from "../screens/projectList/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // 同意定义一个use-async方法来处理接口
  const {run, ...result} = useAsync<Project[]>()

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
}