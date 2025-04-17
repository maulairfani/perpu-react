
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
import { LineChart, TrendingUp, Users, Activity } from 'lucide-react';

const documents = [
  { id: 1, title: 'UU No. 5 Tahun 2017', description: 'Tentang Pemajuan Kebudayaan' },
  { id: 2, title: 'UU No. 18 Tahun 2003', description: 'Tentang Advokat' },
];

const StatCard = ({ title, value, trend, description, icon: Icon }) => (
  <div className="bg-card rounded-lg p-6 border border-border/10">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-semibold mt-2">{value}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
      <span className="text-green-500">{trend}</span>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Dokumen"
          value="1,234"
          trend="+20% dari bulan lalu"
          description="Total dokumen yang tersedia"
          icon={LineChart}
        />
        <StatCard
          title="Pengguna Aktif"
          value="45,678"
          trend="+12.5% dari bulan lalu"
          description="Pengguna yang aktif mengakses"
          icon={Users}
        />
        <StatCard
          title="Total Akses"
          value="98,765"
          trend="+15.2% dari bulan lalu"
          description="Total akses dokumen"
          icon={Activity}
        />
        <StatCard
          title="Tingkat Engagement"
          value="4.5%"
          trend="+4.6% dari bulan lalu"
          description="Rata-rata waktu baca"
          icon={TrendingUp}
        />
      </div>

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
