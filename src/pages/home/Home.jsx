
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
  { id: 1, title: 'UU No. 5 Tahun 2017', description: 'Tentang Pemajuan Kebudayaan', status: 'Done', target: 18, limit: 5, reviewer: 'Eddie Lake' },
  { id: 2, title: 'UU No. 18 Tahun 2003', description: 'Tentang Advokat', status: 'In Progress', target: 29, limit: 24, reviewer: 'Jamik Tashpulatov' },
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
              <TableHead className="w-[300px]">Document Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted-foreground">{doc.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </TableCell>
                <TableCell>{doc.target}</TableCell>
                <TableCell>{doc.limit}</TableCell>
                <TableCell>{doc.reviewer}</TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/view/${doc.id}`)}
                    className="p-2 hover:bg-muted/20 rounded-md"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing 1-2 of 2 documents
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
