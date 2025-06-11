import { Category, ConsecutiveDetail } from '../types';

export const generateConsecutive = (category: Category, userName: string = 'Abraham Ginez'): ConsecutiveDetail => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const randomNum1 = Math.floor(Math.random() * 9000) + 1000;
  const randomNum2 = Math.floor(Math.random() * 9000) + 1000;
  
  const code1 = `AGAC-${randomNum1}-${year.toString().slice(-2)}`;
  const code2 = `AGAC-${randomNum2}-${year.toString().slice(-2)}`;
  
  const dateString = `${day} de ${getMonthName(parseInt(month))}. de ${year} ${hours}:${minutes}`;
  
  return {
    id: `${category.id}-${Date.now()}`,
    category: category.name,
    date: dateString,
    codes: [code1, code2],
    user: userName,
    equipment: getEquipmentName(category.id),
    image: getEquipmentImage(category.id)
  };
};

const getMonthName = (month: number): string => {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 
                  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return months[month - 1];
};

const getEquipmentName = (categoryId: string): string => {
  const equipmentMap: { [key: string]: string } = {
    'acustica': 'Sonómetro Digital',
    'dimensional': 'Calibrador Vernier',
    'electrica': 'Multímetro Digital',
    'flujo': 'Caudalímetro',
    'frecuencia': 'Generador de Frecuencia',
    'fuerza': 'Dinamómetro',
    'humedad': 'Higrómetro Digital',
    'masa': 'Balanza Analítica',
    'presion': 'Manómetro Digital',
    'temperatura': 'Termómetro Infrarrojo'
  };
  return equipmentMap[categoryId] || 'Equipo de Medición';
};

const getEquipmentImage = (categoryId: string): string => {
  // Using placeholder equipment images
  const imageMap: { [key: string]: string } = {
    'acustica': 'https://images.pexels.com/photos/7624832/pexels-photo-7624832.jpeg?auto=compress&cs=tinysrgb&w=300',
    'dimensional': 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=300',
    'electrica': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
    'flujo': 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
    'frecuencia': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
    'fuerza': 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
    'humedad': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
    'masa': 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=300',
    'presion': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
    'temperatura': 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300'
  };
  return imageMap[categoryId] || 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300';
};