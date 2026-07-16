"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Loader2, Key } from "lucide-react";
import { useTranslation } from "@/i18n/client";

export default function ConnexionPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"magic_link" | "password">("magic_link");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/mon-espace/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Vérifiez votre boîte mail pour le lien de connexion sécurisé." });
    }
    setLoading(false);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: "Email ou mot de passe incorrect." });
    } else {
      router.push("/mon-espace");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[400px]" style={{ background: "linear-gradient(135deg, #0F1C3F 0%, #233D8C 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-serif italic text-slate-900 mb-2">Connexion</h1>
            <p className="text-sm text-slate-500">Accédez à votre espace client La Croisière</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
              {message.text}
            </div>
          )}

          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setMode("magic_link")}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${mode === "magic_link" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Lien Magique
            </button>
            <button
              onClick={() => setMode("password")}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${mode === "password" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Mot de passe
            </button>
          </div>

          <form onSubmit={mode === "magic_link" ? handleMagicLink : handlePasswordLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Adresse Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#233D8C] focus:border-transparent outline-none transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {mode === "password" && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#233D8C] focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-4 bg-[#233D8C] hover:bg-[#1a2d6a] text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "magic_link" ? "Envoyer le lien" : "Se connecter"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Nouveau client ?{" "}
            <Link href="/mon-espace/inscription" className="text-[#233D8C] font-semibold hover:underline">
              Créer un compte
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
