const initialState = {
    allWorkPlan: null,
    countDocs: null,
    userPlans: null
}

const workPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_WORK_PLAN": {
            return {
                ...state,
                allWorkPlan: [...action.payload]
            }
        }
        case "ADD_WORK_PLAN": {
            return {
                ...state,
                allWorkPlan: [...state.allWorkPlan, action.payload]
            }
        }

        case "UPDATE_WORK_PLAN": {
            const arr = [...state.allWorkPlan]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.workplan[0]._id) {

                    arr[i] = action.workplan[0]
                }
            }
            return { ...state, allWorkPlan: [...arr] }
        }

        case "COUNT_WORK_PLAN": {
            // const arr = [...state.countDocs];
            // for (var i = 0; i < arr.length; i++) {
            //     if (arr[i]._id === action.payload[0]._id) {
            //         arr[i] = action.payload[0]
            //     }
            //     else {
            //         arr = [...countDocs]
            //     }
            // }
            return {
                ...state,
                countDocs: action.payload,
            }
        }

        // case "SPECIFIC_WORK_PLAN": {
        //     // if (action.payload) {
        //         return {
        //             ...state,
        //             userPlans: [action.payload, ...state.userPlans]
        //         }
        //     // }
        //     // else {
        //     //     return {
        //     //         ...state,
        //     //         userPlans: null,
        //     //     }
        //     // }
        //     // return {
        //     //     ...state,
        //     //     countDocs: action.payload,
        //     // }
        // }

        default: {
            return state;
        }
    }
}

export default workPlanReducer;