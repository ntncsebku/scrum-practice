export function loadUserData() {
  try {
    const serializedUserData = localStorage.getItem('user');
    if (!serializedUserData) return undefined;

    return JSON.parse(serializedUserData);
  } catch (err) {
    return undefined;
  }
}

export function loadAuthToken() {
  return localStorage.getItem('token');
}

export function storeUserData({ user, token }) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}
