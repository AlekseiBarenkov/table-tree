import type { Row } from '@src/@types';

export default function checkOnNewRow(row: Row): boolean {
	return row.id < 0;
}
