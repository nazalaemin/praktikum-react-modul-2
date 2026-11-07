import type { Transaksi } from './types';
import { formatRupiah } from './format';

type ItemTransaksiProps = {
  transaksi: Transaksi;
  onHapus: (id: number) => void;
};

function ItemTransaksi({ transaksi, onHapus }: ItemTransaksiProps) {
  const pemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>
      <strong className={pemasukan ? 'chip chip-masuk' : 'chip chip-keluar'}>
        {pemasukan ? '+' : '-'} {formatRupiah(transaksi.nominal)}
      </strong>
      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;
