
import axios from 'axios';
import { auth } from './firebase';

const API_BASE_URL = 'https://afba0aa7-ab05-4aeb-8b28-538b2c965ed0-00-3qxw5ozf8i6wf.pike.replit.dev/';
// const API_BASE_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include id-token
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      // config.headers['id-token'] = token;
      config.headers['test-uid'] = "#test-uid"
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
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
  },

  // Mengambil detail dokumen
  getDocumentDetail: async (documentId) => {
    try {
      const response = await api.get(`/api/v1/admin/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil detail dokumen: ' + error.message);
    }
  },

  updateNode: async (documentId, nodeId, nodeData) => {
    try {
      console.log(documentId)
      console.log(nodeId)
      console.log(nodeData)
      const response = await api.post('/api/v1/admin/documents/update', {
        doc_id: documentId,
        node_id: nodeId,
        node_update: nodeData
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengupdate node: ' + error.message);
    }
  }
};
