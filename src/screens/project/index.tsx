import React from 'react';
import { Link } from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import {KanbanScreen} from "../kanban";
import {EpicScreen} from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/*注意：这里不需要加入'/' 否则就是从根目录开始 */}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        {/*默认进入看板页面*/}
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  )
}