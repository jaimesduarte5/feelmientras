import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CampaignContent from "../pages/admin/CampaignContent";
import ContentManagement from "../pages/admin/ContentManagement";
import UserManagement from "../pages/admin/UserManagement";
import HomeSA from "../pages/home/HomeSA";
import Layout from "../components/Layout";
import { Error404 } from "../pages/Error404";

export default function RouterSA() {
  return (
    <>
      <Route path="*" element={<Error404 />} />
      <Route path="/login" element={<Navigate to="/admin/home" />} />
      <Route path="/" element={<Navigate to="/admin/home" />} />
      {/* <Route path="/error404" element={<Error404 />} /> */}
      <Route
        path="/admin/home"
        element={
          <Layout>
            <HomeSA />
          </Layout>
        }
      />
      <Route
        path="/admin/campaignContent"
        element={
          <Layout>
            <CampaignContent />
          </Layout>
        }
      />
      <Route
        path="/admin/contentManagement"
        element={
          <Layout>
            <ContentManagement />
          </Layout>
        }
      />
      <Route
        path="/admin/userManagement"
        element={
          <Layout>
            <UserManagement />
          </Layout>
        }
      />
    </>
  );
}
