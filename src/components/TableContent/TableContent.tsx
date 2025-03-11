import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import TreeView from '../TreeView';
import { useRowActions } from '@src/store';
import { Api } from '../api';
import createEmptyRow from '@src/utils/create-empty-row';

import './TableContent.style.sass';

const TableContent: FC<{ className?: string }> = ({ className }) => {
	const setRows = useRowActions().setRows;

	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const rowsData = await Api.rows.fetchRows();
				if (rowsData?.length === 0) {
					const emptyRow = createEmptyRow();

					setRows([{ ...emptyRow, child: [] }]);
				} else {
					setRows(rowsData);
				}
			} catch (error) {
				console.error(error);
				setErrorMessage((error as Error)?.message || 'Unknown error');
			} finally {
				setIsLoading(false);
			}
		})();
	}, [setRows]);

	return (
		<div className={clsx('table-content', className)}>
			{isLoading && <div className='table-content__loading'>Loading...</div>}

			{errorMessage && <div>{errorMessage}</div>}

			{!isLoading && !errorMessage && <TreeView />}
		</div>
	);
};

export default TableContent;
