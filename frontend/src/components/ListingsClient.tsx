// src/components/ListingsClient.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { fetchCsrfToken } from '@/utils/csrf';

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
        const csrfToken = await fetchCsrfToken();
        const response = await fetch('/api/listings/lists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <h1>Listings</h1>
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
