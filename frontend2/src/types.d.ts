declare module 'fernet' {
    export class Fernet {
      constructor(secretKey: string);
      decrypt(encrypted: string): string;
      encrypt(plainText: string): string;
    }
  }
  