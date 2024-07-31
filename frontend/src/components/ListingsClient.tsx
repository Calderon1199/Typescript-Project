// src/components/ListingsClient.tsx
"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import { getAllListings, getListingById, getUserListings, singleListingAtom, userListingsAtom } from '@/api/listing';
import { useAtom } from 'jotai';



const ListingsClient: React.FC = () => {
  const [listings, setListings] = useAtom(userListingsAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getUserListings();
        console.log(response)
        // setListings(response.userListings);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <div>
              <img src="https://media.istockphoto.com/id/1396856251/photo/colonial-house.webp?b=1&s=612x612&w=0&k=20&c=MC6v8YP2XPks0RHV1cnYg0K6mgxc2cC_w1bMIRTiw3Q=" alt="home"></img>
            </div>
            <h2>{listing.name}</h2>
            <p>{listing.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsClient;
