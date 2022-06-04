export function setAccessToken(token: string): void {
  localStorage.setItem('accessToken', token);
}

export function setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}

export function getAccessToken(): string | null | void {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}
