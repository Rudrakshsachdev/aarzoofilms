import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function AdminRoute() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return session ? <AdminDashboard /> : <AdminLogin />;
}

export default AdminRoute;
