import routeApi from "./routeApi.js";
import routeHome from "./routeHome.js";

function Router(app) {
	app.use("/api", routeApi);
	app.use("/", routeHome);
}

export default Router;
