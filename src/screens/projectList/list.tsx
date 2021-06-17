import * as React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface LisPropTypes extends TableProps<Project> {
  users: User[]; // 这是额外添加的属性
  // list: Project[];
}

// type PropTypes = Omit<LisPropTypes, 'users'>  这里就是 props
export const List: React.FC<LisPropTypes> = ({
  users,
  /*list*/ ...props
}: LisPropTypes) => {
  return (
    <Table
      loading
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("DD-MM-YYYY")
                  : "none"}
              </span>
            );
          },
        },
      ]}
      // dataSource={list}
      {...props}
    />
    /*<table>
      <thead>
        <tr>
          <th>项目名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>*/
  );
};
