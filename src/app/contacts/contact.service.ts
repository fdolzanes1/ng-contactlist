import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Contact } from './contact';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = '/api/contacts';
  
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // get("/api/contacts")
  getContacts(): Observable <Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
              .pipe(
                tap(contact => console.log('fetched contacts')),
                catchError(this.handleError('getContacts', []))
              );
  }
  /*
  // post("/api/contacts")
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
               .toPromise()
               .then(response => response.json() as Contact)
               .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + delContactId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Contact): Promise<void | Contact> {
    var putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
               .toPromise()
               .then(response => response.json() as Contact)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
  */
}
