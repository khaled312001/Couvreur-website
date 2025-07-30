import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

const AdminLayout = () => (
  <div className="admin-container">
    <AdminHeader />
    <main className="admin-main">
      <div className="admin-content">
        <Outlet />
      </div>
    </main>
  </div>
);

export default AdminLayout;
