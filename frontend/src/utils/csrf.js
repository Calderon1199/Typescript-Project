// src/utils/csrf.ts

export const fetchCsrfToken = async () => {
    const response = await fetch('/api/csrf/restore', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
};
