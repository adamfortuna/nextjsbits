export function extractHost(url:string) {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}
export function extractDomain(url:string) {
  try {
    const host = extractHost(url)
    if(!host) {
      return null
    }
    const urlParts = new URL(url).hostname.split('.')
    return urlParts
      .splice(urlParts.length-2, urlParts.length-1).join(".")
  } catch {
    return null
  }
}

export function extractRepo(url:string) {
  try {
    const host = extractHost(url)
    if(!host) {
      return null
    }
    const urlParts = new URL(url).pathname.split('/')
    return urlParts[urlParts.length-1]
  } catch {
    return null
  }
}

export function daysBetweenDates(date1: Date, date2: Date | null) {
  if (!date2) {
    return false;
  }
  // Convert both dates to milliseconds
  var date1Ms = date1.getTime();
  var date2Ms = date2.getTime();

  // Calculate the difference in milliseconds
  var timeDifference = date2Ms - date1Ms;

  // Convert the time difference to days
  var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}