import axios from 'axios';
import { FormData } from '../types/FormData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const sendContractEmail = async (formData: FormData, pdfData: Uint8Array) => {
  try {
    const response = await axios.post(`${API_URL}/api/contract`, {
      formData,
      pdfData: Array.from(pdfData) // Convert Uint8Array to regular array for JSON serialization
    });
    return response.data;
  } catch (error) {
    console.error('Error sending contract:', error);
    throw error;
  }
};