export function linkBuilder(id: number, pathname: string): string {
	if (!pathname) return "";

	if (pathname.includes("playmode")) {
		return `/playmode/${id}`;
	}

	if (pathname.includes("admin")) {
		return `/admin/edit-tournaments/${id}`;
	}

	return `/tournament/${id}`;
}
