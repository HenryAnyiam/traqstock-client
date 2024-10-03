import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Utils/userAuth";
import Dashboard from "./Components/Dashboard";
import RequireLogin from "./Utils/RequireLogin";
import NewRecord from "./Components/NewRecord";
import WeeklyReport from "./Components/WeeklyReport";
import MonthlyReport from "./Components/MonthlyReport";
import StaffManagement from "./Components/StaffManagement";
import ManageProfile from "./Components/ManageProfile";
import Login from "./Components/Login";
import Page404 from "./Components/Page404";
import LoggedIn from "./Utils/LoggedIn";

function App() {
  return (
    <div className="App flex">
      <AuthProvider>
        <Routes>
          <Route path='dashboard' element={<RequireLogin><Dashboard /></RequireLogin>}>
            <Route path='new-record' element={<NewRecord />}/>
            <Route path='weekly-report' element={<WeeklyReport />}/>
            <Route path='monthly-report' element={<MonthlyReport />}/>
            <Route path='manage-staffs' element={<StaffManagement />}/>
            <Route path='profile' element={<ManageProfile />}/>
          </Route>
          <Route path='login' element={<LoggedIn><Login /></LoggedIn>} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
