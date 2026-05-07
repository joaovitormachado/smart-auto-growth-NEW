import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cadastro = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Se já estiver logado
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError("Erro ao cadastrar: " + error.message);
      setLoading(false);
    } else {
      setMessage("Conta criada com sucesso! Você já pode fazer login.");
      setLoading(false);
      // Opcional: navigate("/login");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-premium">
        <h1 className="text-3xl font-display font-black text-white text-center mb-6">Criar Conta</h1>
        
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md mb-6 text-sm">{error}</div>}
        {message && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-md mb-6 text-sm">{message}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">E-mail</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-950 border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Senha</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-zinc-950 border-white/10 text-white"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12">
            {loading ? "Criando conta..." : "Cadastrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Faça login</Link>
        </p>
      </div>
    </main>
  );
};

export default Cadastro;
