import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import campaignsReducer from "./SuperAdmin/campContentSlice";
import suUserManageReducer from "./SuperAdmin/userManagementSlice";
import courseReducer from "./SuperAdmin/cousesManageSlice";
import pocUserManage from "./POC/userManagePocSlice";
import alertsReducer from "./alertsSlice";
import filesManageReducer from "./firebase/courseManageSlice";
import usersForm from "./usersFormSlice";
import wavesForm from "./POC/waveFormSlice";
import contentManagePoc from "./POC/contentManagePocSlice";
import learningPlanReducer from "./POC/learningPlanSlice";
import assignmentReducer from "./POC/assignmentSlice";
import analyticsPocReducer from "./POC/analyticsPocSlice";
import meetingsManage from "./POC/meetingSlice";
import LearningAgentReducer from "./User/coursesAgentSlice";
import learningViewerReducer from "./Viewer/coursesViewerSlice";
import contentViewerCourseSlice from "./Viewer/contentViewerCourseSlice";
import responsiveReducer from "./responsiveSlice";

export const store = configureStore({
	reducer: {
		login: loginReducer,
		alerts: alertsReducer,
		usrForm: usersForm,
		wavesForm: wavesForm,
		campaigns: campaignsReducer,
		usrManage: suUserManageReducer,
		courses: courseReducer,
		usrManagePoc: pocUserManage,
		fileManageFB: filesManageReducer,
		learningP: learningPlanReducer,
		contentManagePoc,
		meetingsManage,
		assignment: assignmentReducer,
		analyticsPoc: analyticsPocReducer,
		agentLearning: LearningAgentReducer,
		responsive: responsiveReducer,
		viewerLearning: learningViewerReducer,
		viewerCourse: contentViewerCourseSlice,
	},
});

export default store;
