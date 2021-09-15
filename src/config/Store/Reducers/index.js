import { combineReducers } from "redux";
import userReducer from "./user.reducers";
import themeReducer from "./theme.reducers";
import companyReducer from "./company.reducers";
import regionReducer from "./region.reducer";
import zoneReducer from "./zone.reducers";
import territoryReducer from "./territory.reducers";
import cityReducer from "./city.reducers";
import bricksReducer from "./brick.reducer";
import qulificationsReducer from "./qulification.reducers";
import provinceReducer from "./province.reducers";
import specialityReducer from "./speciality.reducers";
import designationReducer from "./designation.reducer";
import hospitalReducer from "./hospital.reducers";
import sellingPitchReducer from "./selling-pitch.reducer";
import productsReducer from "./products.reducer";
import representativeReducer from "./representative.reducers";
import doctorReducer from "./doctor.reducers";
import workPlanReducer from "./workPlan.reducer";
import imageReducer from "./imageUpload.reducers";
import sureveyReducer from "./survey.reducers";
import approvedPlan from "./approvePlan.reducer";
import attachmentsUpload from "./attachmentsUpload.reducer";
import meetingInitiate from "./meetingInitiator.reducers";
import employeeAttance from "./attendaceEmployee.reducer";
import snackBarReducer from "./snackbar.reducers";

const appReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  company: companyReducer,
  region: regionReducer,
  zone: zoneReducer,
  territory: territoryReducer,
  city: cityReducer,
  bricks: bricksReducer,
  qulification: qulificationsReducer,
  province: provinceReducer,
  speciality: specialityReducer,
  designation: designationReducer,
  hospital: hospitalReducer,
  selling: sellingPitchReducer,
  product: productsReducer,
  representative: representativeReducer,
  doctor: doctorReducer,
  workPlan: workPlanReducer,
  image: imageReducer,
  survey: sureveyReducer,
  approvedPlan: approvedPlan,
  attachment: attachmentsUpload,
  meetingsData: meetingInitiate,
  attendance: employeeAttance,
  snackBar: snackBarReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "LOGOUT") {
    state = undefined;
    // localStorage.removeItem("persist:root");
  }

  return appReducer(state, action);
};

export default rootReducer;
