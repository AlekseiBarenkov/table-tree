import type { FC } from 'react';
import clsx from 'clsx';
import SecondIco from '@assets/icons/sidemenu-ico.svg?react';

import './SideMenu.style.sass';

const items = [
	'По проекту',
	'Объекты',
	'РД',
	'МТО',
	'СМР',
	'График',
	'МиМ',
	'Рабочие',
	'Капвложения',
	'Бюджет',
	'Финансирование',
	'Панорамы',
	'Камеры',
	'Поручения',
	'Контрагенты'
] as const;
const SideMenu: FC<{ className?: string }> = ({ className }) => {
	const active: (typeof items)[number] = 'СМР';

	return (
		<div className={clsx('sidemenu', className)}>
			{items.map((text, idx) => (
				<div className={clsx('sidemenu__item', { active: text === active })} key={idx}>
					<SecondIco className='sidemenu__ico icon' />

					<div className='sidemenu__text'>{text}</div>
				</div>
			))}
		</div>
	);
};

export default SideMenu;
