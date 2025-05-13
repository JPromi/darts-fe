import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileCustom } from '../entities/fileCustom';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
  ) { }

  public uploadFile(file: File): Observable<FileCustom> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<FileCustom>(`${environment.baseUrl}/file/upload`, formData, { withCredentials: true });
  }

  public uploadImage(file: File, maxSize: number = 1920): Observable<FileCustom> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<FileCustom>(`${environment.baseUrl}/file/upload/image?size=${maxSize}`, formData, { withCredentials: true });
  }
}
