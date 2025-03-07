import React from 'react';
import clsx from 'clsx';
import FirstIco from '@assets/icons/header-first.svg?react';
import SecondIco from '@assets/icons/header-second.svg?react';

import './Header.style.sass';

const Header: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<header className={clsx('header', className)}>
			<div className='header__icon-inner'>
				<FirstIco className='header__icon icon' />
				<SecondIco className='header__icon icon' />
			</div>

			<nav className='header__nav'>
				<ul className='header__nav-list'>
					<li className='active'>Просмотр</li>
					<li>Управление</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
