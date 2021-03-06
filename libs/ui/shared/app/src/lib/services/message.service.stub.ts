import { ApplicationMessage, UserChangedMessage } from '@app/ui/shared/domain';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { MessageService } from './message.service';

export class StubMessageService implements Partial<MessageService> {
  public userChangedMessageSubject = new Subject<UserChangedMessage>();
  public userListChangedMessageSubject = new Subject<UserChangedMessage>();
  disconnect = () => of(void 0);

  multicast<T extends ApplicationMessage>(destination: string): Observable<T> {
    return this.handleDestination(destination) as Observable<T>;
  }

  handleDestination(destination: string): Observable<ApplicationMessage> {
    switch (destination) {
      case `/ami/user`:
        return this.userListChangedMessageSubject.asObservable();
      case `/ami/user/u1`:
        return this.userListChangedMessageSubject.asObservable();
      default:
        return EMPTY;
    }
  }
}

export const stubMessageServiceProvider = {
  provide: MessageService,
  useClass: StubMessageService,
};
