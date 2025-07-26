import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  private loadingStatesSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  public loadingStates$ = this.loadingStatesSubject.asObservable();

  show(): void {
    this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.isLoadingSubject.next(false);
  }

  setLoadingState(key: string, isLoading: boolean): void {
    const currentStates = this.loadingStatesSubject.value;
    this.loadingStatesSubject.next({
      ...currentStates,
      [key]: isLoading
    });
  }

  getLoadingState(key: string): boolean {
    return this.loadingStatesSubject.value[key] || false;
  }

  clearLoadingState(key: string): void {
    const currentStates = this.loadingStatesSubject.value;
    const { [key]: removed, ...remainingStates } = currentStates;
    this.loadingStatesSubject.next(remainingStates);
  }

  clearAllLoadingStates(): void {
    this.loadingStatesSubject.next({});
  }

  isAnyLoading(): boolean {
    return Object.values(this.loadingStatesSubject.value).some(state => state);
  }
}
