import express from "express";
import expressFileUpload from "express-fileupload";
import handlebars from "express-handlebars";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import route from "./resources/directions/route/routeIndex.js";
import dbConnect from "./resources/database/database.js";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

//Static file in path: src/resources/public
app.use("/files", express.static(path.join(__dirname, "resources/files")));

//POST Method [body]
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Morgan
app.use(morgan("tiny"));

//HandleBars
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/directions/views"));

// Express file upload
// app.use(expressFileUpload());

// Routes
route(app);

// Server start
(async function start() {
	//Database
	await dbConnect();

	// Server listening
	app.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`);
	});
})();
