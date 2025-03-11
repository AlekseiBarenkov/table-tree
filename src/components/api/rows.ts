import type {
	OutlayRowRequest,
	OutlayRowUpdateRequest,
	RecalculatedRows,
	RowsThree
} from '@src/@types';
import axios from 'axios';

const BASE_URL = 'http://185.244.172.108:8081/v1/outlay-rows/entity';
const E_ID = import.meta.env.VITE_E_ID;

const api = axios.create({
	baseURL: BASE_URL
});

export async function createEntity(): Promise<number> {
	const response = await api.post('/create');
	return response.data.id;
}

export async function fetchRows(): Promise<RowsThree[]> {
	const response = await api.get(`/${E_ID}/row/list`);
	return response.data;
}

export async function createRow(request: OutlayRowRequest): Promise<RecalculatedRows> {
	const response = await api.post(`/${E_ID}/row/create`, request);
	return response.data;
}

export async function updateRow(
	rowId: number,
	request: OutlayRowUpdateRequest
): Promise<RecalculatedRows> {
	const response = await api.post(`/${E_ID}/row/${rowId}/update`, request);
	return response.data;
}

export async function deleteRow(rowId: number): Promise<RecalculatedRows> {
	const response = await api.delete(`/${E_ID}/row/${rowId}/delete`);
	return response.data;
}
