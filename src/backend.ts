import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { isOk, handleError, headers, jsonContentHeader } from './utils';


export class BackendService {
    constructor(private _baseApiUrl: string, private _http: Http) {
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.get(`${this._baseApiUrl}${url}`, opts)
            .map(isOk)
            .catch(handleError);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.post(`${this._baseApiUrl}${url}`, body, opts)
            .map(isOk)
            .catch(handleError);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.put(`${this._baseApiUrl}${url}`, body, opts)
            .map(isOk)
            .catch(handleError);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.delete(`${this._baseApiUrl}${url}`, opts)
            .map(isOk)
            .catch(handleError);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.patch(`${this._baseApiUrl}${url}`, body, opts)
            .map(isOk)
            .catch(handleError);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response|Error> {
        let opts : RequestOptionsArgs = this.expandWithDefaultOptions(options);

        return this._http.head(`${this._baseApiUrl}${url}`, opts)
            .map(isOk)
            .catch(handleError);
    }

    private expandWithDefaultOptions (options : RequestOptionsArgs) : RequestOptionsArgs {
        if (!options) {
            options = {};
        }
        if (!options.headers) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }
}
