import { useState, useEffect } from 'react';
import Kartu from '../Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';
import type { Tugas } from './types';


type Filter = 'semua' | 'belum' | 'selesai';

function DaftarTugas() {
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan) as Tugas[];
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // TUGAS 1: state filter
  const [filter, setFilter] = useState<Filter>('semua');

  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!');
  }, []);

  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  const tambahTugas = (judul: string) => {
    const tugasBaru: Tugas = { id: Date.now(), judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  const ubahStatus = (id: number) => {
    setDaftarTugas(
      daftarTugas.map((tugas) =>
        tugas.id === id ? { ...tugas, selesai: !tugas.selesai } : tugas
      )
    );
  };

  const hapusTugas = (id: number) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // TUGAS 2: hapus semua yang selesai
  const hapusSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // TUGAS 1: .filter() sebelum .map()
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true;
  });

  const opsiFilter: { nilai: Filter; label: string }[] = [
    { nilai: 'semua', label: 'Semua' },
    { nilai: 'belum', label: 'Belum Selesai' },
    { nilai: 'selesai', label: 'Selesai' },
  ];

  return (
    <div>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru" warna="sky">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        <div className="baris filter">
          {opsiFilter.map((opsi) => (
            <button
              key={opsi.nilai}
              className={
                filter === opsi.nilai
                  ? 'tombol tombol-kecil tombol-filter aktif'
                  : 'tombol tombol-kecil tombol-filter'
              }
              onClick={() => setFilter(opsi.nilai)}
            >
              {opsi.label}
            </button>
          ))}
        </div>

        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasTampil.length === 0 ? (
          <p className="kosong">Tidak ada tugas pada filter ini.</p>
        ) : (
          <ul className="daftar">
            {tugasTampil.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}

        {jumlahSelesai > 0 && (
          <button className="tombol tombol-merah tombol-kecil" onClick={hapusSelesai}>
            Hapus Semua yang Selesai ({jumlahSelesai})
          </button>
        )}
      </Kartu>
    </div>
  );
}

export default DaftarTugas;
