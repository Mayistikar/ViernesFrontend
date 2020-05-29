import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  private url: string;
  public patientId: number;
  public patient: any = {};
  public cities: Array<any> = [];
  public estadios: Array<any> = [];
  private saveState: boolean;

  constructor(private route: ActivatedRoute, 
              private http: HttpClient) {
    this.url = environment.apiUrl;
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      if(this.patientId){
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
    this.http.get(`${this.url}patient/${this.patientId}`).subscribe((response: any) => {
      this.patient = response.patient;
      this.patient['birthday'] = this.formatDate(this.patient.birthday)
    }); 
  }

  saveData(){
    let actionUrl;
    const data = {...this.patient};
    if(this.patientId){
      delete data['id'];
      delete data['patient'];
      delete data['pass'];
      actionUrl = `${this.url}patient/${this.patientId}/update`;
    }else{
      actionUrl = `${this.url}patient/create`;
    }
  
    this.http.post(actionUrl, data).subscribe((response: any) => {
      this.saveState = true;
    }, (error) => this.saveState = false);   
  }
}
