export function linkBuilder(id: number, pathname: string): string {
	if (pathname.includes("playmode")) {
		return `/playmode/${id}`;
	}

	return `/tournament/${id}`;
}
