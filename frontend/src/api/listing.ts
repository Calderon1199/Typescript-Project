import { csrfFetch } from "@/utils/csrf";
import { atom } from "jotai";

// Define the Listing interface
export interface Listing {
    id: number;
    name: string;
    city: string;
    state: string;
    price: string;
    userId: number;
    street: string;
    zipcode: string;
    country: string;
    description: string;
}

// Define atoms for managing listings state
export const allListingsAtom = atom<Listing[]>([]);
export const singleListingAtom = atom<Listing | null>(null); // Allow null for empty state
export const userListingsAtom = atom<Listing[]>([]);
// Interface for the response from fetching all listings
interface ListingsResponse {
    allListings: Listing[];
}

// Fetch all listings
export const getAllListings = async (): Promise<ListingsResponse> => {
    try {
        const data: ListingsResponse = await csrfFetch('/api/listings/all', 'GET');
        return data;
    } catch (error) {
        console.error('Error fetching all listings:', error);
        return { allListings: [] }; // Return an empty list in case of error
    }
}

// Interface for the response from fetching a single listing
interface ListingResponse {
    listing: Listing | null;
}

// Fetch a single listing by ID
export const getListingById = async (id: number): Promise<ListingResponse> => {
    try {
        const data: ListingResponse = await csrfFetch(`/api/listings/${id}`, 'GET');
        return data;
    } catch (error) {
        console.error('Error fetching listing by id:', error);
        return { listing: null }; // Return null in case of error
    }
}

interface UserListingResponse {
    userListings: Listing | null;
}

export const getUserListings = async (): Promise<UserListingResponse> => {
    try {
        const data: UserListingResponse = await csrfFetch(`/api/listings/user`, 'GET');
        return data;
    } catch (error) {
        console.error('Error fetching owned listings', error);
        return { userListings: null};
    }
}
