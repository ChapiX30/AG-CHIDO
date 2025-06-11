import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAftoNDVHJ2Ec_wrcZQbTf9ZKydzyamb10",
  authDomain: "ag-chido.firebaseapp.com",
  projectId: "ag-chido",
  storageBucket: "ag-chido.appspot.com",
  messagingSenderId: "846729527198",
  appId: "1:846729527198:web:0b9bebf757a9070a43208f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const CategoryDetailScreen = () => {
  const { magnitud } = useParams();
  const navigate = useNavigate();
  const [generando, setGenerando] = useState(false);
  const [total, setTotal] = useState(0);
  const [hoy, setHoy] = useState(0);
  const [consecutivos, setConsecutivos] = useState([]);

  const prefijos = {
    dimensional: "AGD",
    flujo: "AGFL",
    presion: "AGP",
    fuerza: "AGF",
    electrica: "AGEL",
    acustica: "AGAC"
  };

  const generarConsecutivo = async () => {
    setGenerando(true);
    try {
      const año = new Date().getFullYear().toString().slice(-2);
      const numero = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
      const prefijo = prefijos[magnitud?.toLowerCase()] || "AGX";
      const consecutivo = `${prefijo}-${numero}-${año}`;

      await addDoc(collection(db, "consecutivos"), {
        fecha: Timestamp.now(),
        magnitud,
        usuario: "Abraham Ginez",
        consecutivo
      });

      navigate("/worksheet", { state: { consecutivo, magnitud } });
    } catch (error) {
      console.error("Error al generar consecutivo:", error);
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-500 text-white p-3 rounded-xl">
          <span className="text-2xl">⚡</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold capitalize">{magnitud}</h2>
          <p className="text-gray-500 text-sm">Generación de consecutivos</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-blue-700">Total generados</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold">{hoy}</p>
          <p className="text-green-700">Hoy</p>
        </div>
      </div>

      <button
        onClick={generarConsecutivo}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl mb-4 flex items-center justify-center"
        disabled={generando}
      >
        {generando ? (
          <>
            <span className="animate-spin mr-2">⭕</span>
            Generando...
          </>
        ) : (
          <>➕ Generar Consecutivo</>
        )}
      </button>

      <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl" disabled>
        ↩️ Deshacer Último
      </button>
    </div>
  );
};
