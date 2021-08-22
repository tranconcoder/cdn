import General from "/files/js/general/generalMethods.js";
import ToastMessage from "/files/js/general/toastMessage.js";

const toastMessage = new ToastMessage();
toastMessage.initial();

class UploadMenu extends General {
	layoutUploadMenu = $(".upload-menu__layout");
	uploadMenu = $(".upload-menu");
	uploadMenuBox = $(".upload-menu__box");
	uploadMenuLayout = $(".upload-menu__layout");
	uploadMenuBoxTotalPage = this.updateTotalPage();
	uploadMenuBoxContent = $(".upload-menu__box__content");
	uploadMenuBoxUploadBtn = $$(".upload-menu-button-ctn__upload");
	uploadMenuBoxNextBtns = $$(".upload-menu-button-ctn__next");
	uploadMenuBoxPrevBtns = $$(".upload-menu-button-ctn__prev");
	uploadMenuBoxHideBtns = $$(".upload-menu-button-ctn__hide");
	openUploadMenuBtn = $(".tools-bar__upload-btn");
	closeUploadMenuBtn = $(".upload-menu__box__navbar__close-btn");

	infoPage = $(".upload-menu__box__content__info");
	infoNameProjectInput = $(".upload-menu__box__content__info__form__name");
	infoDescProjectInput = $(".upload-menu__box__content__info__form__desc");
	infoNextBtn = $(".upload-menu-button-ctn__next", this.infoPage);
	infoJsSelectUploadInput = $(
		".upload-menu__box__content__info__form__file-to-upload__js-upload"
	);
	infoCssSelectUploadInput = $(
		".upload-menu__box__content__info__form__file-to-upload__css-upload"
	);

	jsPage = $(".upload-menu__box__content__js-input");
	jsFileNameInput = $(".js-input-handle__input");
	jsFileInput = $("#js-input-file");
	jsFileNameDisplayCtn = $(".js-input-file-name");
	jsFileNameDisplayContent = $(".js-input-file-name p");
	jsFileResetInputBtn = $(".js-input-file-name i");
	jsNextBtn = $(".upload-menu-button-ctn__next", this.jsPage);
	jsNextBtnContent = $(".upload-menu-button-ctn__next p", this.jsPage);

	cssPage = $(".upload-menu__box__content__css-input");
	cssFileNameInput = $(".css-input-handle__input");
	cssFileInput = $("#css-input-file");
	cssFileNameDisplayCtn = $(".css-input-file-name");
	cssFileNameDisplayContent = $(".css-input-file-name p");
	cssFileResetInputBtn = $(".css-input-file-name i");
	cssUploadBtn = $(".css-input-button-ctn__upload");

	uploadingJsItem = $(".uploading-list__item.js");
	uploadingCssItem = $(".uploading-list__item.css");
	uploadingJsItemName = $(".uploading-list__item__info__name", this.uploadingJsItem);
	uploadingCssItemName = $(".uploading-list__item__info__name", this.uploadingCssItem);
	uploadingJsItemProgessBar = $(
		".uploading-list__item__info__progress-bar__current",
		this.uploadingJsItem
	);
	uploadingCssItemProgessBar = $(
		".uploading-list__item__info__progress-bar__current",
		this.uploadingCssItem
	);
	uploadingJsItemDataInfo = $(
		".uploading-list__item__info__upload-info__size",
		this.uploadingJsItem
	);
	uploadingCssItemDataInfo = $(
		".uploading-list__item__info__upload-info__size",
		this.uploadingCssItem
	);
	uploadingJsItemDataInfoPercent = $(
		".uploading-list__item__info__upload-info__percent",
		this.uploadingJsItem
	);
	uploadingCssItemDataInfoPercent = $(
		".uploading-list__item__info__upload-info__percent",
		this.uploadingCssItem
	);
	uploadingJsItemCancelBtn = $(
		".uploading-list__item__cancel-btn-ctn button",
		this.uploadingJsItem
	);
	uploadingCssItemCancelBtn = $(
		".uploading-list__item__cancel-btn-ctn button",
		this.uploadingCssItem
	);

