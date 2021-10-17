const months = [
	'Januar',
	'Februar',
	'März',
	'April',
	'Mai',
	'Juni',
	'Juli',
	'August',
	'September',
	'Oktober',
	'November',
	'Dezember',
]

export function getTime(data: string | number) {
	const date = new Date(data)

	let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

	return `${hours}:${minutes}`
}

export function getDateTime(data: string | number) {
	const date = new Date(data)

	let date_ = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	let month = months[date.getMonth()]
	let year = date.getFullYear()

	let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

	return `${hours}:${minutes}, ${date_}. ${month} ${year}`
}

export function getDuration(_minutes: number) {
	const days = Math.floor(_minutes / (60 * 24))
	const hours = Math.floor(_minutes % (60 * 24) / 60)
	const minutes = _minutes % 60

	let output = []

	if(days > 0) output.push(`${days}d`)
	if(hours > 0) output.push(`${hours}h`)
	if(minutes > 0) output.push(`${minutes}min`)

	return output.join(' ')
}