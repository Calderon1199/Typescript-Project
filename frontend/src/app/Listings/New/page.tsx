// src/components/ListingsClient.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { csrfFetch } from '@/utils/csrf';

interface Listing {
    id: number;
    title: string;
    description: string;
}

const ListingsClient: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await csrfFetch('/api/listings/all', 'GET');
                setListings(response.allListings);
            } catch (error) {
                console.error('Failed to fetch listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div>
            <h1 className='b'>Listings</h1>
            {error && <p>{error}</p>}
            <ul>
                {listings.map((listing) => (
                    <li key={listing.id}>
                        <h2>{listing.title}</h2>
                        <p>{listing.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListingsClient;
