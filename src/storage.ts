export function getUserId(): string | null {
  return window.sessionStorage.getItem("userId");
}

export function setUserId(userId: string) {
  window.sessionStorage.setItem("userId", userId);
}

export function removeUserId() {
  window.sessionStorage.removeItem("userId");
}
