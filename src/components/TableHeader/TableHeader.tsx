import React from 'react';
import clsx from 'clsx';
import './TableHeader.style.sass';

const TableHeader: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={clsx('table-header', className)}>
			<div className='table-header__item'>Строительно-монтажные работы</div>
		</div>
	);
};

export default TableHeader;
