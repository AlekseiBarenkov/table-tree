import DocIco from '@assets/icons/row-doc.svg?react';
import TrashIco from '@assets/icons/row-trash.svg?react';
import { CELLS_DATA_PARAMS_KEYS, CONFIG, DATA_CELLS_STYLE } from '@src/constants/row';
import { useRowControl } from '@src/hooks/useRowControl';
import { memo, type FC } from 'react';
import { getLevelCellPudding, getLinesStyles } from './TreeViewRow.service';

import type { OutlayRowRequest, RowsThree } from '@src/@types';
import './TreeViewRow.style.sass';

interface Props {
	row: RowsThree;
	level: number;
	parentId: OutlayRowRequest['parentId'];
	isSingleParent?: boolean;
	prevLevelCellPudding?: number;
	isChild?: boolean;
	className?: string;
}

const TreeViewRow: FC<Props> = memo(
	({
		row,
		level,
		parentId,
		isSingleParent = false,
		prevLevelCellPudding = 0,
		isChild = false,
		className
	}) => {
		const { child, ...rest } = row;

		const {
			editing,
			values,
			isFetching,
			handleDoubleClick,
			handleInputKeyDown,
			handleDelete,
			handleCreate,
			handleChange
		} = useRowControl(rest, isSingleParent, parentId);

		const levelCellPudding = getLevelCellPudding(level, isChild);

		const { verticalLineStyle, horizontalLineStyle } = getLinesStyles(
			row,
			levelCellPudding,
			prevLevelCellPudding
		);

		return (
			<>
				<tr
					className='tree-view-row'
					onDoubleClick={handleDoubleClick}
					style={{ height: `${CONFIG.ROW_HEIGHT}rem` }}
				>
					<td style={{ paddingLeft: `${levelCellPudding}rem` }}>
						<div className='tree-view-row__icon-container'>
							<div className='tree-view-row__create-icon-inner'>
								<DocIco
									className='tree-view-row__create-icon'
									onClick={handleCreate}
									width={`${CONFIG.BASE_ICON_SIZE}rem`}
								/>

								{row.child.length > 0 && (
									<div
										className='tree-view-row__vertical-line'
										style={verticalLineStyle}
									/>
								)}

								{isChild && (
									<div
										className='tree-view-row__horizontal-line'
										style={horizontalLineStyle}
									/>
								)}
							</div>

							<div className='tree-view-row__icon-container-mask' />

							<TrashIco className='tree-view-row__delete-icon' onClick={handleDelete} />
						</div>
					</td>

					{CELLS_DATA_PARAMS_KEYS.map((key) => {
						return (
							<td style={DATA_CELLS_STYLE} key={key}>
								{editing ? (
									<input
										disabled={isFetching}
										type={key === 'rowName' ? 'text' : 'number'}
										value={values[key]}
										onChange={(e) => handleChange(key, e)}
										onKeyDown={handleInputKeyDown}
										className='tree-view-row__input'
									/>
								) : (
									row[key]
								)}
							</td>
						);
					})}
				</tr>

				{child &&
					child.length > 0 &&
					child.map((rowChild) => (
						<TreeViewRow
							key={rowChild.id}
							row={rowChild}
							level={level + 1}
							prevLevelCellPudding={levelCellPudding}
							className={className}
							parentId={row.id}
							isChild
						/>
					))}
			</>
		);
	}
);

export default TreeViewRow;
