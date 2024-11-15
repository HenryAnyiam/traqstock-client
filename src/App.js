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
import HousingStructure from "./Components/HousingStructure";
import NewHousingStructure from "./Components/NewHousingStructure";
import NewFlock from "./Components/NewFlock";
import ViewFlock from "./Components/ViewFlock";
import FlockDetails from "./Components/FlockDetails";
import FlockMovement from "./Components/FlockMovement";
import NewFlockMovement from "./Components/NewFlockMovement";
import FlockInspection from "./Components/FlockInspection";
import NewFlockInspection from "./Components/NewFlockInspection";
import BreedInformation from "./Components/BreedInformation";
import NewBreedInformation from "./Components/NewBreedInformation";
import EggCollection from "./Components/EggCollection";
import NewEggCollection from "./Components/NewEggCollection";

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
            <Route path='housing-structure' element={<HousingStructure />} />
            <Route path='housing-structure/new' element={<NewHousingStructure />} />
            <Route path='farm-data/new-record' element={<NewRecord />}/>
            <Route path='flocks/sources' element={<FlockSource />} />
            <Route path='flocks/breeds' element={<FlockBreed />} />
            <Route path='flocks/flocks/new' element={<NewFlock />} />
            <Route path='flocks/flocks' element={<ViewFlock />} />
            <Route path='flocks/movement' element={<FlockMovement />} />
            <Route path='flocks/movement/new' element={<NewFlockMovement />} />
            <Route path='flocks/inspection' element={<FlockInspection />} />
            <Route path='flocks/inspection/new' element={<NewFlockInspection />} />
            <Route path='flocks/breed-information' element={<BreedInformation />} />
            <Route path='flocks/breed-information/new' element={<NewBreedInformation />} />
            <Route path='egg-collection' element={<EggCollection />} />
            <Route path='egg-collection/new' element={<NewEggCollection />} />
            <Route path='flocks/flocks/:flockId/details' element={<FlockDetails />} />
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
