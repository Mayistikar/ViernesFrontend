import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})

export class DeviceComponent implements OnInit {
  private url: string;
  public deviceId: number;
  public device: any = {};

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
    this.url = 'https://2af5b018.ngrok.io/';
    this.route.params.subscribe(params => {
      this.deviceId = params['id'];
      if(this.deviceId){
        this.getData();
      }
    });
  }

  ngOnInit() {
  }

  formatDate(date){
    date = new Date(date);
    const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}`: (date.getMonth() + 1);
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }

  getData(){
    this.http.get(`${this.url}electro/${this.deviceId}`).subscribe((response: any) => {
      this.device = response.electro;
      this.device['register'] = this.formatDate(this.device.register)
    }); 
  }

  saveData(){
    let actionUrl;
    const data = {...this.device};
    if(this.deviceId){
      delete data['id'];
      delete data['identifier'];
      delete data['register'];
      actionUrl = `${this.url}electro/${this.deviceId}/update`;
    }else{
      actionUrl = `${this.url}electro/create`;
    }
    
    this.http.post(actionUrl, data).subscribe((response: any) => {
    });
  }
}
