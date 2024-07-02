import React, {useState} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "../src/Login/Login";
import Admission from '../src/pages/Admission/Admission';
import Fees from './pages/Fees/Fees';
import Reports from './pages/Reports/Reports';
import Tools from './pages/Tools/Tools';
import ViewAdmission from '../src/pages/Admission/ViewAdmission'
import NewAdmission from '../src/pages/Admission/NewAdmission'
import FeeEntry from './pages/Fees/FeeEntry'
import ViewReport from './pages/Fees/ViewReport'
import DailyCollection from './pages/Reports/DailyCollection'
import StudentDues from './pages/Reports/StudentDues'
import DetailedCollection from './pages/Reports/DetailedCollection'
import LeftStudent from '../src/pages/Admission/LeftStudent'
import AddClass from './pages/Settings/AddClass';
import AddFees from './pages/Settings/AddFees';
import AddUsers from './pages/Settings/AddUsers';
import AddAcademicYear from './pages/Settings/AddAcademicYear';
import AddCastCategory from './pages/Settings/AddCastCategory';
import AddFeeParticulars from './pages/Settings/AddFeeParticulars';
import AddConcession from './pages/Settings/AddConcession';
import Help from './pages/Help/Help'
import UpdateAdmission from './pages/Admission/UpdateAdmission';

const App = () => {

  const [isAuthenticated, setAuthentication] = useState(false);

  const handleLogin = (isLoggedIn) => {
    setAuthentication(isLoggedIn);
  };

  return (
    <>
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
    <BrowserRouter>
    {isAuthenticated ? (
    <Routes>
      <Route path='/' exact element={<Admission/>}></Route>
      <Route path='/new-admission' exact element={<NewAdmission/>}></Route>
      <Route path='/view-admission' exact element={<ViewAdmission/>}></Route>
      <Route path='/view-admission/edit/:id' exact element={<UpdateAdmission/>}></Route>
      <Route path='/left-student' exact element={<LeftStudent/>}></Route>
      <Route path='/fees' exact element={<Fees/>}></Route>
      <Route path='/fee-entry' exact element={<FeeEntry/>}></Route>
      <Route path='/view-report' exact element={<ViewReport/>}></Route>
      <Route path='/reports' exact element={<Reports/>}></Route>
      <Route path='/daily-collection' exact element={<DailyCollection/>}></Route>
      <Route path='/student-dues' exact element={<StudentDues/>}></Route>
      <Route path='/detailed-collection' exact element={<DetailedCollection/>}></Route>
      <Route path='/tools' exact element={<Tools/>}></Route>
      <Route path='/settings/add-class'exact element={<AddClass/>}></Route>
      <Route path='/settings/add-fees' exact element={<AddFees />} ></Route>
      <Route path='/settings/add-fee-particular' exact element={<AddFeeParticulars/>}></Route>
      <Route path='/settings/add-academic-year' exact element={<AddAcademicYear/>}></Route>
      <Route path='/settings/add-users' exact element={<AddUsers/>}></Route>
      <Route path='/settings/add-cast-category' exact element={<AddCastCategory/>}></Route>
      <Route path='/settings/add-concession' exact element={<AddConcession/>}></Route>
      <Route path='/help' exact element={<Help/>}></Route>
    </Routes>
    ) :  (<Routes>
      <Route index element={<Login onLogin={handleLogin}/>} />
    </Routes>
  )}
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
