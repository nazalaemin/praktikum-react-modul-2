import type { ReactNode } from 'react';

type Warna = 'putih' | 'butter' | 'sky' | 'mint' | 'peach';

type KartuProps = {
  judul: string;
  warna?: Warna;
  children: ReactNode;
};

function Kartu({ judul, warna = 'putih', children }: KartuProps) {
  return (
    <section className={`kartu kartu-${warna}`}>
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

export default Kartu;