	initial() {
		// bind methods
		this.bindAllMethods.call(this);

		// open and close upload menu
		this.openUploadMenuBtn.addEventListener("click", this.open);
		this.closeUploadMenuBtn.addEventListener("click", this.close);
		this.layoutUploadMenu.addEventListener("click", this.close);

		// choose file [js, css]
		this.jsFileInput.addEventListener("change", this.jsInputFileChoose);
		this.cssFileInput.addEventListener("change", this.cssInputFileChoose);

		// remove current select file with button [js, css]
		this.jsFileResetInputBtn.addEventListener("click", this.jsInputFileReset);
		this.cssFileResetInputBtn.addEventListener("click", this.cssInputFileReset);

		// next button handle [info]
		this.infoNextBtn.addEventListener("click", this.infoNextBtnHandle);

		// next buttons handle [js, css]
		this.uploadMenuBoxNextBtns.forEach((nextBtn) => {
			nextBtn.addEventListener("click", this.nextBtnsHandle);
		});

		// prev buttons handle [js ,css]
		this.uploadMenuBoxPrevBtns.forEach((prevBtn) => {
			prevBtn.addEventListener("click", this.prevBtnsHandle);
		});

		// upload buttons handle
		this.uploadMenuBoxUploadBtn.forEach((uploadBtn) => {
			uploadBtn.addEventListener("click", this.uploadBtnsHandle);
		});

		// hide buttons handle
		this.uploadMenuBoxHideBtns.forEach((hideBtn) => {
			hideBtn.addEventListener("click", this.close);
		});
	}

	open() {
		this.uploadMenu.style.display = "block";
		this.uploadMenuLayout.style.animation = "showUploadMenuLayout ease 0.5s";
		this.uploadMenuBox.style.animation = "showUploadMenuBox ease 0.5s";
	}

	async close() {
		this.uploadMenuLayout.style.animation = "hideUploadMenuLayout ease 0.5s";
		this.uploadMenuBox.style.animation = "hideUploadMenuBox ease 0.5s";
		await this.sleep(400);
		this.uploadMenu.style.display = "none";
	}

	jsInputFileChoose(e) {
		const file = e.target.files[0];
		const fileName = file?.name;
		const fileSize = file?.size;

		if (!(fileSize <= 1024 ** 2)) {
			toastMessage.remove("js-file-format-error");
			toastMessage.create({
				id: "js-file-large-error",
				style: "warning",
				message: "Dung lượng file JS không được vượt mức 1Mb!",
			});
			this.jsFileInput.value = "";
			this.jsFileNameDisplayCtn.style.visibility = "hidden";
			return;
		} else {
			toastMessage.remove("js-file-large-error");
		}
		if (this.getFileFormat(fileName) != "js") {
			toastMessage.create({
				id: "js-file-format-error",
				style: "warning",
				message: 'Chỉ chấp nhận file định dạng ".js"',
			});
			this.jsFileInput.value = "";
			this.jsFileNameDisplayCtn.style.visibility = "hidden";
			return;
		} else {
			toastMessage.remove("js-file-format-error");
		}

		this.jsFileNameDisplayCtn.style.visibility = "visible";
		this.jsFileNameDisplayContent.innerHTML = `file: ${fileName}`;
	}

	cssInputFileChoose(e) {
		const file = e.target.files[0];
		const fileName = file?.name;
		const fileSize = file?.size;

		if (!(fileSize <= 1024 ** 2)) {
			toastMessage.remove("css-file-format-error");
			toastMessage.create({
				id: "css-file-large-error",
				style: "warning",
				message: "Dung lượng file CSS không được vượt mức 1Mb!",
			});
			this.cssFileInput.value = "";
			this.cssFileNameDisplayCtn.style.visibility = "hidden";
			return;
		} else {
			toastMessage.remove("css-file-large-error");
		}
		if (this.getFileFormat(fileName) != "css") {
			toastMessage.create({
				id: "css-file-format-error",
				style: "warning",
				message: 'Chỉ chấp nhận file định dạng ".css"',
			});
			this.cssFileInput.value = "";
			this.cssFileNameDisplayCtn.style.visibility = "hidden";
			return;
		} else {
			toastMessage.remove("css-file-format-error");
		}

		this.cssFileNameDisplayCtn.style.visibility = "visible";
		this.cssFileNameDisplayContent.innerHTML = `file: ${fileName}`;
	}

