export function dateFormat(date: string) {
  return new Date(date).toLocaleDateString('id-ID', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}
