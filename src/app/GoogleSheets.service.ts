import {Injectable} from '@angular/core';
import {Expense} from "./Expenses.js";
import {resolve} from "url";
import {Http} from "@angular/http";
import {google} from "googleapis";

const EXPENSES: Expense[] = [
  {id:1, amount: 32.2, location: "McDonals", date:"Hoy"},
  {id:2, amount: 32.2, location: "McDonals", date:"Hoy"},
  {id:3, amount: 32.2, location: "McDonals", date:"Hoy"},
  {id:4, amount: 32.2, location: "McDonals", date:"Hoy"},
  {id:5, amount: 32.2, location: "McDonals", date:"Hoy"},
];

declare var gapi: {
  auth2: {
    init: any,
    getAuthInstance(): any
  },
  currentUser: any,
  load: any,
  client: any,
  signIn(): Promise<any>,
  signOut(): Promise<any>
};

@Injectable()
export class GoogleSheetsService {
  CLIENT_ID :string ;
  SCOPES :string;
  private _auth2: {
    isSignedIn: any,
    currentUser: any,
    signIn(): Promise<any>,
    signOut(): Promise<any>
  };
  private _gapiAuthPromise;

  constructor(public http:Http) {
    this.CLIENT_ID="";
    this.SCOPES =  [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ');
    this._gapiAuthPromise = new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.auth2.init({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES
        }).then(() => {
          this._auth2 = gapi.auth2.getAuthInstance();
          resolve();
        })
      })
    })
  }
  signIn(): Promise<any> {
    return this._auth2.signIn();
  }

  signOut(): Promise<any> {
    return this._auth2.signOut();
  }

  getIsSignedIn(): Promise<any> {
    return this._gapiAuthPromise
      .then(() => this._auth2.isSignedIn.get());
  }

  getCurrentUserProfile(): Promise<any> {
    return this.getIsSignedIn()
      .then(isSignedIn =>
        (isSignedIn ? this._auth2.currentUser.get().getBasicProfile() : null));
  }

  getExpenses() : Expense[] {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1-ShyPzkGvGxpptwcCR97ivr9oqCV3mKsccHKXVGujTU',
      range: 'expenses!A:C',
    }).then((response) => {
      console.log(response);
    })
    return EXPENSES;
  }

}
