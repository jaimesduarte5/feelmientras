import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import CampaignContent from "../pages/admin/CampaignContent";
import ContentManagement from "../pages/admin/ContentManagement";
import UserManagement from "../pages/admin/UserManagement";
import { Error404 } from "../pages/Error404";
import HomeSA from "../pages/home/HomeSA";
import Login from "../pages/Login";
import ViewCourse from "../pages/ViewCourse";
import POCAnalytics from "../pages/poc/POCAnalytics";
import POCContentManagement from "../pages/poc/POCContentManagement";
import POCCoursesManagement from "../pages/poc/POCCoursesManagement";
import POCLearningPlan from "../pages/poc/POCLearningPlan";
import POCMeetings from "../pages/poc/POCMeetings";
import POCUserManagement from "../pages/poc/POCUserManagement";
import LogoutPage from "../pages/LogoutPage";
import HomeUser from "../pages/user/HomeUser";
import MyActivities from "../pages/user/MyActivities";
import AgentViewCourse from "../pages/user/AgentViewCourse";
import ExternalContentManage from "../pages/admin/ExternalContentManage";
import HomeViewer from "../pages/viewer/HomeViewer";
import Activities from "../pages/viewer/Activities";
import ViewerCourse from "../pages/viewer/ViewerCourse";

const rutasSA = [
  { ruta: "/admin/home", element: <HomeSA /> },
  { ruta: "/", element: <Navigate to="/admin/home" /> },
  { ruta: "/login", element: <Navigate to="/admin/home" /> },
  { ruta: "/admin/userManagement", element: <UserManagement /> },
  { ruta: "/admin/campaignContent", element: <CampaignContent /> },
  { ruta: "/admin/contentManagement", element: <ContentManagement /> },
  { ruta: "course-preview/:idCourse/:idCampaign", element: <ViewCourse /> },
  {
    ruta: "/admin/externalContentManagement",
    element: <ExternalContentManage />,
  },
  { ruta: "*", element: <Error404 /> },
];
const rutasUser = [
  { ruta: "/", element: <Navigate to="/user/home" /> },
  { ruta: "/login", element: <Navigate to="/admin/home" /> },
  { ruta: "/user/home", element: <HomeUser /> },
  { ruta: "/user/my-activities", element: <MyActivities /> },
  { ruta: "/user/course/:idCourse/:idLp", element: <AgentViewCourse /> },
  { ruta: "*", element: <Error404 /> },
];
const rutasViewer = [
  { ruta: "/", element: <Navigate to="/viewer/home" /> },
  { ruta: "/login", element: <Navigate to="/admin/home" /> },
  { ruta: "/viewer/home", element: <HomeViewer /> },
  { ruta: "/viewer/activities", element: <Activities /> },
  { ruta: "/viewer/course/:idCourse/:idLp", element: <ViewerCourse /> },
  { ruta: "*", element: <Error404 /> },
];

const rutasPOC = [
  { ruta: "/home", element: <HomeSA /> },
  { ruta: "/", element: <Navigate to="/home" /> },
  { ruta: "/login", element: <Navigate to="/home" /> },
  { ruta: "/poc/userManagement", element: <POCUserManagement /> },
  { ruta: "/poc/learningPlan", element: <POCLearningPlan /> },
  { ruta: "/poc/contentManagement", element: <POCContentManagement /> },
  { ruta: "/poc/coursesManagement", element: <POCCoursesManagement /> },
  { ruta: "/poc/meetings", element: <POCMeetings /> },
  { ruta: "/poc/analytics", element: <POCAnalytics /> },
  { ruta: "course-preview/:idCourse/:idCampaign", element: <ViewCourse /> },
  { ruta: "*", element: <Error404 /> },
];

const AppRouter = () => {
  const { userData } = useSelector((state) => state.login);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!userData && (
            <>
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={<Login />} />
              <Route path="/logout" element={<LogoutPage />} />
            </>
          )}
          {userData?.role === "Super Admin" && (
            <>
              <Route path="/logout" element={<LogoutPage />} />
              {rutasSA.map(({ ruta, element }) => (
                <Route
                  key={ruta}
                  path={ruta}
                  element={<Layout>{element}</Layout>}
                />
              ))}
            </>
          )}
          {userData?.role === "Poc" && (
            <>
              <Route path="/logout" element={<LogoutPage />} />
              {rutasPOC.map(({ ruta, element }) => (
                <Route
                  key={ruta}
                  path={ruta}
                  element={<Layout>{element}</Layout>}
                />
              ))}
            </>
          )}
          {userData?.role === "Agent" && (
            <>
              <Route path="/logout" element={<LogoutPage />} />
              {rutasUser.map(({ ruta, element }) => (
                <Route
                  key={ruta}
                  path={ruta}
                  element={<Layout>{element}</Layout>}
                />
              ))}
            </>
          )}
          {(userData?.role === "Viewer" || userData?.role === "TP Viewer") && (
            <>
              <Route path="/logout" element={<LogoutPage />} />
              {rutasViewer.map(({ ruta, element }) => (
                <Route
                  key={ruta}
                  path={ruta}
                  element={<Layout>{element}</Layout>}
                />
              ))}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
