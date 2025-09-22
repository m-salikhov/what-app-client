import { store } from "Store/store";
import { tournamentAPI } from "Store/ToolkitAPIs/tournamentAPI";
import type { Params } from "react-router-dom";

export async function tournamentLoader({ params }: { params: Params }) {
	if (!params.id) return null;

	try {
		return await store.dispatch(tournamentAPI.endpoints.getTournament.initiate(params.id)).unwrap();
	} catch (error) {
		throw error;
	}
}
