// hooks/useAuth.ts - Improved version
"use client";
import { useState, useEffect } from "react";
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/config";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔄 Auth state changed:", user?.email);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔐 Attempting login:", email);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Login successful:", userCredential.user.email);
    return userCredential;
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    }

    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, login, signUp, logout, loading };
}
