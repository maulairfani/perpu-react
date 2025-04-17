
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
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const documents = [
  { id: 1, title: 'Undang-Undang Pemajuan Kebudayaan', year: 2017, number: 5, status: 'Berlaku' },
  { id: 2, title: 'Undang-Undang Advokat', year: 2003, number: 18, status: 'Berlaku' },
  { id: 3, title: 'Undang-Undang Sistem Pendidikan Nasional', year: 2003, number: 20, status: 'Tidak Berlaku' },
  { id: 4, title: 'Undang-Undang Ketenagakerjaan', year: 2003, number: 13, status: 'Berlaku' },
  { id: 5, title: 'Undang-Undang Perkawinan', year: 1974, number: 1, status: 'Berlaku' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Add Document
        </button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Judul Dokumen</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Nomor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="font-medium">{doc.title}</div>
                </TableCell>
                <TableCell>{doc.year}</TableCell>
                <TableCell>{doc.number}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Berlaku' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {doc.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/view/${doc.id}`)}
                    className="px-2.5 py-1 text-xs whitespace-nowrap bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Lihat Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing 1-5 of 5 documents
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-muted/20" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-1 rounded hover:bg-muted/20" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
