export interface AuthToken {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}

export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
}

class AuthStorage {
  private readonly TOKEN_KEY = 'mystical_auth_token';
  private readonly USER_KEY = 'mystical_user';

  setToken(authToken: AuthToken): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(authToken));
  }

  getToken(): AuthToken | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.TOKEN_KEY);
    if (!stored) return null;
    
    try {
      const token = JSON.parse(stored) as AuthToken;
      if (Date.now() > token.expiresAt) {
        this.clearToken();
        return null;
      }
      return token;
    } catch {
      this.clearToken();
      return null;
    }
  }

  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.USER_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }

  clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}

export const authStorage = new AuthStorage();

export interface LoginRequest {
  emailOrPhone: string;
  code?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
  requiresVerification?: boolean;
}

export class AuthAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async sendVerificationCode(emailOrPhone: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone }),
    });

    if (!response.ok) {
      throw new Error('Failed to send verification code');
    }
  }

  async verifyCode(emailOrPhone: string, code: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone, code }),
    });

    if (!response.ok) {
      throw new Error('Invalid verification code');
    }

    return response.json();
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  }
}

export const authAPI = new AuthAPI();