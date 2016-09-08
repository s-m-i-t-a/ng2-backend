import { OpaqueToken, NgModule, ModuleWithProviders } from '@angular/core';
import { Http } from '@angular/http';

import { BackendService } from './backend';


export const _BASE_API_URL = new OpaqueToken('_BASE_API_URL');


function _backendFactory(baseApiUrl: string, http: Http): BackendService {
    return new BackendService(baseApiUrl, http);
}


/**
 * @deprecated use BackendModule.provideBackend
 */
export function provideBackend(_baseApiUrl: string): any[] {
    return [
        { provide: _BASE_API_URL, useValue: _baseApiUrl },
        {
            provide: BackendService,
            useFactory: _backendFactory,
            deps: [
                _BASE_API_URL,
                Http
            ]
        }
    ];
}


@NgModule({})
export class BackendModule {
    static provideBackend(_baseApiUrl: string): ModuleWithProviders {
        return {
            ngModule: BackendModule,
            providers: provideBackend(_baseApiUrl)
        };
    }
}
