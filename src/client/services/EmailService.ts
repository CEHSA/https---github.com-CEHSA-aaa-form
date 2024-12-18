import axios from 'axios';
import { FormData } from '../../types/FormData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const sendContractEmail = async (formData: FormData, pdfBuffer: Buffer) => {
  try {
    const response = await axios.post(`${API_URL}/api/contract`, {
      formData,
      pdfBuffer
    });
    return response.data;
  } catch (error) {
    console.error('Error sending contract:', error);
    throw error;
  }
};