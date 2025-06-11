import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface LoginScreenProps {
  onLogin: (fullName: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // 🔍 Buscar nombre desde Firestore
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      const nombre = docSnap.exists() ? docSnap.data().nombre : user.email;

      onLogin(nombre, password);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Credenciales incorrectas o problema de red.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl">
            <Zap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">QualityControl</h1>
          <p className="text-blue-200">Sistema de Consecutivos</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400" />
                <span className="text-blue-200 text-sm">Recordarme</span>
              </label>
              <button type="button" className="text-blue-300 hover:text-white text-sm transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-blue-300 hover:text-white text-sm"
            >
              ¿No tienes cuenta? Crear una
            </button>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-blue-200 text-xs text-center mb-2">Credenciales reales creadas desde Firebase:</p>
            <p className="text-white text-xs text-center">Correo: <span className="font-mono">usuario@ejemplo.com</span></p>
            <p className="text-white text-xs text-center">Contraseña: <span className="font-mono">********</span></p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-blue-300 text-sm">© 2025 Equipos y Servicios AG. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};
