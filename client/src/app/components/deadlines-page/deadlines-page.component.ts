import {Component, OnInit} from '@angular/core';
import {FieldsService} from '../../services/deadlines/fields.service';
import {DeadlineDTO} from '../../model/deadlineDTO';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {UserDTO} from '../../model/userDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deadlines-page',
  templateUrl: './deadlines-page.component.html',
  styleUrls: ['./deadlines-page.component.css']
})
export class DeadlinesPageComponent implements OnInit {

  socket = new WebSocket('ws://localhost:8091/');
  isAuthenticated = false;
  user: UserDTO | undefined;
  deadlines: Array<DeadlineDTO> | undefined = [];

  title = '';
  description = '';
  expirationDate = '';
  activeDeadline: DeadlineDTO | undefined;

  constructor(private deadlinesService: FieldsService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getUser()) {
      this.isAuthenticated = false;
      this.user = undefined;
      this.router.navigate(['']).then();
    } else {
      this.isAuthenticated = true;
      this.user = this.tokenStorage.getUser() as UserDTO;

      const u = this.user;

      setTimeout(() => {
        this.socket.send(JSON.stringify(
          {
            type: 'GET_DEADLINES',
            payload: {
              authorId: u._id
            }
          }
        ))
      }, 1000);
    }

    this.socket.onmessage = event => {
      const response = JSON.parse(event.data);

      console.log(response);

      if (response.type == 'GET_DEADLINES_OK') {
        this.deadlines = response.payload.deadlines;
          if (!this.deadlines || this.deadlines?.length === 0) {
            this.deadlines = undefined;
          }
      }

      if (response.type == 'POST_DEADLINE_OK') {
        // localTokenStorage.saveToken(response.payload.jwt);
        // localTokenStorage.saveUser(response.payload.user);
        // localRouter.navigate(['/deadlines']).then();
          if (!this.deadlines) {
            this.deadlines = [];
          }
          this.deadlines?.push(response.payload.deadline);
      }

      if (response.type == 'PUT_DEADLINE_OK') {
        // localTokenStorage.saveToken(response.payload.jwt);
        // localTokenStorage.saveUser(response.payload.user);
        // localRouter.navigate(['/deadlines']).then();
      }

      if (response.type == 'DELETE_DEADLINE_OK') {
        console.log('Successfully deleted');
      }
    };
  }

  onLogOutClick(): void {
    this.isAuthenticated = false;
    this.user = undefined;
    this.tokenStorage.signOut();
  }

  onDeleteClick(id: string | undefined): void {
    if (this.deadlines && id) {
      for (let i = 0; i < this.deadlines.length; i++) {
        if (this.deadlines[i]._id === id) {
          this.deadlines.splice(i, 1);
          this.socket.send(JSON.stringify(
            {
              type: 'DELETE_DEADLINE',
              payload: {
                deadlineId: id
              }
            }
          ));
        }
      }
    }

    if (this.deadlines?.length === 0) {
      this.deadlines = undefined;
    }
  }

  onModalClose(): void {
    this.activeDeadline = undefined;
    this.title = '';
    this.expirationDate = '';
    this.description = '';
  }

  onModalSubmit(): void {
    console.log('Title: ' + this.title);
    console.log('Expiration Date: ' + this.expirationDate);
    console.log('Description: ' + this.description);
    console.log(this.tokenStorage.getUser()._id);

    if (this.activeDeadline) {
      this.activeDeadline.title = this.title;
      this.activeDeadline.expirationDate = this.expirationDate;
      this.activeDeadline.description = this.description;

      // this.deadlinesService.updateDeadline(this.activeDeadline).subscribe(data => {
      //   console.log('UPDATED: ' + data);
      // });

      this.socket.send(JSON.stringify(
        {
          type: 'PUT_DEADLINE',
          payload: {
            deadline: this.activeDeadline,
            deadlineId: this.activeDeadline._id
          }
        }
      ));

    } else {
      let newDeadline = new DeadlineDTO(
        undefined,
        this.title,
        this.tokenStorage.getUser()._id,
        this.description,
        '',
        this.expirationDate
      );

      // this.deadlinesService.createDeadline(newDeadline).subscribe(data => {
      //   const deadline = JSON.parse(data);
      //
      //   if (!this.deadlines) {
      //     this.deadlines = [];
      //   }
      //   this.deadlines?.push(deadline);
      // });

      this.socket.send(JSON.stringify(
        {
          type: 'POST_DEADLINE',
          payload: {
            deadline: newDeadline
          }
        }
      ));
    }
  }

  onCreateClick(): void {
    this.activeDeadline = undefined;
    this.title = '';
    this.expirationDate = '';
    this.description = '';
  }

  onEditCLick(id: string | undefined): void {
    if (this.deadlines && id) {
      for (let i = 0; i < this.deadlines.length; i++) {
        if (this.deadlines[i]._id === id) {
          this.activeDeadline = this.deadlines[i];
          this.title = this.activeDeadline.title;
          this.expirationDate = this.activeDeadline.expirationDate;
          this.description = this.activeDeadline.description;
        }
      }
    }
  }
}
