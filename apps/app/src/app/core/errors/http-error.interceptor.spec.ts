import { TestBed } from '@angular/core/testing';
import { stubToasterServiceProvider } from '../../shared/services/toaster.service.stub';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptor, stubToasterServiceProvider],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});