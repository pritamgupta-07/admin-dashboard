import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const SideBar = lazy(() => import("../scenes/global/Sidebar"));
const Topbar = lazy(() => import("../scenes/global/Topbar"));
const Dashboard = lazy(() => import("../scenes/dashboard"));
const Team = lazy(() => import("../scenes/team"));
const Contacts = lazy(() => import("../scenes/contacts"));
const Invoices = lazy(() => import("../scenes/invoices"));
const Form = lazy(() => import("../scenes/form"));
const Calendar = lazy(() => import("../scenes/calendar"));
const FAQ = lazy(() => import("../scenes/faq"));
const LineCharts = lazy(() => import("../scenes/line"));
const PieChart = lazy(() => import("../scenes/pie"));
const BarChart = lazy(() => import("../scenes/bar"));
const GeographyChart = lazy(() => import("../scenes/geography"));
const Profile = lazy(() => import("./Profile"));
const Settings = lazy(() => import("./Settings"));
const Login = lazy(() => import("./Login"));
const Search = lazy(() => import("./Search"));

const ProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Suspense>
      {isLoggedIn ? (
        <div className="app">
          <SideBar />
          <main className="content">
            <Topbar />

            <Suspense>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/profile-form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar-charts" element={<BarChart />} />
                <Route path="/pie-charts" element={<PieChart />} />
                <Route path="/line-charts" element={<LineCharts />} />
                <Route path="/geography" element={<GeographyChart />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<Search />} />
                <Route path="/reset-password/:id/:token" element={<ResetPassword isChangePassword={true}/>}/>
                <Route path="*" element={<h1> 404 Page not found!</h1>} />
              </Routes>
            </Suspense>
          </main>
        </div>
      ) : (
        <Suspense>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      )}
    </Suspense>
  );
};

export default ProtectedRoutes;
