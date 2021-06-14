import * as React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

export const ProjectList = () => {
  return (
    <div>
      <SearchPanel />
      <List />
    </div>
  );
};
