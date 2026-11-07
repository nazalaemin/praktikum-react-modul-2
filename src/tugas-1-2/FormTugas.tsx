import { useState, type FormEvent } from 'react';

type FormTugasProps = {
  onTambah: (judul: string) => void;
};

function FormTugas({ onTambah }: FormTugasProps) {
  const [judul, setJudul] = useState('');

  const terlaluPanjang = judul.length > 50;
  const tidakValid = judul.trim() === '' || terlaluPanjang;

  function tanganiSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tidakValid) return;
    onTambah(judul.trim());
    setJudul('');
  }

  return (
    <form onSubmit={tanganiSubmit}>
      <div className="baris">
        <label className="label-tersembunyi" htmlFor="judul-tugas">
          Nama tugas
        </label>
        <input
          id="judul-tugas"
          className="input"
          type="text"
          value={judul}
          onChange={(event) => setJudul(event.target.value)}
          placeholder="Contoh: Belajar React"
        />
        <button className="tombol" type="submit" disabled={tidakValid}>
          Tambah
        </button>
      </div>
      {terlaluPanjang && <p className="galat">Judul tugas maksimal 50 karakter.</p>}
    </form>
  );
}

export default FormTugas;
