import { configureStore } from "@reduxjs/toolkit";
import ContentSlice from "./ContentSlice";
import mtsuiteAPI from "./api/coreSplitApi";
import { authApi } from "./api/authApi";
import {designationApi} from "./api/designationApi"
import { scheduleApi } from "./api/scheduleApi";
import { userApi } from "./api/userApi";
import NotificationSlice from "./NotificationSlice";
import PayloadSlice from "./PayloadSlice";
import ScheduleSlice from "./ScheduleSlice";
import EmployeeViewSlice from "./EmployeeViewSlice";
import LoginSlice from "./LoginSlice";

export const store =  configureStore({
    reducer: {
        contentControls: ContentSlice,
        notificationControls: NotificationSlice,
        payloadControls: PayloadSlice,
        scheduleControls: ScheduleSlice,
        employeeViewControls: EmployeeViewSlice,
        loginControls: LoginSlice,
        [mtsuiteAPI.reducerPath]: mtsuiteAPI.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [designationApi.reducerPath]: designationApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [scheduleApi.reducerPath]: scheduleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([mtsuiteAPI.middleware, authApi.middleware, designationApi.middleware, userApi.middleware, scheduleApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch