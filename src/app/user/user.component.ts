import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserAdminComponent implements OnInit {
  private url: string;
  public userId: number;
  public userAdmin: any = {};
  public cities: Array<any> = [];
  public estadios: Array<any> = [];
  private saveState: boolean;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
                let token = localStorage.getItem("token");
                if(!token) window.location.href = `/#/login`;
    this.url = environment.apiUrl;
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if(this.userId){
        this.getData(params);
      }
    });
  }

  ngOnInit() {
    this.http.get(`${this.url}city/all`).subscribe((response: any) => {
      this.cities = response.data;
    }); 
  }

  formatDate(date){
    date = new Date(date);
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  }

  getData(params){
    this.http.get(`${this.url}user-admin/${this.userId}`).subscribe((response: any) => {
      this.userAdmin = response.user;
      this.userAdmin['birthday'] = this.formatDate(this.userAdmin.birthday)
    }); 
  }

  saveData(){
    let actionUrl;
    const data = {...this.userAdmin};
    if(this.userId){
      delete data['id'];
      delete data['user'];
      delete data['pass'];
      actionUrl = `${this.url}user-admin/${this.userId}/update`;
    }else{
      actionUrl = `${this.url}user-admin/create`;
    }
  
    this.http.post(actionUrl, data).subscribe((response: any) => {
      this.saveState = true;
    }, (error) => this.saveState = false);   
  }
}
