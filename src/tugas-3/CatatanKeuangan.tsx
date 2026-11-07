import { useState, useEffect } from 'react';
import Kartu from '../Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import { formatRupiah } from './format';
import type { Transaksi, Jenis } from './types';

function CatatanKeuangan() {
  const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>(() => {
    const dataTersimpan = localStorage.getItem('catatan-keuangan');
    return dataTersimpan ? (JSON.parse(dataTersimpan) as Transaksi[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('catatan-keuangan', JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  const tambahTransaksi = (data: { keterangan: string; nominal: number; jenis: Jenis }) => {
    const transaksiBaru: Transaksi = { id: Date.now(), ...data };
    setDaftarTransaksi([...daftarTransaksi, transaksiBaru]);
  };

  const hapusTransaksi = (id: number) => {
    setDaftarTransaksi(daftarTransaksi.filter((t) => t.id !== id));
  };

  const totalMasuk = daftarTransaksi
    .filter((t) => t.jenis === 'pemasukan')
    .reduce((jumlah, t) => jumlah + t.nominal, 0);
  const totalKeluar = daftarTransaksi
    .filter((t) => t.jenis === 'pengeluaran')
    .reduce((jumlah, t) => jumlah + t.nominal, 0);
  const saldo = totalMasuk - totalKeluar;

  return (
    <div>

      <Kartu judul="Saldo Saat Ini" warna={saldo >= 0 ? 'mint' : 'peach'}>
        <p className="saldo">
          {saldo < 0 ? '- ' : ''}{formatRupiah(Math.abs(saldo))}
        </p>
        <div className="chip-baris">
          <span className="chip chip-masuk">Pemasukan {formatRupiah(totalMasuk)}</span>
          <span className="chip chip-keluar">Pengeluaran {formatRupiah(totalKeluar)}</span>
        </div>
      </Kartu>

      <Kartu judul="Tambah Transaksi" warna="sky">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      <Kartu judul="Daftar Transaksi">
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Yuk catat transaksi pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((t) => (
              <ItemTransaksi key={t.id} transaksi={t} onHapus={hapusTransaksi} />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default CatatanKeuangan;
