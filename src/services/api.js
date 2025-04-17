import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const treeService = {
  // Mengambil seluruh data tree
  getAllNodes: async () => {
    try {
      const response = await api.get('/nodes');
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengambil data tree: ' + error.message);
    }
  },

  // Menambah node baru
  addNode: async (parentPath, newNode) => {
    try {
      const response = await api.post('/nodes', {
        parentPath,
        node: newNode,
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal menambah node: ' + error.message);
    }
  },

  // Mengupdate node yang ada
  updateNode: async (path, updatedNode) => {
    try {
      const response = await api.put(`/nodes`, {
        path,
        node: updatedNode,
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal mengupdate node: ' + error.message);
    }
  },

  // Menghapus node
  deleteNode: async (path) => {
    try {
      const response = await api.delete('/nodes', {
        data: { path },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal menghapus node: ' + error.message);
    }
  },
};

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
};