// hooks/useAdmin.ts - Debug version
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/config";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      console.log("🔍 Checking admin status...", { user: user?.uid });

      if (!user) {
        console.log("❌ No user found");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("📋 Fetching user document...", user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("📄 User data:", userData);

          const adminStatus =
            userData.role === "admin" || userData.role === "superadmin";
          console.log("🎯 Admin status:", adminStatus);

          setIsAdmin(adminStatus);
          setDebugInfo({
            userExists: true,
            userRole: userData.role,
            isAdmin: adminStatus,
          });
        } else {
          console.log("❌ User document does not exist");
          setIsAdmin(false);
          setDebugInfo({
            userExists: false,
            userRole: null,
            isAdmin: false,
          });
        }
      } catch (error) {
        console.error("💥 Error checking admin status:", error);
        setIsAdmin(false);
        setDebugInfo({
          error: error.message,
          isAdmin: false,
        });
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user]);

  return { isAdmin, loading, debugInfo };
}
