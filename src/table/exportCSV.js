import { observeStore } from '@ubc-farm/utils';
import { getDownloadData, clearDownload } from '../redux/metadata.js';

/**
 * Downloads some text file to the user's computer
 */
function download(filename, text) {
	const element = document.createElement('a');
	element.setAttribute('href',
		`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
	element.setAttribute('download', filename);
	element.setAttribute('hidden', true);

	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

export default function watchForDownloads(store) {
	if (typeof document === 'undefined') {
		throw new Error('Cannot be used in Node.js or a worker, requires DOM');
	}

	return observeStore(store, getDownloadData, (data) => {
		if (data === null) return;
		download(data.filename, data.csv);
		store.dispatch(clearDownload());
	});
}
