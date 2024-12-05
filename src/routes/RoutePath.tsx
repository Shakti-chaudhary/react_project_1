import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Form from "../pages/AddTask";
import Tasks from "../pages/Tasks";
import Update from "../pages/UpdateTask";

function RoutePath() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Form />}></Route>
        <Route path="/tasks/add" element={<Navigate to="/" replace />}></Route>
        <Route path="/tasks/update/:id" element={<Update />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Route>
    </Routes>
  );
}

export default RoutePath;
