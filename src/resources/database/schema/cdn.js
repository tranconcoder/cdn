import mongoose from "mongoose";
const { Schema } = mongoose;

const CdnDB = new Schema({
	name: { type: String, default: "", maxLength: 64 },
	desc: { type: String, default: "", maxLength: 255 },
	jsFileName: { type: String, default: "", maxLength: 255 },
	cssFileName: { type: String, default: "", maxLength: 255 },
	jsFileSize: { type: Number, default: "", max: 1 * 1024 ** 2 },
	cssFileSize: { type: Number, default: "", max: 1 * 1024 ** 2 },
	jsCdn: { type: String, default: "" },
	cssCdn: { type: String, default: "" },
});

export default mongoose.model("Cdns", CdnDB);
