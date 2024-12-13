import { writable, derived } from 'svelte/store';

// Retrieve initial state from localStorage, if available
const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
const storedAccessToken = localStorage.getItem('accessToken');
const storedUserId = localStorage.getItem('userId');

// Initialize stores with values from localStorage (or defaults)
export const isAuthenticated = writable<boolean>(storedIsAuthenticated);
export const accessToken = writable<string | null>(storedAccessToken);
export const userId = writable<number | null>(storedUserId ? parseInt(storedUserId, 10) : null);

// Sync store values with localStorage whenever they change
isAuthenticated.subscribe((value) => {
  localStorage.setItem('isAuthenticated', JSON.stringify(value));
});

accessToken.subscribe((value) => {
  localStorage.setItem('accessToken', value ? value : '');
});

userId.subscribe((value) => {
  localStorage.setItem('userId', value ? value.toString() : '');
});

// Derived store for checking if a user is fully authenticated
export const isLoggedIn = derived(
  [isAuthenticated, accessToken, userId],
  ([$isAuthenticated, $accessToken, $userId]) => {
    return $isAuthenticated && $accessToken && $userId !== null;
  }
);