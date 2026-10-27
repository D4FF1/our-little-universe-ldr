# Our Little Universe — LDR Edition 💗

Website kecil untuk Alzenna Ayra Natasya, dibuat dengan HTML, CSS, dan JavaScript murni. Dirancang untuk pasangan LDR yang belum punya foto bersama: tidak ada foto, tanggal pertemuan, atau kenangan spesifik yang dikarang.

## Isi website
- Hero dengan ilustrasi dua planet yang terhubung.
- Surat digital yang bisa kamu edit.
- Langit malam interaktif: klik bintang untuk membuka pesan.
- Pengingat acak dan tombol salin pesan.
- Tombol kejutan dengan animasi hati.
- Pesan penutup yang bisa dibuka.
- Responsif untuk HP dan desktop.
- Tidak membutuhkan backend, database, atau build tools.

## Jalankan di VS Code
1. Ekstrak ZIP ini.
2. Buka folder `our-little-universe-ldr` di VS Code.
3. Buka `index.html` langsung di browser, atau gunakan ekstensi **Live Server** lalu klik **Go Live**.

## Personalisasi sebelum dikirim
Buka `index.html` dan cari bagian `A little letter` serta `final-message`, lalu ubah kata-katanya agar terdengar seperti gaya chat kamu sendiri.

Buka `script.js` untuk mengedit:
- `skyMessages`: pesan yang muncul saat bintang diklik.
- `reminders`: pengingat acak.

Cari dan ganti teks dengan hati-hati. Jangan masukkan informasi pribadi yang tidak ingin dibagikan melalui situs publik.

## Deploy ke GitHub Pages
1. Buat repository GitHub baru, misalnya `our-little-universe`.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu tekan **Save**.
6. Tunggu proses deployment selesai. URL biasanya berbentuk `https://USERNAME.github.io/our-little-universe/`.

## Catatan
- Website ini statis; tidak ada login, server, atau database.
- Teks yang kamu edit di source akan terlihat oleh siapa pun yang bisa membuka situs.
- Font memakai Google Fonts; jika offline, font akan kembali ke font cadangan.
- Tidak ada countdown pertemuan karena tanggalnya belum diberikan.
