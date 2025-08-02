import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

const AdminLayout = () => (
  <div className="admin-layout">
    <SidebarAdmin />
    <div className="admin-main-content">
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);

export default AdminLayout;
