import type { OutlayRowRequest, Row, RowsThree } from '@src/@types';
import { addNode, deleteNode, updateNode } from '@src/utils/store-recursions';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
	rows: RowsThree[];
	actions: {
		setRows: (rows: RowsThree[]) => void;
		addRow: (parentId: OutlayRowRequest['parentId'], newRow: RowsThree) => void;
		updateRow: (rowId: number, newData: Row) => void;
		deleteRow: (id: number) => void;
		applyChangedRows: (changedRows: Row[]) => void;
	};
}

export const useOutlayStore = create<State>()(
	immer((set) => ({
		rows: [],
		actions: {
			setRows: (rows) => set({ rows }),
			addRow: (parentId, newRow) =>
				set((state) => {
					if (parentId === null) {
						state.rows.push(newRow);
					} else {
						addNode(state.rows, parentId, newRow);
					}
				}),

			updateRow: (rowId, newData) =>
				set((state) => {
					updateNode(state.rows, rowId, newData);
				}),

			deleteRow: (id) =>
				set((state) => {
					state.rows = deleteNode(state.rows, id);
				}),

			applyChangedRows: (changedRows) =>
				set((state) => {
					changedRows.forEach((changedRow) => {
						updateNode(state.rows, changedRow.id, changedRow);
					});
				})
		}
	}))
);

export const useRowActions = () => useOutlayStore((state) => state.actions);
