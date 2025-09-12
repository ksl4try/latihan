import { Injectable } from '@angular/core';

// Service autentikasi sederhana untuk aplikasi Ionic/Angular.
// - Disediakan di root sehingga bisa di-inject dari mana saja.
// - Menyimpan status login di localStorage (key: 'auth') berisi { email, name, token, expiry }.
// - Masa berlaku token: 5 menit (dikelola di properti 'expiry').
// - Dipakai oleh:
//   - src/app/pages/login/login.page.ts       -> proses login
//   - src/app/tabs/dashboard/dashboard.page.ts -> cek login + ambil user
//   - src/app/pages/karyawan-list/karyawan-list.page.ts -> cek login + ambil user
//   - src/app/pages/karyawan-detail/karyawan-detail.page.ts -> cek login + ambil user
//   - src/app/pages/karyawan-form/karyawan-form.page.ts -> cek login + ambil user
//   - src/app/tabs/tab2/tab2.page.ts -> cek login + ambil user
@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Daftar user statis untuk simulasi login lokal.
  // Hanya dipakai oleh method login() untuk validasi kredensial.
  private users = [
    { email: 'wan@gmail.com', password: '123', name: 'Kurniawan' },
    { email: 'user@gmail.com', password: 'user123', name: 'User Biasa' },
  ];

  // Constructor kosong; belum memerlukan dependency apa pun.
  constructor() {}

  // 🔹 Generate token random
  // Utility: menghasilkan token acak sebagai penanda sesi.
  // Hanya dipakai di login() lalu disimpan ke localStorage.
  // dY"1 Generate token random
  private generateToken(length: number = 32): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  // 🔹 Login function
  // Login:
  // - Memvalidasi email/password terhadap daftar 'users'.
  // - Jika valid, membuat token + expiry (5 menit), lalu menyimpan ke localStorage dengan key 'auth'.
  // - Dipanggil dari: src/app/pages/login/login.page.ts.
  // dY"1 Login function
  login(
    email: string,
    password: string
  ): { success: boolean; message: string } {
    const foundUser = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const token = this.generateToken();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 menit

      const userData = {
        email: foundUser.email,
        name: foundUser.name,
        token,
        expiry,
      };

      localStorage.setItem('auth', JSON.stringify(userData));
      return { success: true, message: 'Login berhasil' };
    }

    return { success: false, message: 'Email atau password salah' };
  }

  // 🔹 Cek apakah user masih login
  // Cek status login:
  // - Mengembalikan true jika ada data 'auth' dan belum kedaluwarsa.
  // - Jika sudah lewat 'expiry', hapus data 'auth' lalu kembalikan false.
  // - Digunakan di: dashboard.page.ts, karyawan-*.page.ts, tab2.page.ts.
  // dY"1 Cek apakah user masih login
  isAuthenticated(): boolean {
    const authData = localStorage.getItem('auth');
    if (!authData) return false;

    const parsed = JSON.parse(authData);
    if (Date.now() < parsed.expiry) {
      return true;
    }

    localStorage.removeItem('auth');
    return false;
  }

  // 🔹 Ambil data user
  // Ambil data user dari localStorage untuk ditampilkan di UI.
  // Mengembalikan object { email, name, token, expiry } atau null.
  // dY"1 Ambil data user
  getUser() {
    const authData = localStorage.getItem('auth');
    return authData ? JSON.parse(authData) : null;
  }

  // 🔹 Logout
  // Logout:
  // - Menghapus data 'auth' dari localStorage.
  // - Belum dipakai di halaman mana pun; siapkan untuk tombol Logout.
  // dY"1 Logout
  logout() {
    localStorage.removeItem('auth');
  }
}