	jsInputFileReset(e) {
		this.jsFileInput.value = "";
		this.jsFileNameDisplayCtn.style.visibility = "hidden";
	}

	cssInputFileReset(e) {
		this.cssFileInput.value = "";
		this.cssFileNameDisplayCtn.style.visibility = "hidden";
	}

	infoNextBtnHandle(e) {
		const nameProjectInput = this.infoNameProjectInput;
		const descProjectInput = this.infoDescProjectInput;
		const jsSelectChecked = this.infoJsSelectUploadInput.checked;
		const cssSelectChecked = this.infoCssSelectUploadInput.checked;
		let hasError = false;

		// remove next page event when click
		this.infoNextBtn.removeEventListener("click", this.nextBtnsHandle);

		// check form input
		if (!nameProjectInput.value) {
			toastMessage.create({
				id: "info-name-project-input-empty",
				style: "warning",
				message: "Nhập tên dự án để tiếp tục!",
			});
			nameProjectInput.classList.add("fail");
			hasError = true;
		} else {
			nameProjectInput.classList.remove("fail");
			toastMessage.remove("info-name-project-input-empty");
		}
		if (!descProjectInput.value) {
			toastMessage.create({
				id: "info-desc-project-input-empty",
				style: "warning",
				message: "Nhập mô tả dự án để tiếp tục!",
			});
			descProjectInput.classList.add("fail");
			hasError = true;
		} else {
			descProjectInput.classList.remove("fail");
			toastMessage.remove("info-desc-project-input-empty");
		}
		if (!jsSelectChecked && !cssSelectChecked) {
			toastMessage.create({
				id: "info-no-file-select-to-upload",
				style: "warning",
				message: "Chọn ít nhất 1 mục JS hoặc CSS để tiếp tục!",
			});
			hasError = true;
		} else {
			toastMessage.remove("info-no-file-select-to-upload");

			// next btn --> upload btn when css page hided
			if (jsSelectChecked && !cssSelectChecked) {
				this.jsNextBtnContent.innerHTML = "Upload";
				this.jsNextBtn.removeEventListener("click", this.nextBtnsHandle);
				this.jsNextBtn.addEventListener("click", this.uploadBtnsHandle);
			} else {
				this.jsNextBtnContent.innerHTML = "Next";
				this.jsNextBtn.removeEventListener("click", this.uploadBtnsHandle);
				this.jsNextBtn.addEventListener("click", this.nextBtnsHandle);
			}

			if (!jsSelectChecked) {
				this.jsFileNameInput.value = "";
				this.jsFileInput.value = "";
				this.jsFileNameDisplayCtn.style.visibility = "hidden";
				this.jsPage.style.display = "none";
			} else {
				this.jsPage.style.display = "flex";
			}

			if (!cssSelectChecked) {
				this.cssFileNameInput.value = "";
				this.cssFileInput.value = "";
				this.cssFileNameDisplayCtn.style.visibility = "hidden";
				this.cssPage.style.display = "none";
			} else {
				this.cssPage.style.display = "flex";
			}

			// to next page when no error
			this.updateTotalPage();
			if (!hasError) this.nextPage({ smoothScroll: true });
		}
	}

	nextBtnsHandle() {
		this.nextPage();
	}

	prevBtnsHandle() {
		this.prevPage();
	}

