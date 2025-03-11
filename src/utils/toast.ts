import toast from 'react-hot-toast';

export default async function showFetchingMessage<D>(promise: Promise<D>): Promise<D> {
	const toastId = toast.loading('Загрузка...');

	try {
		const res = await promise;
		toast.success('Готово!', { id: toastId });
		return res;
	} catch (err) {
		toast.error('Загрузка не удалась!', { id: toastId });
		throw err;
	}
}
