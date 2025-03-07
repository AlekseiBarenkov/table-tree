import React from 'react';
import clsx from 'clsx';
import './TreeView.style.sass';

const TreeView: React.FC<{ className?: string }> = ({ className }) => {
	return <div className={clsx('tree-view', className)}>TreeView</div>;
};

export default TreeView;
