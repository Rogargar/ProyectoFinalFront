import { Router } from '@angular/router';
import swal  from 'sweetalert';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapperService } from './mapper.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * Label service
 *
 * @export
 * @class LabelService
 */
@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/labels`;

  constructor(private _http: HttpClient, private _mapper: MapperService,private router:Router) { }

  /**
   * Get all labels
   *
   * @return {*}
   * @memberof LabelService
   */
  getLabels() {
    return this._http.get(this.url)
      .pipe(
        map((item: any) => {
          item = item.map((label: any) => {
            return this._mapper.mapLabel(label);
          });
          return item;
        }),
      );
  }

  /**
   * Get label by id
   *
   * @param {*} id the label id
   * @return {*}
   * @memberof LabelService
   */
  getLabelById(id) {
    return this._http.get(this.url + '/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/home']);
        swal('No se encuentra ningun label con ese id','error', 'error')
        return throwError(e);
      })
    );
  }


}
