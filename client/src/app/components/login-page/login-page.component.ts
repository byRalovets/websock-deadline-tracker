import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  socket = new WebSocket('ws://localhost:8091/');
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/deadlines']).then();
    }

    const localTokenStorage = this.tokenStorage;
    const localRouter = this.router;

    this.socket.onmessage = function(event) {
      console.log(event.data);
      const response = JSON.parse(event.data);

      console.log(response);

      if (response.type == 'LOGIN_OK') {
        localTokenStorage.saveToken(response.payload.jwt);
        localTokenStorage.saveUser(response.payload.user);
        localRouter.navigate(['/deadlines']).then();
      }
    };
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.socket.send(JSON.stringify(
        {
          type: 'POST_LOGIN',
          payload: {
            email: this.email.trim(),
            password: this.password.trim()
          }
        }
      ));
    }
  }
}
