import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private users = [
    { email: 'wan@gmail.com', password: '123', name: 'Kurniawan' },
    { email: 'user@mail.com', password: 'user123', name: 'User Biasa' },
  ];

  constructor() {}

  // 🔹 Generate token random
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
  getUser() {
    const authData = localStorage.getItem('auth');
    return authData ? JSON.parse(authData) : null;
  }

  // 🔹 Logout
  logout() {
    localStorage.removeItem('auth');
  }
}
