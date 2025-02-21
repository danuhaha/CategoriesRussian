export function setCookie(name: string, value: string, days: number) {
  // Create a Date object with current Moscow time (UTC+3)
  const moscowOffset = 3 * 60; // Moscow is UTC+3
  const now = new Date();
  const moscowTime = new Date(now.getTime() + moscowOffset * 60 * 1000); // Adjust time to Moscow time

  // Set midnight Moscow time (00:00 of the next day)
  const midnightMoscowTime = new Date(moscowTime);
  midnightMoscowTime.setHours(24, 0, 0, 0); // Set to midnight

  // Calculate the difference in milliseconds to midnight Moscow time
  const timeToMidnight = midnightMoscowTime.getTime() - now.getTime();

  // Set the expiration date based on the `days` parameter
  let expires: string;
  if (days === 0) {
    // If days is 0, set to midnight Moscow time
    expires = new Date(now.getTime() + timeToMidnight).toUTCString();
  } else {
    // Otherwise, set expiration to `days` days from now
    expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  }

  // Set the cookie with the correct expiration time
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}


export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
} 