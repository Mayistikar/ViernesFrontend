import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = {};
  private logged: any;
  private url:string;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
  


    this.url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.user.name = "Anderson";
    this.user.pass = "";
  }

  onSumbit(){
    console.log('works');    
    const data = {...this.user};
    console.log(data);
    this.http.post(`${this.url}login`, data).subscribe((response: any) => {
      this.logged = true;
      console.log(response);
      localStorage.setItem("token", response.data.token);
      if(!response.error) window.location.href = `/#/user-admin`;
    }, (error) => {
      // this.notification.showNotification('center', 'center');
      console.log('models');
      this.logged = false;   
    });
  }
}