	async uploadBtnsHandle(e) {
		const projectName = this.infoNameProjectInput.value;
		const projectDesc = this.infoDescProjectInput.value;
		const jsFile = this.jsFileInput.files[0];
		const cssFile = this.cssFileInput.files[0];
		const jsFileName = this.jsFileNameInput.value;
		const cssFileName = this.cssFileNameInput.value;
		const formDataJs = new FormData();
		const formDataCss = new FormData();
		const ajaxJs = new XMLHttpRequest();
		const ajaxCss = new XMLHttpRequest();
		const dataSelectedToUpload = [jsFile ? "js" : "", cssFile ? "css" : ""];
		let jsUploadEnded = false;
		let cssUploadEnded = false;

		if (!jsFile && !cssFile) {
			toastMessage.create({
				id: "error-no-file",
				style: "warning",
				message: "Vui lòng chọn tối thiểu 1 loại tệp để đăng!",
			});
			return;
		} else {
			toastMessage.remove("error-no-file");
		}
		if (jsFile && !jsFileName) {
			toastMessage.create({
				id: "error-empty-js-file-name",
				style: "warning",
				message: "Vui lòng nhập tên tệp JavaScript!",
			});
			return;
		} else {
			toastMessage.remove("error-empty-js-file-name");
		}
		if (cssFile && !cssFileName) {
			toastMessage.create({
				id: "error-empty-css-file-name",
				style: "warning",
				message: "Vui lòng nhập tên tệp CSS!",
			});
			return;
		} else {
			toastMessage.remove("error-empty-css-file-name");
		}

		this.nextPage();

		if (jsFile) {
			formDataJs.append("projectName", projectName);
			formDataJs.append("projectDesc", projectDesc);
			formDataJs.append("dataSelect", dataSelectedToUpload);
			formDataJs.append(
				"jsFileName",
				function checkFileName() {
					const fileFormat = this.getFileFormat(jsFileName);
					if (!fileFormat) {
						return jsFileName + ".js";
					}
					return jsFileName;
				}.call(this)
			);
			formDataJs.append("jsFile", jsFile);
			this.uploadingJsItemProgessBar.style.width = "0%";
			this.uploadingJsItem.style.display = "flex";
		}
		if (cssFile) {
			formDataCss.append("projectName", projectName);
			formDataCss.append("projectDesc", projectDesc);
			formDataCss.append("dataSelect", dataSelectedToUpload);
			formDataCss.append(
				"cssFileName",
				function checkFileName() {
					const fileFormat = this.getFileFormat(cssFileName);
					if (!fileFormat) {
						return cssFileName + ".css";
					}
					return cssFileName;
				}.call(this)
			);
			formDataCss.append("cssFile", cssFile);
			this.uploadingCssItemProgessBar.style.width = "0%";
			this.uploadingCssItem.style.display = "flex";
		}

		await this.sleep(1000);

		if (jsFile) {
			// event function handle
			const ajaxJsLoadStartEventHandle = (e) => {
				if (jsFile) this.uploadingJsItemName.innerHTML = jsFileName + ".js";

				var uploadingJsItemCancelBtnHandle = () => {
					ajaxJs.abort();
					this.uploadingJsItem.style.display = "none";
					this.uploadingJsItemCancelBtn.removeEventListener(
						"click",
						uploadingJsItemCancelBtnHandle
					);
				};
				this.uploadingJsItemCancelBtn.addEventListener(
					"click",
					uploadingJsItemCancelBtnHandle
				);
			};
			const ajaxJsProgressEventHandle = (e) => {
				if (e.lengthComputable) {
					const currentData = this.convertDataUnit("B", "Kb", e.loaded, 0);
					const totalData = this.convertDataUnit("B", "Kb", e.total, 0);
					const percentData = ((e.loaded / e.total) * 100).toFixed(0);

					this.uploadingJsItemProgessBar.style.width = `${percentData}%`;
					this.uploadingJsItemDataInfo.innerHTML = `${currentData}/${totalData} Kb`;
					this.uploadingJsItemDataInfoPercent.innerHTML = `${percentData}%`;
				}
			};
			const ajaxJsLoadEndEventHandle = async (e) => {
				jsUploadEnded = true;
				checkAndHandleLoadEnded();

				if (cssFile) {
					// event function handle
					const ajaxCssLoadStartEventHandle = (e) => {
						if (cssFile) this.uploadingCssItemName.innerHTML = cssFileName + ".css";

						var uploadingCssItemCancelBtnHandle = () => {
							ajaxCss.abort();
							this.uploadingCssItem.style.display = "none";
							this.uploadingCssItemCancelBtn.removeEventListener(
								"click",
								uploadingCssItemCancelBtnHandle
							);
						};
						this.uploadingCssItemCancelBtn.addEventListener(
							"click",
							uploadingCssItemCancelBtnHandle
						);
					};
					const ajaxCssProgressEventHandle = (e) => {
						if (e.lengthComputable) {
							const currentData = this.convertDataUnit("B", "Kb", e.loaded, 0);
							const totalData = this.convertDataUnit("B", "Kb", e.total, 0);
							const percentData = ((e.loaded / e.total) * 100).toFixed(0);

							this.uploadingCssItemProgessBar.style.width = `${percentData}%`;
							this.uploadingCssItemDataInfo.innerHTML = `${currentData}/${totalData} Kb`;
							this.uploadingCssItemDataInfoPercent.innerHTML = `${percentData}%`;
						}
					};
					const ajaxCssLoadEndEventHandle = (e) => {
						cssUploadEnded = true;
						checkAndHandleLoadEnded();
					};

					ajaxCss.upload.addEventListener("loadstart", ajaxCssLoadStartEventHandle);
					ajaxCss.upload.addEventListener("progress", ajaxCssProgressEventHandle);
					ajaxCss.upload.addEventListener("loadend", ajaxCssLoadEndEventHandle);
					await this.sleep(500);
					ajaxCss.open("POST", `${host}/api/upload`);
					ajaxCss.send(formDataCss);
				} else {
					cssUploadEnded = true;
				}
			};

			ajaxJs.upload.addEventListener("loadstart", ajaxJsLoadStartEventHandle);
			ajaxJs.upload.addEventListener("progress", ajaxJsProgressEventHandle);
			ajaxJs.upload.addEventListener("loadend", ajaxJsLoadEndEventHandle);
			ajaxJs.open("POST", `${host}/api/upload`);
			ajaxJs.send(formDataJs);
		} else {
			jsUploadEnded = true;
		}

		var checkAndHandleLoadEnded = () => {
			if (!jsUploadEnded || !cssUploadEnded) return;
			toastMessage.create({
				id: "upload-menu-upload-finish",
				style: "successfully",
				message: "Tải lên hoàn tất!",
			});
			const resetUploadMenuHandle = async (e) => {
				this.uploadMenuLayout.removeEventListener("click", resetUploadMenuHandle);
				this.closeUploadMenuBtn.removeEventListener("click", resetUploadMenuHandle);
				this.uploadMenuBoxHideBtns[0].removeEventListener(
					"click",
					resetUploadMenuHandle
				);

				await this.sleep(500);
				this.reset();
			};
			this.uploadMenuLayout.addEventListener("click", resetUploadMenuHandle);
			this.closeUploadMenuBtn.addEventListener("click", resetUploadMenuHandle);
			this.uploadMenuBoxHideBtns[0].addEventListener("click", resetUploadMenuHandle);
		};
	}

