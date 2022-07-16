const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
]

exports.timeConverter = (time) => {
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    return `${date} ${month[monthIndex]} ${year}`
}
