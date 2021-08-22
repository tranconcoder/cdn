import General from "/files/js/general/generalMethods.js";

class ToastMessage extends General {
	bodyHtml = $("body");
	icons = {
		cancelIcon: `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 409.806 409.806" fill="#808080" style="enable-background:new 0 0 409.806 409.806;" xml:space="preserve"><g><g><path d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42 c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42 c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132 c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42 c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`,
		messageIcon: `
            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#e3f8fa"/><path d="m256 128c-70.574219 0-128 57.425781-128 128s57.425781 128 128 128 128-57.425781 128-128-57.425781-128-128-128zm0 53.328125c5.886719 0 10.671875 4.769531 10.671875 10.671875s-4.785156 10.671875-10.671875 10.671875-10.671875-4.769531-10.671875-10.671875 4.785156-10.671875 10.671875-10.671875zm24 149.34375h-48c-5.886719 0-10.671875-4.785156-10.671875-10.671875s4.769531-10.671875 10.671875-10.671875h13.328125v-64h-8c-5.886719 0-10.671875-4.785156-10.671875-10.671875s4.785156-10.65625 10.671875-10.65625h18.671875c5.886719 0 10.671875 4.785156 10.671875 10.671875v74.671875h13.328125c5.886719 0 10.671875 4.785156 10.671875 10.671875 0 5.871094-4.785156 10.65625-10.671875 10.65625zm0 0" fill="#00B7FF"/></svg>`,
		successfullyIcon: `
            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#cfffcc"/><path d="m231.535156 330.960938c-2 2-4.703125 3.117187-7.535156 3.117187s-5.535156-1.117187-7.535156-3.117187l-60.242188-60.242188c-6.253906-6.253906-6.238281-16.382812 0-22.621094l7.539063-7.539062c6.253906-6.253906 16.382812-6.253906 22.621093 0l37.601563 37.601562 101.601563-101.601562c6.253906-6.253906 16.382812-6.253906 22.621093 0l7.535157 7.539062c6.257812 6.253906 6.257812 16.382813 0 22.621094zm0 0" fill="#2dde23"/></svg>`,
		warningIcon: `
            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#fff9dd"/><path d="m256 128c-70.574219 0-128 57.425781-128 128s57.425781 128 128 128 128-57.425781 128-128-57.425781-128-128-128zm0 202.671875c-5.886719 0-10.671875-4.769531-10.671875-10.671875 0-5.886719 4.769531-10.671875 10.671875-10.671875 5.886719 0 10.671875 4.769531 10.671875 10.671875 0 5.886719-4.785156 10.671875-10.671875 10.671875zm10.671875-53.34375c0 5.902344-4.785156 10.671875-10.671875 10.671875s-10.671875-4.785156-10.671875-10.671875v-85.328125c0-5.886719 4.785156-10.671875 10.671875-10.671875s10.671875 4.785156 10.671875 10.671875zm0 0" fill="#ffd200"/></svg>`,
		errorIcon: `
            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-320c-53.023438 0-96-42.976562-96-96v-320c0-53.023438 42.976562-96 96-96h320c53.023438 0 96 42.976562 96 96v320c0 53.023438-42.976562 96-96 96zm0 0" fill="#ffe6e2"/><path d="m256 128c-70.574219 0-128 57.425781-128 128s57.425781 128 128 128 128-57.425781 128-128-57.425781-128-128-128zm47.136719 160.0625c4.160156 4.160156 4.160156 10.914062 0 15.089844-2.082031 2.078125-4.816407 3.121094-7.535157 3.121094-2.722656 0-5.457031-1.042969-7.539062-3.121094l-32.0625-32.0625-32.0625 32.0625c-2.082031 2.078125-4.816406 3.121094-7.539062 3.121094-2.734376 0-5.453126-1.042969-7.535157-3.121094-4.160156-4.160156-4.160156-10.914063 0-15.089844l32.046875-32.0625-32.0625-32.0625c-4.160156-4.160156-4.160156-10.914062 0-15.089844 4.160156-4.175781 10.914063-4.160156 15.089844 0l32.0625 32.0625 32.0625-32.0625c4.160156-4.160156 10.914062-4.160156 15.089844 0 4.175781 4.160156 4.160156 10.914063 0 15.089844l-32.0625 32.0625zm0 0" fill="#fc573b"/></svg>`,
	};

	toastMessageContainer = $(".toast-message");
	toastMessageList = $(".toast-message__list");
	toastMessageItems = $$(".toast-message__list__item");
	toastMessageCloseAllBtn = $(".toast-message__close-all");

	initial() {
		this.checkDefaultHTML();
		this.resetVariables();
	}

	resetVariables() {
		this.toastMessageContainer = $(".toast-message");
		this.toastMessageList = $(".toast-message__list");
		this.toastMessageItems = $$(".toast-message__list__item");
		this.toastMessageCloseAllBtn = $(".toast-message__close-all");
	}

