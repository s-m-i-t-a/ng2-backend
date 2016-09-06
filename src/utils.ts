import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { reduce } from 'ramda';


export type HeaderItem = string[];


// const oneArgs = (args) => {
//     return args.length === 1 ? [args[0], '', {}] : undefined;
// };

// const twoArgsBody = (args) => {
//     return args.length === 2 && typeof(args[1]) === 'string' ?
//         [args[0], args[1], {}] :
//         undefined;
// };

// const twoArgsOptions = (args) => {
//     return args.length === 2 && typeof(args[1]) !== 'string' ?
//         [args[0], , args[1]] :
//         undefined;
// };

// const threeArgs = (args) => {
//     return args.length === 3 ? [args[0], args[1], args[2]] : undefined;
// };


/**
 * Check response status code and raise error when HTTP error recieved.
 * @param response Angular 2 response
 * @returns Angular 2 response
 */
export function isOk(response: Response): Response {
    if (response.status < 200 && response.status >= 300) {
        const msg = `Response status: ${response.status}`;
        console.log(msg);
        throw new Error(msg);
    }

    return response;
}


export function handleError(error: any): Observable<Error> {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}


// function authorizationHeader(store: ReduxStore): HeaderItem {
//     const authState = this._store.getState()['auth'];
//     if (authState) {
//         return ['Authorization', authState.get('token', '')];
//     } else {
//         return ['Authorization', ''];
//     }
// }


export function jsonContentHeader(): HeaderItem {
    return ['Content-Type', 'application/json'];
}


export function headers(list: HeaderItem[]): Headers {
    return reduce(
        (acc, val) => {
            acc.append(val[0], val[1]);
            return acc;
        },
        new Headers(),
        list
    );
}


/**
 * this.post = headersDecorator(_http.post, headers);
 */
// export const headersDecorator = (method, headers) => {
//     return (...args) => {

//         return method(...args);
//     };
// };
