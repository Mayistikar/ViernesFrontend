
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
selector: 'app-tables',
templateUrl: './tables.component.html',
styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    private url: string;
    private module: string;
    private UserData: TableData = {
        headerRow: [ 'ID', 'Usuario', 'Nombre', 'Cedula', 'Cumpleaños'],
        dataRows: []
    }
    private PatientData: TableData = {
        headerRow: [ 'ID', 'Usuario', 'Nombre', 'Cedula', 'Cumpleaños'],
        dataRows: []
    }
    private DeviceData: TableData = {
        headerRow: [ 'ID', 'Nombre', 'Identificador', 'Estado', 'Registro'],
        dataRows: []
    }

    public tableData: TableData;

    constructor(private route: ActivatedRoute, 
                private http: HttpClient) {
                    const token = localStorage.getItem('token');
                    if(!token) window.location.href = '/#/';
        this.url = environment.apiUrl;
        this.route.params.subscribe(params => {
            this.getData(params);
        });
    }

    ngOnInit(): void {}

    formatDate(date){
        date = new Date(date);
        return `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`;
    }

    getData(params){
        const module = (params['module'] === 'users') ? 'user-admin' : (params['module'] === 'patients') ? 'user' : 'electro';
        this.module = module === 'user-admin' ? 'user-admin' : module === 'user' ? 'user' : 'device';
        this.http.get(`${this.url}${module}/all`).subscribe((response: any) => {
            if(module==='user-admin'){
                this.UserData['dataRows'] = response.data.map((item: any) => {
                    console.log(item);
                    const newItem = [item.id, item.user, `${item.firstName} ${item.lastName}`, item.document, this.formatDate(item.birthday)];
                    return newItem;
                });
                this.tableData = this.UserData;
            }else if(module==='user'){
                this.PatientData['dataRows'] = response.data.map((item: any) => {
                    const newItem = [item.id, item.user, `${item.firstName} ${item.lastName}`, item.document, this.formatDate(item.birthday)];
                    return newItem;
                });
                this.tableData = this.PatientData;
            }else{
                this.DeviceData['dataRows'] = response.data.map((item: any) => {
                    const newItem = [item.id, item.name, item.identifier, 'Active', this.formatDate(item.register)];
                    return newItem;
                });
                this.tableData = this.DeviceData;
            }
        })
    }

    openUpdateForm(id){
        window.location.href = `/#/${this.module}/${id}`;
    }
}
