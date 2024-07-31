// src/utils/csrf.ts

export const csrfFetch = async (url: string, method: string, body?: any) => {
    try {
        // Fetch the CSRF token
        const tokenResponse = await fetch('/api/csrf/restore', {
            method: 'GET',
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const { csrfToken } = await tokenResponse.json();

        // Make the actual fetch call with the CSRF token
        const fetchCall = await fetch(`http://localhost:5000${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'CSRF-TOKEN': csrfToken, // Use the retrieved CSRF token
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!fetchCall.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${fetchCall.statusText}`);
        }

        return await fetchCall.json(); // Parse the response JSON
    } catch (err) {
        console.error('Error during csrfFetch:', err);
        throw err; // Re-throw the error for further handling
    }
};
