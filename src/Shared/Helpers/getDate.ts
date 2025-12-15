export function getDate(date: Date | string | number) {
	const formatter = new Intl.DateTimeFormat("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	if (date instanceof Date) {
		return formatter.format(date);
	}

	const dateObj = new Date(date);

	if (dateObj.toString() === "Invalid Date") {
		console.log(`некорректная дата: ${date}`);
		return "";
	}

	return formatter.format(dateObj);
}

export function getDateYYYY_MM_DD(value: number) {
	const date = new Date(value);
	const offset = date.getTimezoneOffset();
	const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
	return dateWithOffset.toISOString().split("T")[0];
}
