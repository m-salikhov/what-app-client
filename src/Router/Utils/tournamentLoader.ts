import { Params } from 'react-router-dom';
import { store } from 'Store/store';
import { tournamentAPI } from 'Store/ToolkitAPIs/tournamentAPI';

export async function tournamentLoader({ params }: { params: Params }) {
  if (!params.id) return null;

  try {
    return await store.dispatch(tournamentAPI.endpoints.getTournament.initiate(params.id)).unwrap();
  } catch (error) {
    throw error;
  }
}
