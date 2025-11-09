export function linkBuilder(id: number, pathname: string): string {
	if (!pathname) return "";

	if (pathname.includes("playmode")) {
		return `/playmode/${id}`;
	}

	return `/tournament/${id}`;
}
