class GeneralMethods {
	sleep(time) {
		// authenticate
		{
			if (!time) {
				console.error("'General.wait' method: need a 'time' parameter!");
				return;
			} else {
				if (typeof time != "number") {
					console.error(
						"'General.wait' method: the type of 'time' parameter is not 'number'!"
					);
					return;
				}
			}
		}

		// process
		return new Promise((done) => {
			setTimeout(() => {
				done();
			}, time);
		});
	}

	getLocalTime() {
		const localTime = new Date(Date.now());
		let localSecond = localTime.getSeconds();
		let localMilliSecond = localTime.getMilliseconds();
		let localMinutes = localTime.getMinutes();
		let localHours = localTime.getHours();
		let localDate = localTime.getDate();
		let localMonth = localTime.getMonth() + 1;
		let localYear = localTime.getFullYear();
		let localDayOfWeek;

		if (localTime.getDay() === 0) {
			localDayOfWeek = "CN";
		} else {
			localDayOfWeek = `T${localTime.getDay() + 1}`;
		}

		return `${localHours}:${localMinutes}:${localSecond}:${localMilliSecond} - ${localDayOfWeek} ${localDate}/${localMonth}/${localYear} GMT+7`;
	}

	async loggedCheck() {
		let result = "not Checked!";
		await fetch("/api/logged-check", {
			method: "OPTIONS",
		})
			.then((response) => response.json())
			.then((checkResult) => {
				result = checkResult;
			});
		return result;
	}

	async getUserInfomation() {
		let userInfo = "no Getting!";
		await fetch("/api/get-user")
			.then((response) => response.json())
			.then((user) => {
				userInfo = user;
			});

		return userInfo;
	}

	convertDataUnit(from, to, value, fixed = 16) {
		const units = ["B", "Kb", "Mb", "Gb"];
		const fromUnitIndex = units.indexOf(from);
		const toUnitIndex = units.indexOf(to);

		if (fromUnitIndex - toUnitIndex === 0) {
			return value.toFixed(fixed);
		}

		if (fromUnitIndex - toUnitIndex < 0) {
			return (value / 1024 ** -(fromUnitIndex - toUnitIndex)).toFixed(fixed);
		}

		return (value * 1024 ** (fromUnitIndex - toUnitIndex)).toFixed(fixed);
	}

	getFileFormat(fileName) {
		if (!fileName.includes(".")) return;
		return fileName.split(".").pop();
	}
}

export default GeneralMethods;
