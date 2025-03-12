import type { OutlayRowRequest, Row, RowDataToView } from '@src/@types';
import { Api } from '@src/components/api';
import { useRowActions } from '@src/store';
import checkOnNewRow from '@src/utils/check-on-new-row';
import createEmptyRow from '@src/utils/create-empty-row';
import showFetchingMessage from '@src/utils/toast';
import { useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import toast from 'react-hot-toast';

export const useRowControl = (
	row: Row,
	isSingleParent: boolean,
	parentId: OutlayRowRequest['parentId']
) => {
	const isNewRow = checkOnNewRow(row);
	const isInitial = isSingleParent && isNewRow;

	const [values, setValues] = useState<Row>({ ...row });
	const [editing, setEditing] = useState(isNewRow);
	const [isFetching, setIsFetching] = useState(false);

	const {
		deleteRow: deleteRowFromStore,
		applyChangedRows,
		updateRow: updateRowInStore,
		addRow: addRowInStore
	} = useRowActions();

	const checkOnDisableRequest = () => {
		if (isFetching) {
			toast.error('Пожалуйста, подождите окончания загрузки...');
			return true;
		}
		return false;
	};

	const handleDoubleClick = () => {
		if (checkOnDisableRequest()) return;

		setValues({ ...row });
		setEditing(true);
	};

	const handleInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (checkOnDisableRequest()) return;

		if (e.key !== 'Enter') return;
		setIsFetching(true);

		try {
			const { id, ...cleanRow } = values;
			let res;

			if (isNewRow) {
				res = await showFetchingMessage(Api.rows.createRow({ ...cleanRow, parentId }));
				updateRowInStore(id, res.current);
			} else {
				res = await showFetchingMessage(Api.rows.updateRow(id, cleanRow));
			}

			applyChangedRows(res?.changed ? [...res.changed, res.current] : [res.current]);
		} catch (error) {
			console.error('Ошибка обновления строки:', error);
		} finally {
			setEditing(false);
			setIsFetching(false);
		}
	};

	const handleDelete = async (e: MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();
		if (checkOnDisableRequest()) return;

		if (isInitial) {
			toast.error('Нельзя удалить единственную строку!');
			return;
		}

		setIsFetching(true);

		try {
			if (!isNewRow) {
				const res = await showFetchingMessage(Api.rows.deleteRow(row.id));
				applyChangedRows(res?.changed ?? []);
			}

			deleteRowFromStore(row.id);

			if (isSingleParent) {
				const emptyRow = createEmptyRow();
				addRowInStore(null, { ...emptyRow, child: [] });
			}
		} catch (error) {
			console.error('Ошибка удаления строки:', error);
		} finally {
			setIsFetching(false);
		}
	};

	const handleCreate = async (e: React.MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();

		if (checkOnDisableRequest()) return;

		if (editing) {
			toast.error(
				'Нельзя создать строку потомка если родительская строка находится в режиме редактирования!'
			);
			return;
		}

		const emptyRow = createEmptyRow();
		addRowInStore(row.id, { ...emptyRow, child: [] });
	};

	const handleChange = (key: keyof RowDataToView, e: ChangeEvent<HTMLInputElement>) => {
		const newValue = key === 'rowName' ? e.target.value : Number(e.target.value);

		setValues((prev) => ({ ...prev, [key]: newValue }));
	};

	return {
		editing,
		values,
		isFetching,
		setEditing,
		handleDoubleClick,
		handleInputKeyDown,
		handleDelete,
		handleCreate,
		handleChange
	};
};
