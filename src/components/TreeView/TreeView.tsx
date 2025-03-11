import type { FC } from 'react';
import clsx from 'clsx';
import { useOutlayStore } from '@src/store';
import TreeViewRow from '../TreeViewRow';
import {
	CELLS_DATA_PARAMS_KEYS,
	CELLS_DATA_PARAMS_MAP,
	DATA_CELLS_STYLE
} from '@src/constants/row';

import './TreeView.style.sass';

const TreeView: FC<{ className?: string }> = ({ className }) => {
	const data = useOutlayStore((state) => state.rows);

	return (
		<table className={clsx('tree-view', className)}>
			<colgroup>
				<col className='tree-view__col row-level' />

				{CELLS_DATA_PARAMS_KEYS.map((key) => (
					<col
						key={key}
						className={`tree-view__col${key === 'rowName' ? ' row-name' : ''}`}
					/>
				))}
			</colgroup>

			<thead>
				<tr>
					<th style={DATA_CELLS_STYLE}>Уровень</th>

					{Object.values(CELLS_DATA_PARAMS_MAP).map((value) => (
						<th key={value} style={DATA_CELLS_STYLE}>
							{value}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.map((row) => (
					<TreeViewRow
						key={row.id}
						row={row}
						level={0}
						className='tree-view__row'
						isSingleParent={data.length === 1}
						parentId={null}
					/>
				))}
			</tbody>
		</table>
	);
};

export default TreeView;
