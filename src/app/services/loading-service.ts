import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    /* listens to the loading spinner - true = spinner visible, false = spinner invisible */
    loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /* map for http requests. key is the request url, value is a boolean */
    loadingMap: Map<string, boolean> = new Map<string, boolean>();

    constructor() { }

    setLoading(loading: boolean, url: string): void {
        if (!url) {
        throw new Error('The request URL must be provided to the LoadingService.setLoading function');
        }
        /* if loading is true, then put the url into the loading map */
        if (loading === true) {
        this.loadingMap.set(url, loading);
        this.loadingSub.next(true);
        /* remove the loadingMap url key */
        }else if (loading === false && this.loadingMap.has(url)) {
        this.loadingMap.delete(url);
        }
        /* set loading spinner to false */
        if (this.loadingMap.size === 0) {
        this.loadingSub.next(false);
        }
    }
}