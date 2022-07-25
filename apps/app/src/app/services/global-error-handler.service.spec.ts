import { TestBed } from '@angular/core/testing';
import { stubToasterServiceProvider } from '@app/ui/shared/app';
import { environment } from '../../environments/environment';
import { GlobalErrorHandler, GlobalErrorHandlerProvider } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler, GlobalErrorHandlerProvider, stubToasterServiceProvider],
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should console warn on development', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    service.handleError(new Error('test'));

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not warn on production', () => {
    environment.production = true;
    const spy = jest.spyOn(console, 'warn');

    service.handleError(new Error('test'));

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should show toast on error', () => {
    const spy = jest.spyOn(service['toasterService'], 'showToast');

    service.handleError(new Error('error-test'));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      message: 'error-test',
      title: 'Error',
      type: 'toast-error',
    });
  });
});
