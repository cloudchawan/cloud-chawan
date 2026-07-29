"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseClient();

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(data.session));
      setIsLoading(false);
    }

    void loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { isAuthenticated, isLoading };
}
