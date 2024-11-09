import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Utils/userAuth";
import Dashboard from "./Components/Dashboard";
import RequireLogin from "./Utils/RequireLogin";
import NewRecord from "./Components/NewRecord";
import MonthlyReport from "./Components/MonthlyReport";
import StaffManagement from "./Components/StaffManagement";
import ManageProfile from "./Components/ManageProfile";
import Login from "./Components/Login";
import Page404 from "./Components/Page404";
import LoggedIn from "./Utils/LoggedIn";
import MothlyReportTable from "./Components/MothlyReportTable";
import MonthlyReportChart from "./Components/MonthlyReportChart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import ResetPassword from "./Components/ResetPassword";
import UserDashboard from "./Components/UserDashboard";
import FlockSource from "./Components/FlockSource";
import FlockBreed from "./Components/FlockBreed";

function App() {
  return (
    <div className="App flex">
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path='dashboard' element={<RequireLogin><Dashboard /></RequireLogin>}>
            <Route path='user' element={<UserDashboard />} />
            <Route path='farm-data' element={<MonthlyReport />}>
              <Route path='table' element={<MothlyReportTable />}/>
              <Route path='chart' element={<MonthlyReportChart />}/>
            </Route>
            <Route path='farm-data/new-record' element={<NewRecord />}/>
            <Route path='flocks/sources' element={<FlockSource />} />
            <Route path='flocks/breeds' element={<FlockBreed />} />
            <Route path='manage-staffs' element={<StaffManagement />}/>
            <Route path='profile' element={<ManageProfile />}/>
          </Route>
          <Route path='login' element={<LoggedIn><Login /></LoggedIn>} />
          <Route path='forgot-password' element={<LoggedIn><ResetPassword /></LoggedIn>} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
