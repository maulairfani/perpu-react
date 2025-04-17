
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { documentService } from '../../services/api';

const Home = ({ searchQuery = '' }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [allDocuments, setAllDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const documents = await documentService.getDocuments();
        setAllDocuments(documents);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredDocuments = allDocuments
    .filter(doc => 
      (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.year.toString().includes(searchQuery) ||
      doc.number.toString().includes(searchQuery)) &&
      (statusFilter === 'all' || doc.status === statusFilter)
    )
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (typeof a[sortField] === 'string') {
        return multiplier * a[sortField].localeCompare(b[sortField]);
      }
      return multiplier * (a[sortField] - b[sortField]);
    });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const documents = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="Berlaku">Berlaku</option>
          <option value="Tidak Berlaku">Tidak Berlaku</option>
        </select>
      </div>

      <div className="border rounded-lg">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading documents...</div>
        ) : error ? (
          <div className="p-8 text-center text-destructive">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="w-[400px] cursor-pointer hover:bg-muted/20"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    Judul Dokumen
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/20 w-[100px]"
                  onClick={() => handleSort('year')}
                >
                  <div className="flex items-center">
                    Tahun
                    {sortField === 'year' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/20 w-[100px]"
                  onClick={() => handleSort('number')}
                >
                  <div className="flex items-center">
                    Nomor
                    {sortField === 'number' && (
                      sortDirection === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1 w-4 h-4" /> : <ChevronDown className="inline ml-1 w-4 h-4" />
                  )}
                </TableHead>
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
        )}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} documents
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 rounded hover:bg-muted/20 disabled:opacity-50" 
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="p-1 rounded hover:bg-muted/20 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
