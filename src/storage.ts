export function getUserId(): string | null {
  return window.localStorage.getItem("userId");
}

export function setUserId(userId: string) {
  window.localStorage.setItem("userId", userId);
}

export function removeUserId() {
  window.localStorage.removeItem("userId");
}
