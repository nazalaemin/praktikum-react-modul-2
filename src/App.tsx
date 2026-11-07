import { useState } from 'react';
import './App.css';
import DaftarTugas from './tugas-1-2/DaftarTugas';
import CatatanKeuangan from './tugas-3/CatatanKeuangan';

type Halaman = 'tugas12' | 'tugas3';

function App() {
  const [halaman, setHalaman] = useState<Halaman>('tugas12');

  return (
    <div className="wadah">
      <h1 className="judul">Praktikum Web - Modul 2: React Lanjutan</h1>
      <p className="subjudul">
        {halaman === 'tugas12'
          ? 'Tugas 1 & 2: Daftar Tugas Praktikum'
          : 'Tugas 3: Catatan Keuangan Mini'}
      </p>

      <div className="tab">
        <button
          className={halaman === 'tugas12' ? 'tombol tombol-filter aktif' : 'tombol tombol-filter'}
          onClick={() => setHalaman('tugas12')}
        >
          Tugas 1 & 2
        </button>
        <button
          className={halaman === 'tugas3' ? 'tombol tombol-filter aktif' : 'tombol tombol-filter'}
          onClick={() => setHalaman('tugas3')}
        >
          Tugas 3
        </button>
      </div>

      {halaman === 'tugas12' ? <DaftarTugas /> : <CatatanKeuangan />}
    </div>
  );
}

export default App;
