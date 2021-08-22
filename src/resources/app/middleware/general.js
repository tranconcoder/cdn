import fs from "fs";

class General {
	async checkAndCreateDirectory(path) {
		const directoryArr = path.split("/");
		let currentPath = "";

		await directoryArr.forEach((directory, index) => {
			if (index === 0) {
				currentPath += directory;
			} else {
				currentPath += `/${directory}`;
			}

			if (!fs.existsSync(currentPath)) {
				fs.mkdirSync(currentPath);
			}
		});
	}
}

export default new General();
