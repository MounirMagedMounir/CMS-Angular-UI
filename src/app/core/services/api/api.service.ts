import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Base URL for the API
  private baseUrl = 'https://api-cms.runasp.net/api';

  // Default HTTP options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true, // Include credentials (e.g., cookies) if needed
  };

  // POST Request
  Post(url: string, query?: any, data?: any) {
    const apiUrl = this.constructUrl(url, query);
    return this.http.post(apiUrl, data, this.httpOptions);
  }

  // GET Request
  Get(url: string, query?: any) {
    const apiUrl = this.constructUrl(url, query);
    return this.http.get(apiUrl, this.httpOptions);
  }

  // DELETE Request
  Delete(url: string, query?: any) {
    const apiUrl = this.constructUrl(url, query);
    return this.http.delete(apiUrl, this.httpOptions);
  }

  // PUT Request
  Put(url: string, query?: any, data?: any) {
    const apiUrl = this.constructUrl(url, query);
    return this.http.put(apiUrl, data, this.httpOptions);
  }

  // Helper to construct URLs with query parameters
  private constructUrl(endpoint: string, query?: any): string {
    let url = `${this.baseUrl}${endpoint}`;
    if (query) {
      const params = new HttpParams({ fromObject: query });
      url += `?${params.toString()}`;
    }
    return url;
  }
}
