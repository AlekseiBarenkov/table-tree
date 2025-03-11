import React from 'react';
import Header from '../Header';
import SideMenu from '../SideMenu';
import SideMenuHeader from '../SideMenuHeader';
import TableHeader from '../TableHeader';
import TableContent from '../TableContent';

import './Dashboard.style.sass';

const Dashboard: React.FC = () => {
	return (
		<div className='dashboard'>
			<Header className='dashboard__header' />

			<div className='dashboard__content'>
				<SideMenuHeader className='dashboard__content-side-menu-header' />

				<TableHeader className='dashboard__content-table-header' />

				<SideMenu className='dashboard__content-side-menu' />

				<TableContent className='dashboard__content-table' />
			</div>
		</div>
	);
};

export default Dashboard;
