import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./protectedRoute";

// Auth
import Login from "../../screens/auth/login/login";

import ForgotPassword from "../../screens/auth/forgotpassword/ForgotPassword";
// Authed/Dashboard
import Dashboard from "../../screens/authed/dashboard/dashboard";

// Authed/Meetings
import MeetingInitiate from "../../screens/authed/meetings/initiate-meetings/meetingForm";
import ChamberMeeting from "../../screens/authed/meetings/ChamberMeeting/chamberMeeting";
import OnlineMeeting from "../../screens/authed/meetings/OnlineMeeting/onlineMeetings";

// Authed/Event-Parameters
import Events from "../../screens/authed/events-parameters/events/Calender";
import TourPlan from "../../screens/authed/events-parameters/tour-plan/TourPlan";

// Authed/Vertical-Settings
import VerticalGroupCompany from "../../screens/authed/vertical-settings/vertical-group-company/vertical-group-company";
import Region from "../../screens/authed/vertical-settings/region/region";
import Zone from "../../screens/authed/vertical-settings/zone/zone";
import Territory from "../../screens/authed/vertical-settings/territory/territory";
import City from "../../screens/authed/vertical-settings/city/city";
import Brick from "../../screens/authed/vertical-settings/brick/brick";
import ClinicHospital from "../../screens/authed/vertical-settings/clinic-hospital/clinic-hospital";

//Authed/Business-Parameters
import Doctor from "../../screens/authed/business-parameters/doctor/doctor";
import Representative from "../../screens/authed/business-parameters/representative/representative";
import Product from "../../screens/authed/business-parameters/product/product";
import AddSellingPitch from "../../screens/authed/business-parameters/add-sellling-pitch/add-selling-pitch";
import AddSurvey from "../../screens/authed/business-parameters/add-survey/add-survey";

//Authed/Reports-Parameters
import DoctorReport from "../../screens/authed/reports-parameters/doctorReport/doctorReport";
import EmployeesReport from "../../screens/authed/reports-parameters/employeeReport/employeeReport";
import KPIReport from "../../screens/authed/reports-parameters/kpiReport/kpiReport";
import CallsReports from "../../screens/authed/reports-parameters/callReport/callReport";
import AttendaceReports from "../../screens/authed/reports-parameters/attendanceReport/attendanceReport";

// Doctor Meeting Public
import DoctorInitiate from "../../screens/doctor-meeting-public/doctorInitiate";
import DoctorMeeting from "../../screens/doctor-meeting-public/doctorMeeting";
import EmailVerificationCode from "../../screens/auth/emailVerificationCode/EmailVerificationCode";
import Updatepassword from "../../screens/auth/updatePassword/Updatepassword";
import Province from "../../screens/authed/vertical-settings/province/province";
function Routes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route
        exact
        path="/emailverificationcode"
        component={EmailVerificationCode}
      />

      <Route exact path="/updatepassword" component={Updatepassword} />
      <Route exact path="/doctor-initiate" component={DoctorInitiate} />
      <Route exact path="/doctor-meeting/:id" component={DoctorMeeting} />

      {/* Private Routes */}
      {/* Private Routes / ‎Dashboard */}

      <PrivateRoute exact path="/dashboard" component={Dashboard} />

      {/* Private Routes / ‎Events Paramters */}

      <PrivateRoute exact path="/events-parameters/events" component={Events} />
      <PrivateRoute
        exact
        path="/events-parameters/tourPlan"
        component={TourPlan}
      />

      {/* Private Routes / ‎Meeting Paramters */}

      <PrivateRoute
        exact
        path="/meetings-parameters/initiate-meetings"
        component={MeetingInitiate}
      />
      <PrivateRoute
        exact
        path="/meetings-parameters/chamber-meeting/:id"
        component={ChamberMeeting}
      />
      <PrivateRoute
        exact
        path="/meetings-parameters/online-meeting/:id"
        component={OnlineMeeting}
      />

      {/* Private Routes / ‎Reprts Paramters */}

      {/* <PrivateRoute exact path='/reports-parameters/reports' component={Reports} /> */}
      <PrivateRoute
        exact
        path="/reports-parameters/doctorReport"
        component={DoctorReport}
      />
      <PrivateRoute
        exact
        path="/reports-parameters/employeesReport"
        component={EmployeesReport}
      />
      <PrivateRoute
        exact
        path="/reports-parameters/kpiReport"
        component={KPIReport}
      />
      <PrivateRoute
        exact
        path="/reports-parameters/callsReport"
        component={CallsReports}
      />
      <PrivateRoute
        exact
        path="/reports-parameters/attendanceReport"
        component={AttendaceReports}
      />

      {/* Private Routes / ‎Vertical Settings */}
      {/* {user !== null && user.role === 'admin' ? */}
      {/* //     :
            //     null
            // }
            // {user !== null && user.role === 'admin' ? */}

      <PrivateRoute
        exact
        path="/vertical-settings/vertical-group-company"
        component={VerticalGroupCompany}
      />
      <PrivateRoute
        exact
        path="/vertical-settings/province"
        component={Province}
      />
      <PrivateRoute exact path="/vertical-settings/region" component={Region} />
      <PrivateRoute exact path="/vertical-settings/zone" component={Zone} />
      <PrivateRoute
        exact
        path="/vertical-settings/territory"
        component={Territory}
      />
      <PrivateRoute exact path="/vertical-settings/city" component={City} />
      <PrivateRoute exact path="/vertical-settings/brick" component={Brick} />
      <PrivateRoute
        exact
        path="/vertical-settings/clinic-hospital"
        component={ClinicHospital}
      />

      {/* Private Routes / ‎Business Paramters */}
      <PrivateRoute
        exact
        path="/business-parameters/doctor"
        component={Doctor}
      />
      <PrivateRoute
        exact
        path="/business-parameters/representative"
        component={Representative}
      />
      <PrivateRoute
        exact
        path="/business-parameters/product"
        component={Product}
      />
      <PrivateRoute
        exact
        path="/business-parameters/add-selling-pitch"
        component={AddSellingPitch}
      />
      <PrivateRoute
        exact
        path="/business-parameters/add-survey"
        component={AddSurvey}
      />
    </Switch>
  );
}

export default Routes;
