import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpRequestInterceptor } from './http-interceptor';

export const httpInterceptProviders = [
    /* multi provides multiple instances of this class */
    {provide : HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true} 
]