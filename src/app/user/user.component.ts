import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private url: string;
  public userId: number;
  public user: any = {};
  public cities: Array<any> = [];
  public estadios: Array<any> = [];
  private saveState: boolean;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
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
    this.http.get(`${this.url}estadios/all`).subscribe((response: any) => {
      this.estadios = response.data;
    }); 
  }

  formatDate(date){
    date = new Date(date);
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  }

  getData(params){
    this.http.get(`${this.url}user/${this.userId}`).subscribe((response: any) => {
      this.user = response.user;
      this.user['birthday'] = this.formatDate(this.user.birthday)
    }); 
  }

  saveData(){
    let actionUrl;
    const data = {...this.user};
    if(this.userId){
      delete data['id'];
      delete data['user'];
      delete data['pass'];
      actionUrl = `${this.url}user/${this.userId}/update`;
    }else{
      actionUrl = `${this.url}user/create`;
    }
  
    this.http.post(actionUrl, data).subscribe((response: any) => {
      this.saveState = true;
    }, (error) => this.saveState = false);   
  }
}
