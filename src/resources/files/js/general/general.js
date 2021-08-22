const httpMethod = "http";
const domain = "localhost";
const port = 4000;
const host = `${httpMethod}://${domain}:${port}`;

const $ = (cssSelector, toBind = document) => {
	return toBind.querySelector(cssSelector);
};
const $$ = (cssSelector, toBind = document) => {
	return toBind.querySelectorAll(cssSelector);
};
