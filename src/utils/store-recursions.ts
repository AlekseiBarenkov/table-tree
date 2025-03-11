import { RowsThree, type Row } from '@src/@types';

export function addNode(nodes: RowsThree[], parentId: number, newRow: RowsThree) {
	for (const node of nodes) {
		if (node.id === parentId) {
			node.child.push(newRow);
			return;
		}
		addNode(node.child, parentId, newRow);
	}
}

export function updateNode(nodes: RowsThree[], rowId: number, newData: Row) {
	for (const node of nodes) {
		if (node.id === rowId) {
			Object.assign(node, newData);
			return;
		}
		updateNode(node.child, rowId, newData);
	}
}

export function deleteNode(nodes: RowsThree[], id: number): RowsThree[] {
	return nodes.filter((node) => {
		if (node.id === id) return false;
		node.child = deleteNode(node.child, id);
		return true;
	});
}
