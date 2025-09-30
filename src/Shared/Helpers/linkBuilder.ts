export function linkBuilder(id: number, pathname: string): string {
	if (pathname.includes("playmode")) {
		return `/playmode/${id}`;
	}

	if (pathname.includes("all")) {
		return `/tournament/${id}`;
	}

	return "";
}
