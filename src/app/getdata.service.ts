import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  deck_id: string;
  constructor(private http: HttpClient) {}
  async getData() {
    await this.http
      .get('https://deckofcardsapi.com/api/deck/e24zeh10hdpd/shuffle/')
      .toPromise();
    let dataPromise = await this.draw();
    return dataPromise;
  }
  draw() {
    return this.http
      .get('https://deckofcardsapi.com/api/deck/e24zeh10hdpd/draw/?count=52')
      .toPromise();
  }
}
