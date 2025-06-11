import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, UserPlus } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onBack }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el nombre en Firestore con el UID del usuario
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: fullName,
        email: email,
        creado: new Date()
      });

      alert('Usuario creado exitosamente.');
      onRegisterSuccess();
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error al registrar: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
        <div className="text-center mb-6">
          <UserPlus className="text-white mx-auto mb-2" size={36} />
          <h2 className="text-white text-xl font-semibold">Crear nuevo usuario</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-white text-sm">Nombre completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label className="text-white text-sm">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="relative">
            <label className="text-white text-sm">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 text-blue-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password || !fullName}
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? "Registrando..." : "Crear Usuario"}
          </button>
        </form>

        <button
          onClick={onBack}
          className="mt-6 text-sm text-blue-300 hover:text-white transition-colors block mx-auto"
        >
          ← Volver al login
        </button>
      </div>
    </div>
  );
};
