import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = {};

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) { }

  ngOnInit(): void {
    this.user.name = "Anderson";
    this.user.pass = "1990";
  }

  onSumbit(){
    let actionUrl;
    const data = {...this.user};
  //   if(this.userId){
  //     delete data['id'];
  //     delete data['user'];
  //     delete data['pass'];
  //     actionUrl = `${this.url}user/${this.userId}/update`;
  //   }else{
  //     actionUrl = `${this.url}user/create`;
  //   }
  
  //   this.http.post(actionUrl, data).subscribe((response: any) => {
  //     this.saveState = true;
  //   }, (error) => this.saveState = false);   
  }
}
