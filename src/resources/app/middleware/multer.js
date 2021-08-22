import { Router } from "express";
import sass from "node-sass";
import multer from "multer";
import CdnDB from "../../database/schema/cdn.js";
import General from "./general.js";
import minify from "@node-minify/core";
import cleanCSS from "@node-minify/clean-css";
import uglifyjs from "@node-minify/uglify-js";

const router = Router();
const storage = multer.diskStorage({
	destination: async function (req, file, cb) {
		const path = `src/resources/files/cdn/${req.body.projectName}`;

		await General.checkAndCreateDirectory(path);
		cb(null, path);
	},
	filename: function (req, file, cb) {
		cb(null, req.body.jsFileName || req.body.cssFileName);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1 * 1024 ** 2,
		files: 1,
	},
	// check and save file
	fileFilter: function fileFilter(req, file, cb) {
		const fileOriginalName = file.originalname;
		if (!fileOriginalName) {
			cb(null, false);
			return;
		}

		const fileFormat = fileOriginalName.includes(".")
			? fileOriginalName.split(".").pop()
			: "";
		if (!(fileFormat === "js") && !(fileFormat === "css")) {
			cb(null, false);
			return;
		}
		cb(null, true);
	},
});

// create file properties in database
router.post(
	"/",
	upload.fields([
		{ name: "jsFile", maxCount: 1 },
		{ name: "cssFile", maxCount: 1 },
	]),
	async function (req, res, next) {
		if (!req.files) return;
		if (!req.body) return;
		if (!req.body.projectName) return;
		if (!req.body.dataSelect) return;
		console.log("uploadfile is Checking...");

		const body = req.body;
		const projectName = body.projectName;
		const projectDesc = body.projectDesc;
		const dataFormatUpload = body.dataSelect;
		const jsFile = req.files ? (req.files.jsFile ? req.files.jsFile[0] : "") : "";
		const cssFile = req.files ? (req.files.cssFile ? req.files.cssFile[0] : "") : "";
		const cdnIsExistDB = await CdnDB.exists({ name: projectName });

		if (jsFile) {
			if (cdnIsExistDB) {
				CdnDB.updateOne(
					{ name: projectName },
					{
						jsFileName: jsFile.filename,
						jsFileSize: jsFile.size,
						jsFileCdn: `http://localhost:4000/files/cdn/${projectName}/${jsFile.filename}`,
					},
					function (err, result) {
						console.log("updated cdn db [js]");
						if (err) throw err;
					}
				);
			} else {
				const newCdnDb = {
					name: projectName,
					desc: projectDesc,
					jsFileName: jsFile.filename,
					jsFileSize: jsFile.size,
					jsCdn: `http://localhost:4000/files/cdn/${projectName}/${jsFile.filename}`,
				};
				await CdnDB.create(newCdnDb, function (err, result) {
					console.log("created new cdn db [js]");
					if (err) throw err;
				});
			}

			// compress js file
			minify({
				compressor: uglifyjs,
				input: jsFile.path,
				output: jsFile.path,
				callback: function (err, min) {
					if (err) throw err;
				},
			});

			return;
		}

		if (cssFile) {
			if (cdnIsExistDB) {
				CdnDB.updateOne(
					{ name: projectName },
					{
						cssFileName: cssFile.filename,
						cssFileSize: cssFile.size,
						cssCdn: `http://localhost:4000/files/cdn/${projectName}/${cssFile.filename}`,
					},
					function (err, result) {
						console.log("updated cdn db [css]");
						if (err) throw err;
					}
				);
			} else {
				const newCdnDb = {
					name: projectName,
					desc: projectDesc,
					cssFileName: cssFile.filename,
					cssFileSize: cssFile.size,
					cssCdn: `http://localhost:4000/files/cdn/${projectName}/${cssFile.filename}`,
				};
				CdnDB.create(newCdnDb, function (err, result) {
					console.log("created new cdn db [css]");
					if (err) throw err;
				});
			}

			// compress js file
			minify({
				compressor: cleanCSS,
				input: cssFile.path,
				output: cssFile.path,
				callback: function (err, min) {
					if (err) throw err;
				},
			});
		}
	}
);

export default router;