	toPage(page, option = { smoothScroll: true }) {
		const onePageTransformValue = -((100 / this.uploadMenuBoxTotalPage) * --page);

		if (!option.smoothScroll) {
			this.uploadMenuBoxContent.style.transition = "none";
		} else {
			this.uploadMenuBoxContent.style.transition = "linear 0.3s";
		}
		this.uploadMenuBoxContent.style.transform = `translateX(${onePageTransformValue}%)`;
	}

	nextPage(option = { smoothScroll: true }) {
		const onePageTransformValue = 100 / this.uploadMenuBoxTotalPage;
		const transformValue = this.uploadMenuBoxContent.style.transform;
		const translateXOldValue = Number(
			transformValue.split("(").pop().split("%").shift()
		);
		const translateXNewValue = translateXOldValue - onePageTransformValue;

		if (!option.smoothScroll) {
			this.uploadMenuBoxContent.style.transition = "none";
		} else {
			this.uploadMenuBoxContent.style.transition = "linear 0.3s";
		}
		this.uploadMenuBoxContent.style.transform = `translateX(${translateXNewValue}%)`;
	}

	prevPage(option = { smoothScroll: true }) {
		const onePageTransformValue = 100 / this.uploadMenuBoxTotalPage;
		const transformValue = this.uploadMenuBoxContent.style.transform;
		const translateXOldValue = Number(
			transformValue.split("(").pop().split("%").shift()
		);
		const translateXNewValue = translateXOldValue + onePageTransformValue;

		if (!option.smoothScroll) {
			this.uploadMenuBoxContent.style.transition = "none";
		} else {
			this.uploadMenuBoxContent.style.transition = "linear 0.3s";
		}
		this.uploadMenuBoxContent.style.transform = `translateX(${translateXNewValue}%)`;
	}

