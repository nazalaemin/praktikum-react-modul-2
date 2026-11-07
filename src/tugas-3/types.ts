export type Jenis = 'pemasukan' | 'pengeluaran';

export type Transaksi = {
  id: number;
  keterangan: string;
  nominal: number;
  jenis: Jenis;
};
