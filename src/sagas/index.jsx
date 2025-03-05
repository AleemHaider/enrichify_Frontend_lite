import { all } from "redux-saga/effects";
import watchAuth from "../redux/auth";
import watchHome from "../redux/home";
import watchProjects from "../redux/projects";
import watchClientAuth from "../redux/client-redux/auth";
import watchDashboard from "../redux/client-redux/dashboard";
export default function* rootSagas() {
    yield all([
        watchAuth(),
        watchHome(),
        watchProjects(),

        watchClientAuth(),
        watchDashboard(),
    ])
}