	updateTotalPage() {
		this.uploadMenuBoxTotalPage = $$(
			`.upload-menu__box__content > *:not([style="display: none;"])`,
			this.uploadMenuBox
		).length;
		return this.uploadMenuBoxTotalPage;
	}

	reset() {
		this.uploadMenuBox.reset();
		this.infoNameProjectInput.value = "";
		this.infoDescProjectInput.value = "";
		this.jsFileNameInput.value = "";
		this.cssFileNameInput.value = "";
		this.jsFileNameDisplayCtn.style.visibility = "hidden";
		this.cssFileNameDisplayCtn.style.visibility = "hidden";
		this.jsFileNameDisplayContent.innerHTML = "";
		this.cssFileNameDisplayContent.innerHTML = "";
		this.uploadingCssItem.style.display = "none";
		this.uploadingJsItem.style.display = "none";
		this.uploadingJsItemDataInfo.innerHTML = "";
		this.uploadingCssItemDataInfo.innerHTML = "";
		this.uploadingJsItemDataInfoPercent.innerHTML = "";
		this.uploadingCssItemDataInfoPercent.innerHTML = "";
		this.toPage(1, { smoothScroll: false });
	}

	bindAllMethods() {
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		methods.forEach((method) => {
			this[method] = this[method].bind(this);
		});
	}
}

class ToolsList extends General {
	toolsList = $(".tools-list");

	async initital() {
		this.toolsItems = await fetch(`${host}/api/get-all-cdn`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => data);

		// bind all method
		this.bindAllMethods();

		// render tools list items
		this.render();
	}

	render() {
		this.toolsItems.forEach((toolsItem) => {
			const newItem = document.createElement("div");
			newItem.className = "tools-item-wrapper col";
			newItem.innerHTML = `
				<div class="tools-item">
					<h2>${toolsItem.name}</h2>
					<div class="button-ctn">
						<button
						data-cdn="${toolsItem.jsCdn}"
						style=${toolsItem.jsCdn ? `"display: block"` : `"display: none"`}>
							Copy JS Link
						</button>

						<button
						data-cdn="${toolsItem.cssCdn}"
						style=${toolsItem.cssCdn ? `"display: block"` : `"display: none"`} >
							Copy CSS Link
						</button>
					</div>
				</div>
			`;

			const newItemJsBtn = $("button:first-child", newItem);
			const newItemCssBtn = $("button:last-child", newItem);

			newItemJsBtn.addEventListener("click", (e) => {
				navigator.clipboard.writeText(e.target.dataset.cdn);
			});

			newItemCssBtn.addEventListener("click", (e) => {
				navigator.clipboard.writeText(e.target.dataset.cdn);
			});
			this.toolsList.appendChild(newItem);
		});
	}

	bindAllMethods() {
		const methodsName = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		methodsName.forEach((methodName) => {
			this[methodName].bind(this);
		});
	}
}

const toolsList = new ToolsList();
const uploadMenu = new UploadMenu();
toolsList.initital();
uploadMenu.initial();
