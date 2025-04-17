import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const documents = [
  { id: 1, title: 'UU No. 5 Tahun 2017', description: 'Tentang Pemajuan Kebudayaan' },
  { id: 2, title: 'UU No. 18 Tahun 2003', description: 'Tentang Advokat' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="bg-card rounded-lg border border-border/10">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Daftar Undang-Undang</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.description}</TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/view/${doc.id}`)}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90"
                  >
                    Lihat Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;