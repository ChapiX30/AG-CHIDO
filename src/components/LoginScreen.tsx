import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // ✅ añadido

interface LoginScreenProps {
  onLogin: (fullName: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ añadido

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      const nombre = docSnap.exists() ? docSnap.data().nombre : user.email;

      onLogin(nombre, password);
      navigate("/main"); // ✅ redirección aquí
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Credenciales incorrectas o problema de red.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 🧠 Tu diseño original intacto
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* ... resto del JSX sin cambios ... */}
      {/* TODO TU DISEÑO AQUÍ SIN CAMBIOS */}
    </div>
  );
};
