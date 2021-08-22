import CdnDB from "../../database/schema/cdn.js";

class Api {
	async getAllCdns(req, res) {
		const cdns = await CdnDB.find({});
		res.json(cdns);
	}
}

export default new Api();
