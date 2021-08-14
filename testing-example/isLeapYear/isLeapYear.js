const isLeapYear = (year) => {
  if (year === undefined) throw new Error('no argument passed')
  if (typeof year !== 'number') throw new Error('argument must be a number')
  if (year < 42) throw new Error('year cannot be less than 42')
  if (!Number.isInteger(year)) throw new Error('year must be an integer')

  const date = new Date(year, 2, 0)
  const days = date.getDate()

  return (days === 29)
}

module.exports = isLeapYear
