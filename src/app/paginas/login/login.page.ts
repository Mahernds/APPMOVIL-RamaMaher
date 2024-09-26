import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../servicios/data.service'; // Importa el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
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
}
