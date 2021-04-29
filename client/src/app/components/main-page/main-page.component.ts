import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {UserDTO} from '../../model/userDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isAuthenticated = false;
  user: UserDTO | undefined;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (!this.tokenStorage.getUser()) {
      this.isAuthenticated = false;
      this.user = undefined;
      this.router.navigate(['']).then();
    } else {
      this.isAuthenticated = true;
      this.user = this.tokenStorage.getUser() as UserDTO;
    }
  }

  onLogOutClick(): void {
    this.isAuthenticated = false;
    this.user = undefined;
    this.tokenStorage.signOut()
  }
}
