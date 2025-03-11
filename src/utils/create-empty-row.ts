import type { Row } from '@src/@types';

export default function createEmptyRow(): Row {
	return {
		id: -Date.now() - Math.floor(Math.random() * 1000),
		rowName: '',
		salary: 0,
		equipmentCosts: 0,
		overheads: 0,
		estimatedProfit: 0,
		machineOperatorSalary: 0,
		mainCosts: 0,
		materials: 0,
		mimExploitation: 0,
		supportCosts: 0,
		total: 0
	};
}
