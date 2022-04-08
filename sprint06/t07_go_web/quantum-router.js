const YEAR_MS = 31536000000
const MONTH_MS = 2629800000
const DAY_MS = 86400000

exports.calculateTime = () => {
  const now = Date.now() + YEAR_MS * 31

  const realYear = now / YEAR_MS

  let quantYears = 1
  for (let i = 0; i < realYear; i++) if (!(i % 7)) quantYears++

  return [
    quantYears,
    Math.round((now % YEAR_MS) / MONTH_MS) + 4,
    Math.round(((now % YEAR_MS) % MONTH_MS) / DAY_MS),
  ]
}
