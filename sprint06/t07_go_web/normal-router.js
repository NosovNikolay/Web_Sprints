const YEAR_MS = 31536000000
const MONTH_MS = 2629800000
const DAY_MS = 86400000

exports.calculateTime = () => {
  const now = Date.now() + YEAR_MS * 31
  return {
    years: () => Math.round(now / YEAR_MS),
    months: () => Math.round((now % YEAR_MS) / MONTH_MS),
    days: () => Math.round(((now % YEAR_MS) % MONTH_MS) / DAY_MS),
  }
}
