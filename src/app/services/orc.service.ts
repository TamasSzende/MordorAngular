import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrcFormDataModel} from '../models/OrcFormDataModel';
import {OrcListItemModel} from '../models/OrcListItemModel';
import {FormInitDataModel} from '../models/formInitData.model';

const BASE_URL = 'http://localhost:5000/ork';

@Injectable({
  providedIn: 'root'
})
export class OrcService {

  constructor(private http: HttpClient) { }

  fetchOrcs(): Observable<Array<OrcListItemModel>> {
   return this.http.get<Array<OrcListItemModel>>(BASE_URL);
  }

  getInitialFormData(): Observable<FormInitDataModel> {
   return this.http.get<FormInitDataModel>(BASE_URL + '/formData');
  }

  createOrc(data: OrcFormDataModel): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  updateOrc(data: OrcFormDataModel, orcId: number): Observable<any> {
    data.id = orcId;
    return this.http.put(BASE_URL + '/' + orcId, data);
  }

  deleteOrc(id: number): Observable<Array<OrcListItemModel>> {
   return this.http.delete<Array<OrcListItemModel>>(BASE_URL + '/' + id);
  }

  fetchOrcDetails(id: string): Observable<OrcFormDataModel> {
    return this.http.get<OrcFormDataModel>(BASE_URL + '/' + id);
  }

}
