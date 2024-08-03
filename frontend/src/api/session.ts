import { csrfFetch } from "@/utils/csrf";
import { atom } from "jotai";

export interface User {
    id: number;
    fullName: string;
    username: string;
    email: string;
}

export const userAtom = atom<User | null>(null);
export const emailAtom = atom("");
export const passwordAtom = atom("");

interface UserResponse {
    user: User | null;
}

export const loginUser = async (credential : string, password: string): Promise<UserResponse> => {
    try {
        const data: UserResponse = await csrfFetch('/api/user/login', 'POST', {credential, password});
        return data;
    } catch (err) {
        console.error('Error signing in:', err);
        return { user: null };
    }
};
