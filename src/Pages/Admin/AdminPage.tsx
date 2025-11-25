import { useEffect } from "react";
import { useGetDraftsQuery } from "Store/ToolkitAPIs/adminAPI";

export default function AdminPage() {
	useEffect(() => {
		import("Store/ToolkitAPIs/adminAPI");
	}, []);

	const { data } = useGetDraftsQuery(undefined);
	console.log("🚀 ~ AdminPage ~ data:", data);

	return <div>AdminPage</div>;
}
