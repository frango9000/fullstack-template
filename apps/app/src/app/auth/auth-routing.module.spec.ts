import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthRoutingModule } from './auth-routing.module';

describe('AuthRoutingModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AuthRoutingModule],
      }).compileComponents();
    }),
  );

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AuthRoutingModule).toBeDefined();
  });

  it('should create a module', () => {
    expect(TestBed.inject(AuthRoutingModule)).toBeTruthy();
  });
});