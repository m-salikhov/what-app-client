import { useGetDraftsQuery } from "Store/ToolkitAPIs/adminAPI";

export default function AdminPage() {
	const { data } = useGetDraftsQuery(undefined);
	console.log("🚀 ~ AdminPage ~ data:", data);

	return <div>AdminPage</div>;
}
