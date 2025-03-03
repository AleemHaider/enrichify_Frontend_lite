import { HashRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import Layout from "../components/layout/index";
import LoginPage from "../pages/auth/login/Index";
import Home from "../pages/home";
import OtpScreen from "../pages/auth/otp/OtpScreen";
import EnrichData from "../pages/EnrichData";
import File from "../pages/File";
import Request from "../pages/request";
import Projects from "../pages/Projects";
import TrafficTable from "../pages/Projects/TrafficTable";
import ProjectsLayout from "../pages/Projects/ProjectsLayout";
import Login from "../client/pages/auth";
import ClientLayout from "../client/components/layout";
import ClientHome from "../client/pages/home";
import Settings from "../client/pages/settings";
import VisitorDetail from "../client/pages/home/VisitorDetail";
import ClientOtpScreen from "../client/pages/auth/otp/OtpScreen";
import { ClientPublicRoutes } from "./ClientPublicRoutes";

const Routers = () => {
  return (
    <>
      <HashRouter>

        {/* Client Panel Routes */}
        <Routes>
          <Route path="/client" element={<ClientPublicRoutes><Login /></ClientPublicRoutes>} />
          <Route path="/client/forgot-password" element={<ClientPublicRoutes><ClientOtpScreen /></ClientPublicRoutes>} />
          <Route path="/client/dashboard" element={<ClientLayout><ClientHome /></ClientLayout>} />
          <Route path="/client/dashboard/visitors" element={<ClientLayout><VisitorDetail /></ClientLayout>} />
          <Route path="/client/settings" element={<ClientLayout><Settings /></ClientLayout>} />
        </Routes>

        <Routes>
          {/* Admin Panel Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />


          <Route
            path="/otp"
            element={
              <PublicRoute>
                <OtpScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/projects"
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
          {/* <Route
            path="/projects/traffic/:key"
            element={
              <Layout>
              <TrafficTable/>
              </Layout>
            }
          /> */}

          <Route
            path="/project/traffic/:key"
            element={
              <Layout>
                <ProjectsLayout>
                  <TrafficTable />
                </ProjectsLayout>
              </Layout>
            }
          />
          <Route
            path="/project/requests/:key"
            element={
              <Layout>
                <ProjectsLayout>
                  <Request />
                </ProjectsLayout>
              </Layout>
            }
          />
          {/* <Route
            path="/projects/requests/:key"
            element={
              <Layout>
              <Request/>
              </Layout>
            }
          /> */}
          <Route
            path="/fileupload"
            element={
              <Layout>
                <File />
              </Layout>
            }
          />
          <Route
            path="/project/requests/:key/enrichdata/:id"
            element={
              <Layout>
                <ProjectsLayout>
                  <EnrichData />
                </ProjectsLayout>
              </Layout>

            }
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default Routers;
