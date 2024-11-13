import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-token", {
          credentials: "include",
          headers: { "Cache-Control": "no-cache" },
        });

        if (response.status === 401) {
          try {
            const res = await fetch("/api/user/sign-out", { method: "POST" });
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
              dispatch(signOutSuccess(data));
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        console.error("Authentication check failed: ", error);
        navigate("/sign-in");
      }
    };

    checkAuth();

    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search, navigate, dispatch]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <>
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "users" && <DashUsers />}
      </>
    </div>
  );
};

export default Dashboard;