	checkDefaultHTML() {
		if (!this.toastMessageContainer) {
			this.toastMessageContainer = document.createElement("div");
			this.toastMessageContainer.className = "toast-message";
			this.toastMessageContainer.innerHTML = `
                <ul class="toast-message__list"></ul>
                <div class="toast-message__close-all">
                    <img class="toast-message__close-all__icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDM4NCAzODQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik02NCwzNDEuMzMzQzY0LDM2NC45MDcsODMuMDkzLDM4NCwxMDYuNjY3LDM4NGgxNzAuNjY3QzMwMC45MDcsMzg0LDMyMCwzNjQuOTA3LDMyMCwzNDEuMzMzdi0yNTZINjRWMzQxLjMzM3oiIGZpbGw9IiNmZjQ0NDQiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCQkJPHBvbHlnb24gcG9pbnRzPSIyNjYuNjY3LDIxLjMzMyAyNDUuMzMzLDAgMTM4LjY2NywwIDExNy4zMzMsMjEuMzMzIDQyLjY2NywyMS4zMzMgNDIuNjY3LDY0IDM0MS4zMzMsNjQgMzQxLjMzMywyMS4zMzMgICAgIiBmaWxsPSIjZmY0NDQ0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BvbHlnb24+CgkJPC9nPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=">
                    <div class="toast-message__close-all__label">Xóa tất cả</div>
                </div>
            `;
			this.bodyHtml.appendChild(this.toastMessageContainer);
		}
		this.resetVariables();
	}

	async create({ id, style, message }, callback) {
		// check message id exist
		if (this.checkMessageExist(id)) {
			const messageExisted = this.getMessage(id);
			messageExisted.style.trasition = "ease .1s";
			messageExisted.style.transform = "translateY(-0.4rem)";
			await this.sleep(100);
			messageExisted.style.transform = "translateY(0)";
			if (callback) callback();
			return;
		}

		// create and append new message
		const newMessage = document.createElement("li");
		newMessage.className = `toast-message__list__item ${style}`;
		newMessage.setAttribute("toast-message-id", id);
		newMessage.innerHTML = `
            <div class="toast-message__list__item__icon"></div>
            <div class="toast-message__list__item__message">
                <p class="toast-message__list__item__message__content">
                    ${message}
                </p>
            </div>
            <div class="toast-message__list__item__action">
                <button class="toast-message__list__item__action__cancel-btn">
                    ${this.icons.cancelIcon}
                </button>
            </div>
            <div class="toast-message__list__item__seperate-bar"></div>
        `;
		this.toastMessageList.appendChild(newMessage);

		// set style and event new message
		const newMessageIcon = newMessage.querySelector(`.toast-message__list__item__icon`);
		const newMessageCloseBtn = newMessage.querySelector(
			`.toast-message__list__item__action__cancel-btn`
		);
		newMessageCloseBtn.addEventListener("click", this.remove.bind(this, id));
		switch (style) {
			case "message":
				newMessageIcon.innerHTML = this.icons.messageIcon;
				break;
			case "successfully":
				newMessageIcon.innerHTML = this.icons.successfullyIcon;
				break;
			case "warning":
				newMessageIcon.innerHTML = this.icons.warningIcon;
				break;
			case "error":
				newMessageIcon.innerHTML = this.icons.errorIcon;
				break;
		}

		this.toastMessageContainerHandle();
		this.toastMessageCloseAllBtnHandle();
	}

	async remove(id) {
		const message = this.getMessage(id);

		if (message) {
			message.style.animation = "hideToastMessageItem ease 0.5s";
			await this.sleep(500);
			message.remove();

			this.toastMessageContainerHandle();
			this.toastMessageCloseAllBtnHandle();
		}
	}

	checkMessageExist(id) {
		if (this.getMessage(id)) {
			return true;
		}
		return false;
	}

	toastMessageContainerHandle() {
		if (this.getMessageCount() === 0) {
			this.toastMessageContainer.style.visibility = "hidden";
		} else {
			this.toastMessageContainer.style.visibility = "visible";
		}
	}

	toastMessageCloseAllBtnHandle() {
		async function closeAllBtnClickHandle(e) {
			this.toastMessageCloseAllBtn.style.visibility = "hidden";
			this.toastMessageItems.forEach((toastMessageItem) => {
				const id = toastMessageItem.getAttribute("toast-message-id");
				this.remove(id);
			});
		}
		closeAllBtnClickHandle = closeAllBtnClickHandle.bind(this);

		if (this.getMessageCount() > 1) {
			this.toastMessageCloseAllBtn.style.visibility = "visible";
			this.toastMessageCloseAllBtn.addEventListener("click", closeAllBtnClickHandle);
		} else {
			this.toastMessageCloseAllBtn.style.visibility = "hidden";
			this.toastMessageCloseAllBtn.removeEventListener(
				"click",
				closeAllBtnClickHandle
			);
		}
	}

	getMessageCount() {
		this.resetVariables();
		return this.toastMessageItems.length;
	}

	getMessage(id) {
		return $(`.toast-message__list__item[toast-message-id="${id}"]`);
	}
}

export default ToastMessage;
