import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAdmin } from "@/hooks/useAdmin";
import { Card } from "@/components/ui/card";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sand">
        <Card className="p-8">
          <p className="text-lg">Carregando...</p>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sand">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <button
            onClick={signOut}
            className="text-primary hover:underline"
          >
            Fazer logout
          </button>
        </Card>
      </div>
    );
  }

  return <AdminDashboard onSignOut={signOut} />;
};

export default Admin;