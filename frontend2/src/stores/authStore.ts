import { writable } from 'svelte/store';
export const isAuthenticated = writable<boolean>(false);
// Define types for the store values
export const accessToken = writable<string | null>(null);
export const userId = writable<number | null>(null);
isAuthenticated.subscribe((value) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  });
