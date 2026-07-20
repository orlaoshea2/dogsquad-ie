import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRole = (userId: string) => {
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => {
          supabase
            .from("profiles")
            .select("id, full_name, phone, email")
            .eq("id", s.user.id)
            .maybeSingle()
            .then(({ data }) => setProfile(data as Profile | null));
          loadRole(s.user.id);
        }, 0);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (data.session?.user) {
        supabase
          .from("profiles")
          .select("id, full_name, phone, email")
          .eq("id", data.session.user.id)
          .maybeSingle()
          .then(({ data: p }) => setProfile(p as Profile | null));
        loadRole(data.session.user.id);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, profile, isAdmin, loading, signOut: () => supabase.auth.signOut() };
}
