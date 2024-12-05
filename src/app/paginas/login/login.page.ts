<<<<<<< HEAD
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../servicios/data.service'; // Importa el servicio
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { ControladorService } from 'src/app/services/user-controller.service';
import { EncryptionService } from 'src/app/encryption.service';  // Asegúrate de que esta ruta esté correcta
>>>>>>> 03623c9 (Primer commit)

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
<<<<<<< HEAD
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private dataService: DataService) {} // Inyecta el servicio y Router

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido, enviar datos al servidor');

      // Guarda el correo en el servicio
      this.dataService.setCorreo(this.loginData.email);
      this.dataService.setContrasena(this.loginData.password);


      // Redirige a la página principal
      this.router.navigate(['/home']);
    } else {
      console.log('Formulario inválido');
    }
  }
=======

  usuario: string = "";
  password: string = "";
  user: any;
  isModalOpen = false;

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,
    private storage: Storage,
    private loginFirebase: FirebaseLoginService,
    private controlador: ControladorService,
    private encryptionService: EncryptionService  // Inyectar el servicio de encriptación
  ) { }

  async ngOnInit() {
    const storage = await this.storage.create();
  }

  // Valida que el email tenga @ y .
  validarEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Valida que la contraseña tenga al menos 5 caracteres
  validarPassword(password: string): boolean {
    return password.length >= 5;
  }

  async mensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  async MensajeError(mensaje: string) {
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Error en el inicio de sesión',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ingresar() {
    if (this.usuario === "" && this.password === "") {
      console.log("No pueden estar los campos vacíos");
      this.MensajeError('Por favor, complete todos los campos.');
    } else if (!this.validarEmail(this.usuario)) {
      console.log("Correo electrónico no válido");
      this.MensajeError('Por favor, ingrese un correo electrónico válido.');
    } else if (!this.validarPassword(this.password)) {
      console.log("Contraseña demasiado corta");
      this.MensajeError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      // Iniciar sesión con Firebase
      this.loginFirebase.login(this.usuario, this.password).then(() => {
        // Obtener los datos del usuario
        this.controlador.ObtenerDatos(this.usuario).subscribe(user => {
          this.user = user;
        });

        console.log("Inicio exitoso");
        this.mensajeExito();

        // Encriptar los datos sensibles (correo y contraseña)
        const encryptedEmail = this.encryptionService.encryptData(this.usuario, 'miContraseñaSecreta');
        const encryptedPassword = this.encryptionService.encryptData(this.password, 'miContraseñaSecreta');

        // Almacenar los datos encriptados en el almacenamiento seguro
        this.storage.set("DatosUsuario", {
          nombre: this.user.data.nombre,
          correo: this.user.data.email,
          uid: this.user.data.uid
        });
        this.storage.set('email', encryptedEmail);  // Guardar el correo encriptado
        this.storage.set('password', encryptedPassword);  // Guardar la contraseña encriptada
        this.storage.set('SessionID', true);

        // Redirigir al Home
        this.route.navigate(["/home"]);
      }).catch(error => {
        console.log("Error en el inicio de sesión", error);
        this.MensajeError('Error al intentar iniciar sesión. Por favor, intente de nuevo.');
      });
    }
  }

  registrarse() {
    console.log("Registro");
    this.route.navigate(["/registro"]);
  }

  restablecer_contrasena() {
    console.log("restablecer-contrasena");
    this.route.navigate(["/restablecer-contrasena"]);
  }
>>>>>>> 03623c9 (Primer commit)
}
