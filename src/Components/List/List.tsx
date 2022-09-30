import { ReactNode } from 'react';

interface IListProps {
	children: ReactNode;
}

export function List(properties: IListProps) {
	const { children } = properties;

	return (
    
	<ul role='list' className='mt-10 max-w-lg mx-auto min-w-[300px]'>
			{children}
	</ul>
	);
}
