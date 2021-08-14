const isLeapYear = require('./isLeapYear')

describe('tests isLeapYear function', () => {
  test('1900 - not leap year', () => {
    expect(isLeapYear(1900)).toBe(false)
  })

  test('2000 - leap year', () => {
    expect(isLeapYear(2000)).toBe(true)
  })

  test('2003 - not leap year', () => {
    expect(isLeapYear(2003)).toBe(false)
  })

  test('2008 - leap year', () => {
    expect(isLeapYear(2008)).toBe(true)
  })

  test("() - error 'no argument passed'", () => {
    expect(() => isLeapYear()).toThrow('no argument passed')
  })

  test("'2008' - error 'argument must be a number'", () => {
    expect(() => isLeapYear('2008')).toThrow('argument must be a number')
  })

  test("true - error 'argument must be a number'", () => {
    expect(() => isLeapYear(true)).toThrow('argument must be a number')
  })

  test("false - error 'argument must be a number'", () => {
    expect(() => isLeapYear(false)).toThrow('argument must be a number')
  })

  test("null - error 'argument must be a number'", () => {
    expect(() => isLeapYear(null)).toThrow('argument must be a number')
  })

  test("{} - error 'argument must be a number'", () => {
    expect(() => isLeapYear({})).toThrow('argument must be a number')
  })

  test("[] - error 'argument must be a number'", () => {
    expect(() => isLeapYear([])).toThrow('argument must be a number')
  })

  test("() => {} - error 'argument must be a number'", () => {
    expect(() => isLeapYear(() => {})).toThrow('argument must be a number')
  })

  test("41 - error 'year cannot be less than 42'", () => {
    expect(() => isLeapYear(41)).toThrow('year cannot be less than 42')
  })

  test("2008.4 - error 'year must be an integer'", () => {
    expect(() => isLeapYear(2008.4)).toThrow('year must be an integer')
  })
})
