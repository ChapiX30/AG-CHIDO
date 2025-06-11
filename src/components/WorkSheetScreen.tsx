import React, { useState } from 'react';

interface WorkSheetScreenProps {
  consecutivo: string;
  onBack: () => void;
}

export const WorkSheetScreen: React.FC<WorkSheetScreenProps> = ({ consecutivo, onBack }) => {
  const [cliente, setCliente] = useState('');
  const [equipo, setEquipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [notas, setNotas] = useState('');
  const [magnitud, setMagnitud] = useState('');

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hoja de trabajo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">N. Certificado</label>
            <input value={consecutivo} readOnly className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Magnitud</label>
            <input value={magnitud} onChange={e => setMagnitud(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Cliente</label>
            <input value={cliente} onChange={e => setCliente(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Equipo</label>
            <input value={equipo} onChange={e => setEquipo(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Marca</label>
            <input value={marca} onChange={e => setMarca(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Modelo</label>
            <input value={modelo} onChange={e => setModelo(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Temperatura ambiente (°C)</label>
            <input value={temperatura} onChange={e => setTemperatura(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Humedad relativa (%)</label>
            <input value={humedad} onChange={e => setHumedad(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Notas</label>
          <textarea value={notas} onChange={e => setNotas(e.target.value)} className="w-full border rounded px-3 py-2" rows={3}></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded">
            ← Regresar
          </button>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
