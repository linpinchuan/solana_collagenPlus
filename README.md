# SOL Collagen Plus — Landing Page

Fail dalam pek ini:

- `index.html` — laman web anda (satu fail sahaja, semua gambar sudah dibenamkan di dalamnya)
- `google-apps-script.gs` — kod untuk hantar data tempahan ke Google Sheet (Excel)
- `README.md` — panduan ini

---

## 1. Cara letak website di Netlify

1. Pergi ke [https://app.netlify.com](https://app.netlify.com) dan log masuk / daftar akaun (percuma).
2. Pada dashboard, cari kawasan **"Add new site" > "Deploy manually"** (atau "drag and drop").
3. Drag fail **`index.html`** sahaja ke kawasan tersebut (tak perlu folder `images`, sebab gambar sudah terbenam dalam fail HTML).
4. Netlify akan terbitkan laman anda serta-merta dan berikan URL seperti `random-name-123.netlify.app`.
5. Anda boleh tukar nama domain di **Site settings > Change site name**, atau sambungkan domain sendiri di **Domain settings**.

---

## 2. Cara setup supaya tempahan masuk terus ke Excel/Google Sheet

Website ini menggunakan **Google Sheets** sebagai "Excel" anda secara automatik (percuma, tiada perlu backend/server sendiri).

1. Pergi ke [https://sheets.google.com](https://sheets.google.com) dan buat spreadsheet baru.
   Namakan contohnya **"SOL Collagen Plus - Orders"**.
2. Pada baris pertama (Row 1), taip tajuk lajur berikut secara tepat:
   ```
   Timestamp | Full Name | Phone | Address | Postcode | Package | Total (RM)
   ```
3. Klik **Extensions > Apps Script**.
4. Padam kod contoh yang ada, dan **copy-paste semua isi kandungan fail `google-apps-script.gs`** (dalam pek ini) ke dalamnya.
5. Klik **Deploy > New deployment**.
6. Klik ikon gear ⚙️ di sebelah "Select type", pilih **Web app**.
7. Isi:
   - Description: `SOL Order Receiver`
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Klik **Deploy**. Google akan minta kebenaran (authorize) — benarkan sahaja.
9. Copy **Web app URL** yang diberikan (URL akan berakhir dengan `/exec`).
10. Buka fail `index.html` dengan text editor (Notepad / VS Code), cari baris ini (dekat bahagian bawah fail, dalam `<script>`):
    ```js
    const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";
    ```
    Gantikan `PASTE_GOOGLE_APPS_SCRIPT_URL_HERE` dengan URL yang anda copy tadi. Contoh:
    ```js
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
    ```
11. Simpan fail, dan upload semula `index.html` ke Netlify (drag & drop semula ke dashboard Netlify anda, atau guna "Deploys" tab untuk upload versi baru).

Selepas ini, setiap kali pelanggan buat tempahan di website, satu baris baru akan automatik masuk ke dalam Google Sheet anda. Bila-bila masa anda boleh buka Google Sheet tersebut dan pergi ke **File > Download > Microsoft Excel (.xlsx)** untuk dapatkan salinan Excel.

---

## 3. Cara setup Facebook Pixel (untuk FB Ads)

1. Pergi ke **Meta Events Manager** (business.facebook.com/events_manager).
2. Cari/salin **Pixel ID** anda (nombor macam `1234567890123456`).
3. Buka fail `index.html`, cari **dua tempat** berikut di bahagian atas fail (`<head>`):
   ```js
   fbq('init', 'PIXEL_ID_HERE');
   ```
   dan
   ```html
   src="https://www.facebook.com/tr?id=PIXEL_ID_HERE&ev=PageView&noscript=1"
   ```
4. Gantikan **kedua-dua** `PIXEL_ID_HERE` dengan Pixel ID sebenar anda.
5. Simpan dan upload semula ke Netlify.

Pixel akan secara automatik menembak:
- **PageView** — bila pelanggan buka laman
- **InitiateCheckout** — bila pelanggan pilih satu pakej
- **Purchase** — bila pelanggan berjaya hantar borang tempahan (dengan nilai RM mengikut pakej dipilih)

Anda boleh guna event **Purchase** ini sebagai "Conversion Event" semasa buat kempen iklan di Meta Ads Manager.

---

## 4. Nota lain

- Borang tempahan ada **pengesahan (validation)**: nama sekurang-kurangnya 3 aksara, no. telefon bermula dengan 0, alamat sekurang-kurangnya 8 aksara, dan poskod mesti 5 digit.
- Ruangan **"Negeri"** sengaja **tidak dimasukkan** seperti permintaan anda — hanya Alamat + Poskod.
- Mesej terima kasih (Bahasa Melayu) akan terpapar automatik selepas tempahan berjaya:
  > "Terima kasih atas pesanan anda. Barang akan sampai dalam tempoh 2 hingga 4 hari."
- Laman ini reka bentuk **mobile-first** — sesuai dipaparkan di dalam apps Facebook/Instagram semasa pelanggan klik iklan anda dari telefon.
- Harga pakej semasa:
  - Pakej 1: 1 Botol — RM69 + RM5 penghantaran (Jumlah RM74)
  - Pakej 2: Beli 1 Percuma 1 (2 Botol) — RM99, penghantaran percuma
  - Pakej 3: Beli 1 Percuma 2 (3 Botol) — RM129, penghantaran percuma

Untuk tukar harga, cari bahagian `pkg-grid` dalam `index.html` dan ubah nilai `data-price`, `data-ship`, `data-total`, serta teks harga yang dipaparkan.
