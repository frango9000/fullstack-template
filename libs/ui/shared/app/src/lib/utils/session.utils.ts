import { HttpResponse } from '@angular/common/http';
import { HttpHeaderKey, Session, User } from '@app/ui/shared/domain';
import { IResource } from '@hal-form-client';

export function httpToSession(response: HttpResponse<IResource>): Session {
  const token = response.headers?.get(HttpHeaderKey.JWT_TOKEN) || '';
  const refreshToken = response.headers?.get(HttpHeaderKey.JWT_REFRESH_TOKEN) || '';
  const user = new User(response.body!);
  return { user, token, refreshToken };
}
