import { ApiService } from "../utilities/Api.service";
const dashboardURL = {
    name:"dashboard-analytic",
}
const getDashboardAnalytic = ()=>{
    const response = ApiService.get(dashboardURL.name);
    return response;
}
export const DashboardService = {
    getDashboardAnalytic,
}