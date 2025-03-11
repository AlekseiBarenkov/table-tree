export type Entity = {
	id: number;
	rowName: string;
};

export type Row = {
	equipmentCosts: number;
	estimatedProfit: number;
	id: number;
	machineOperatorSalary: number;
	mainCosts: number;
	materials: number;
	mimExploitation: number;
	overheads: number;
	rowName: string;
	salary: number;
	supportCosts: number;
	total: number;
};

export type OutlayRowUpdateRequest = Omit<Row, 'id' | 'total'>;
export type OutlayRowRequest = OutlayRowUpdateRequest & { parentId: number | null };

export type RecalculatedRows = {
	changed: Row[];
	current: Row;
};

export type RowsThree = Row & {
	child: RowsThree[];
};

export type RowDataToView = Pick<
	Row,
	'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'
>;
