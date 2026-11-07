import { useState, type FormEvent } from 'react';
import type { Jenis } from './types';

type DataBaru = { keterangan: string; nominal: number; jenis: Jenis };

type FormTransaksiProps = {
  onTambah: (data: DataBaru) => void;
};

function FormTransaksi({ onTambah }: FormTransaksiProps) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');
  const [jenis, setJenis] = useState<Jenis>('pemasukan');

  const nominalAngka = Number(nominal);
  const nominalSalah = nominal !== '' && (isNaN(nominalAngka) || nominalAngka <= 0);
  const tidakValid = keterangan.trim() === '' || nominal === '' || nominalSalah;

  function tanganiSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tidakValid) return;
    onTambah({ keterangan: keterangan.trim(), nominal: nominalAngka, jenis });
    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
  }

  return (
    <form onSubmit={tanganiSubmit}>
      <div className="kolom">
        <input
          className="input"
          type="text"
          placeholder="Keterangan (contoh: Gaji bulanan)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
        <div className="dua-kolom">
          <input
            className="input"
            type="number"
            placeholder="Nominal (Rp)"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          />
          <select
            className="input"
            value={jenis}
            onChange={(e) => setJenis(e.target.value as Jenis)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>
        <button className="tombol" type="submit" disabled={tidakValid}>
          Tambah Transaksi
        </button>
      </div>
      {nominalSalah && <p className="galat">Nominal harus berupa angka lebih dari 0.</p>}
    </form>
  );
}

export default FormTransaksi;
