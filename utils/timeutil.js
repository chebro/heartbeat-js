exports.formattedTimeString = msec => {
	/* Returns a formatted date time string from epoch time */
	let hr = Math.floor(msec / 3600000)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});
	let min = (Math.floor(msec / 60000) - 60 * hr)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});
	let sec = (Math.floor(msec / 1000) % 60)
		.toLocaleString([], {minimumIntegerDigits: 2, useGrouping:false});

	return `${hr}h ${min}m ${sec}s`;
};

exports.epochToDateTimeString = lb => {
	/* Convert epoch timestamp to datetime */
	let time = new Date(lb).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	let date = new Date(lb).toLocaleDateString([],{
		day: '2-digit',
		month: '2-digit',
		year: '2-digit' 
	});
	return `${time} ${date}`;
};

