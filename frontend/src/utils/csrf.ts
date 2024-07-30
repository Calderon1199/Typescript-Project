// src/utils/csrf.ts

export const csrfFetch = async (url: string, method: string) => {
    try {
        const response = await fetch('/api/csrf/restore', {
            method: 'GET',
            credentials: 'include',
        });
        const token = await response.json();

        const fetchCall = await fetch(`http://localhost:8000${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'CSRF-TOKEN': token
            }
        });


        if (!fetchCall.ok) {
            throw new Error('Failed to fetch data');
        };
        const data = await fetchCall.json();
        return data;
    } catch (err) {
        return err;
    }
};
