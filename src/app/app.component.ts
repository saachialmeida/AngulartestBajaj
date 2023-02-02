import { Component } from '@angular/core';
import { UserService } from './user.service';
import {myUser} from './myUser'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angfile';

  // protected users$: Observable<IUser[]>;
 users$!: myUser[];
   constructor(public userservice: UserService) {}
 
   ngOnInit() {
     this.userservice.getUsers().subscribe(res => {
       this.users$ = res;
     });
 
     
 
 
   
   }
}
