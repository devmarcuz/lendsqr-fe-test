import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../scss/Dashboard.css";
import LeftDashboardSection from "../components/LeftDashboardSection";
import RightSectionDashboardUser from "../components/RightSectionDashboardUser";
import { useNavigate } from "react-router-dom";

const DashBoardUser = ({ totalPosts }) => {
  const [bar, setBar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("lendsqr_data")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container dashboard-user-container">
      <Header setBar={setBar} bar={bar} />
      <div className="main-container">
        <LeftDashboardSection bar={bar} />
        <RightSectionDashboardUser totalPosts={totalPosts} />;
      </div>
    </div>
  );
};

export default DashBoardUser;
