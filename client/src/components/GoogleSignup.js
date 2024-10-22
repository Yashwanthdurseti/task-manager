// src/components/GoogleSignup.js
import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleSignup = ({ setToken, setUsername }) => {
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Get the ID token and username (email)
            const token = await user.getIdToken();
            const username = user.email; // or user.displayName

            setToken(token);
            setUsername(username);
            localStorage.setItem('token', token);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
        </div>
    );
};

export default GoogleSignup;
