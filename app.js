const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const http = require("http")
const logger = require("morgan");
const path = require("path");
const PORT = 6000;
const swaggerUi = require("swagger-ui-express");
const env = require("./config/env")();


var indexRouter = require("./routes/index");
var profileRoute = require("./routes/profileRoutes");


var __dirname = path.resolve();
var app = express();
// ROUTES Path
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static("public"));
app.use((req, res, next) => {
	// //Enabling CORS
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
	next();
});

var swaggerOptions = {
	explorer: true,
	swaggerOptions: {
		urls: [
			{
				url: "/documentation",
				name: "API"
			},
			{
				url: "/documentation-admin",
				name: "API - Admin"
			}
		]
	}
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));
app.use("/", indexRouter);

app.use("/profile", profileRoute)



require("./dbConnection").connectDB();
app.use((req, res, next) => {
	if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
		return res.sendStatus(204);
	}
	return next();
});

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});
app.options("/*", cors()); // enable pre-flight request for DELETE request
// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	console.log(err);
	// render the error page
	res.status(err.status || 500);
	res.render("404", { baseUrl: env.APP_URLS.API_URL });
});
module.exports = app;