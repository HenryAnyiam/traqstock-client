import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Utils/userAuth";
import Dashboard from "./Components/Dashboard";
import RequireLogin from "./Utils/RequireLogin";
import NewRecord from "./Components/NewRecord";
import FarmData from "./Components/FarmData";
import StaffManagement from "./Components/StaffManagement";
import ManageProfile from "./Components/ManageProfile";
import Login from "./Components/Login";
import Page404 from "./Components/Page404";
import LoggedIn from "./Utils/LoggedIn";
import FarmDataTable from "./Components/FarmDataTable";
import FarmDataChart from "./Components/FarmDataChart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import ResetPassword from "./Components/ResetPassword";
import UserDashboard from "./Components/UserDashboard";
import FlockSource from "./Components/FlockSource";
import FlockBreed from "./Components/FlockBreed";
import HousingStructureTable from "./Components/HousingStructureTable";
import NewHousingStructure from "./Components/NewHousingStructure";
import NewFlock from "./Components/NewFlock";
import ViewFlock from "./Components/ViewFlock";
import FlockMovement from "./Components/FlockMovement";
import NewFlockMovement from "./Components/NewFlockMovement";
import FlockInspection from "./Components/FlockInspection";
import NewFlockInspection from "./Components/NewFlockInspection";
import BreedInformation from "./Components/BreedInformation";
import NewBreedInformation from "./Components/NewBreedInformation";
import EggCollectionTable from "./Components/EggCollectionTable";
import NewEggCollection from "./Components/NewEggCollection";
import FlockHistory from "./Components/FlockHistory";
import NewFlockHistory from "./Components/NewFlockHistory";
import RequireManager from "./Utils/RequireManager"
import NewFlockSource from "./Components/NewFlockSource";
import NewFlockBreed from "./Components/NewFlockBreed";
import Treatment from "./Components/Treatment";
import EggSales from "./Components/EggSales";

function App() {
  return (
    <div className="App flex">
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path='dashboard' element={<RequireLogin><Dashboard /></RequireLogin>}>
            <Route path='user' element={<UserDashboard />} />
            <Route path='farm-data' element={<FarmData />}>
              <Route path='table' element={<FarmDataTable />}/>
              <Route path='chart' element={<FarmDataChart />}/>
            </Route>
            <Route path='housing-structure' element={<RequireManager><HousingStructureTable /></RequireManager>} />
            <Route path='housing-structure/new' element={<RequireManager><NewHousingStructure /></RequireManager>} />
            <Route path='farm-data/new-record' element={<NewRecord />}/>
            <Route path='flocks/sources' element={<FlockSource />} />
            <Route path='flocks/sources/new' element={<RequireManager><NewFlockSource /></RequireManager>} />
            <Route path='flocks/breeds' element={<FlockBreed />} />
            <Route path='flocks/breeds/new' element={<RequireManager><NewFlockBreed /></RequireManager>} />
            <Route path='flocks/flocks/new' element={<RequireManager><NewFlock /></RequireManager>} />
            <Route path='flocks/flocks' element={<ViewFlock />} />
            <Route path='flocks/treatment' element={<Treatment />} />
            <Route path='flocks/egg-sales' element={<EggSales />} />
            <Route path='flocks/movement' element={<RequireManager><FlockMovement /></RequireManager>} />
            <Route path='flocks/movement/new' element={<RequireManager><NewFlockMovement /></RequireManager>} />
            <Route path='flocks/inspection' element={<FlockInspection />} />
            <Route path='flocks/inspection/new' element={<NewFlockInspection />} />
            <Route path='flocks/breed-information' element={<RequireManager><BreedInformation /></RequireManager>} />
            <Route path='flocks/breed-information/new' element={<RequireManager><NewBreedInformation /></RequireManager>} />
            <Route path='egg-collection' element={<RequireManager redirect="/dashboard/egg-collection/new"><EggCollectionTable /></RequireManager>} />
            <Route path='egg-collection/new' element={<NewEggCollection />} />
            <Route path='flocks/history' element={<RequireManager><FlockHistory /></RequireManager>} />
            <Route path='flocks/history/new' element={<RequireManager><NewFlockHistory /></RequireManager>} />
            <Route path='manage-staffs' element={<RequireManager><StaffManagement /></RequireManager>}/>
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
