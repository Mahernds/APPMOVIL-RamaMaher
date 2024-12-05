import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importar la base de datos de Firebase

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(private db: AngularFireDatabase) { }

  // Función para encriptar los datos con una contraseña
  encryptData(data: string, password: string): string {
    const ciphertext = CryptoJS.AES.encrypt(data, password).toString();
    return ciphertext;
  }

  // Función para desencriptar los datos con la contraseña
  decryptData(ciphertext: string, password: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return originalData;
  }

  // Función para guardar los datos en Firebase de forma encriptada
  saveData(data: any, password: string): void {
    const encryptedData = this.encryptData(JSON.stringify(data), password);
    this.db.list('/secureData').push(encryptedData).then(() => {
      console.log('Datos encriptados guardados con éxito.');
    }).catch(error => {
      console.error('Error al guardar datos:', error);
    });
  }

  // Función para obtener los datos en Firebase y desencriptarlos
  getData(key: string, password: string): void {
    this.db.object(`/secureData/${key}`).valueChanges().subscribe(encryptedData => {
      if (encryptedData) {
        const decryptedData = this.decryptData(encryptedData as string, password);
        console.log('Datos desencriptados:', JSON.parse(decryptedData));
      }
    }, error => {
      console.error('Error al recuperar datos:', error);
    });
  }
}
