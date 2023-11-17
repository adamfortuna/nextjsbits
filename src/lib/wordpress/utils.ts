export function extractHost(url:string) {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}