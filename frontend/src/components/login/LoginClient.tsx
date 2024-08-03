"use client";

import React, { useEffect, useState } from 'react';
import { emailAtom, loginUser, passwordAtom, userAtom } from '@/api/session';
import { useAtom } from 'jotai';

const LoginClient: React.FC = () => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);

    const handleSubmit = async () => {
        console.log(email, password)
        try {
            const res = await loginUser(email, password);
            console.log(res);
        } catch (err) {
            console.error('Failed to sign in user:', err);
        }
    }

    return (
        <div className='Login-Container'>
            <div>
                <h5>Log in or sign up</h5>
            </div>
            <div>
                <h3>Welcome to Dreambnb</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Password
                    <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default LoginClient;
