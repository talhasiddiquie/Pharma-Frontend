const initialState = {
    allApprovelWorkPlan: null,
}

const workPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_APPROVED_WORK_PLAN": {
            return {
                ...state,
                allApprovelWorkPlan: [...action.payload]
            }
        }
        case "ADD_APPROVED_WORK_PLAN": {
            return {
                ...state,
                allApprovelWorkPlan: [...state.allApprovelWorkPlan , action.payload]
            }
        }

        case "UPDATE_APPROVED_WORK_PLAN": {
            const arr = [...state.allApprovelWorkPlan]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.workplan[0]._id) {

                    arr[i] = action.workplan[0]
                }
            }
            return { ...state, allApprovelWorkPlan: [...arr] }
        }

        default: {
            return state;
        }
    }
}

export default workPlanReducer;