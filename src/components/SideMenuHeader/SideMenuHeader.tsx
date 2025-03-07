import React from 'react';
import clsx from 'clsx';
import Arrow from '@assets/icons/arrow-down.svg?react';

import './SideMenuHeader.style.sass';

const SideMenuHeader: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={clsx('sidemenu-header', className)}>
			<div className='sidemenu-header__title-inner'>
				<div className='sidemenu-header__title'>Название проекта</div>
				<div className='sidemenu-header__subtitle'>Аббревиатура</div>
			</div>

			<Arrow className='sidemenu-header__arrow icon' />
		</div>
	);
};

export default SideMenuHeader;
