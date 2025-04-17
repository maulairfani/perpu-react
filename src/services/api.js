import axios from 'axios';

// const API_BASE_URL = import.meta.env.API_BASE_URL
const API_BASE_URL = 'https://afba0aa7-ab05-4aeb-8b28-538b2c965ed0-00-3qxw5ozf8i6wf.pike.replit.dev/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentService = {
  // Mengambil metadata dokumen
  getDocumentMetadata: async () => {
    try {
      const response = await api.get('/document/metadata');
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil metadata dokumen: ' + error.message);
    }
  },

  // Mengambil daftar dokumen
  getDocuments: async () => {
    try {
      const response = await api.get('/api/v1/admin/documents');
      return response.data.documents;
    } catch (error) {
      throw new Error('Gagal mengambil daftar dokumen: ' + error.message);
    }
  }
};