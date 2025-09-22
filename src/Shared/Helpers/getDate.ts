export function getDate(date: Date | string | number) {
	if (typeof date !== "object") {
		date = new Date(+date);
	}
	return date.toLocaleDateString();
}

export function getDateYYYY_MM_DD(value: number) {
	const date = new Date(value);
	const offset = date.getTimezoneOffset();
	const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
	return dateWithOffset.toISOString().split("T")[0];
}
