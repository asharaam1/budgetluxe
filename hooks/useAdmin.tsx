// hooks/useAdmin.ts - Enhanced debugging
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/config";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      console.log("🔍 [ADMIN CHECK] Starting...", {
        user: user?.email,
        uid: user?.uid,
      });

      if (!user) {
        console.log("❌ [ADMIN CHECK] No user found");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("📋 [ADMIN CHECK] Fetching user document...");
        const userDocRef = doc(db, "e-users", user.uid);
        console.log("📍 [ADMIN CHECK] Document path:", `users/${user.uid}`);

        const userDoc = await getDoc(userDocRef);
        console.log("📄 [ADMIN CHECK] Document exists:", userDoc.exists());

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("👤 [ADMIN CHECK] User data:", userData);
          console.log("🎯 [ADMIN CHECK] User role:", userData.role);

          const adminStatus =
            userData.role === "admin" || userData.role === "superadmin";
          console.log("✅ [ADMIN CHECK] Admin status:", adminStatus);

          setIsAdmin(adminStatus);
          setFirestoreError(null);
        } else {
          console.log(
            "❌ [ADMIN CHECK] User document does not exist in Firestore"
          );
          setIsAdmin(false);
          setFirestoreError("User document not found in Firestore");
        }
      } catch (error: any) {
        console.error("💥 [ADMIN CHECK] Firestore error:", error);
        console.error("💥 [ADMIN CHECK] Error code:", error.code);
        console.error("💥 [ADMIN CHECK] Error message:", error.message);

        setIsAdmin(false);
        setFirestoreError(`Firestore Error: ${error.code} - ${error.message}`);
      } finally {
        setLoading(false);
        console.log("🏁 [ADMIN CHECK] Completed");
      }
    };

    if (user) {
      checkAdmin();
    } else {
      setLoading(false);
      setIsAdmin(false);
    }
  }, [user]);

  return { isAdmin, loading, firestoreError };
}
