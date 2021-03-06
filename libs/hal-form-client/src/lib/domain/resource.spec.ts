import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HalFormClientModule } from '../hal-form-client.module';
import { HttpMethod } from './domain';
import { IResource, Resource } from './resource';

describe('Resource', () => {
  let httpTestingController: HttpTestingController;

  const iResource: IResource = {
    id: '1',
    _links: {
      self: { href: '/api/v1/users' },
      user: { href: '/api/v1/users/{userId}', templated: true },
    },
    _embedded: {
      preferences: { _links: { self: { href: '/api/v1/user/1/preferences' } }, locale: 'en' },
      roles: [
        {
          _links: { self: { href: '/api/v1/role/1' } },
          name: 'admin',
        },
        { _links: { self: { href: '/api/v1/role/2' } }, name: 'mod' },
      ],
    },
    _templates: {
      default: { method: HttpMethod.HEAD },
      update: { method: HttpMethod.PUT, properties: [{ name: 'name' }] },
      preferences: { method: HttpMethod.PUT, target: '/api/v1/users/1/preferences' },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HalFormClientModule, HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(new Resource()).toBeTruthy();
    expect(Resource.of()).toBeTruthy();
  });

  describe('constructor', () => {
    it('should create with properties', () => {
      const resource = Resource.of(iResource);

      expect(resource).toBeTruthy();
      expect(resource.id).toEqual(iResource.id);
      expect(resource._links?.self.href).toEqual(iResource._links?.self.href);
      expect(resource._links?.user.href).toEqual(iResource._links?.user.href);
      expect(resource._templates?.default.method).toEqual(iResource._templates?.default.method);
      expect(resource._templates?.update.method).toEqual(iResource._templates?.update.method);
      expect(resource._templates?.preferences.method).toEqual(iResource._templates?.preferences.method);
      expect((resource._embedded?.preferences as IResource).locale).toEqual(
        (iResource._embedded?.preferences as IResource).locale,
      );
      expect((resource._embedded?.roles as IResource[]).length).toEqual(
        (iResource._embedded?.roles as IResource[]).length,
      );
    });

    it('should instantiate templates using self as target', () => {
      expect(Resource.of(iResource)._templates?.update?.target).toEqual(iResource._links?.self.href);
      expect(
        Resource.of({
          _links: {} as any,
          _templates: { default: { method: HttpMethod.PUT } },
        })._templates?.default?.target,
      ).toEqual(undefined);
    });

    it('should instantiate templates using template specific target', () => {
      expect(Resource.of(iResource)._templates?.preferences?.target).toEqual(iResource._templates?.preferences.target);
    });
  });

  describe('links', () => {
    it('should get links', () => {
      expect(Resource.of(iResource).getLink()).toBeTruthy();
      expect(Resource.of(iResource).getLink('self')).toBeTruthy();
      expect(Resource.of(iResource).getLink('user')).toBeTruthy();
      expect(Resource.of(iResource).getLink('missing')).toBeNull();
      expect(Resource.of().getLink()).toBeNull();
    });

    it('should get link or throw', () => {
      expect(Resource.of(iResource).getLinkOrThrow()).toBeTruthy();
      expect(Resource.of(iResource).getLinkOrThrow('self')).toBeTruthy();
      expect(Resource.of(iResource).getLinkOrThrow('user')).toBeTruthy();
      expect(() => Resource.of(iResource).getLinkOrThrow('missing')).toThrow();
      expect(() => Resource.of().getLinkOrThrow()).toThrow();
    });

    it('should should return if resource has link', () => {
      expect(Resource.of(iResource).hasLink()).toBe(true);
      expect(Resource.of(iResource).hasLink('self')).toBe(true);
      expect(Resource.of(iResource).hasLink('user')).toBe(true);
      expect(Resource.of(iResource).hasLink('missing')).toBe(false);
    });
  });

  describe('embedded', () => {
    it('should get embedded', () => {
      expect(Resource.of(iResource).getEmbedded('preferences')).toBeTruthy();
      expect(Resource.of(iResource).getEmbedded('preferences')).toBeInstanceOf(Resource);
      expect(Resource.of(iResource).getEmbedded('roles')).toBeTruthy();
      expect(Resource.of(iResource).getEmbedded('roles')).toBeInstanceOf(Array);
      expect(Resource.of(iResource).getEmbedded('missing')).toBeNull();
    });

    it('should get embedded or throw', () => {
      expect(Resource.of(iResource).getEmbeddedOrThrow('preferences')).toBeTruthy();
      expect(Resource.of(iResource).getEmbeddedOrThrow('roles')).toBeTruthy();
      expect(() => Resource.of(iResource).getEmbeddedOrThrow('missing')).toThrow();
      expect(() => Resource.of(iResource).getEmbeddedOrThrow('missing', 'Custom Message')).toThrow();
      expect(() => Resource.of(iResource).getEmbeddedOrThrow('missing', Error('Custom Error'))).toThrow();
    });

    it('should should return if resource has embedded', () => {
      expect(Resource.of(iResource).hasEmbedded('preferences')).toBe(true);
      expect(Resource.of(iResource).hasEmbedded('roles')).toBe(true);
      expect(Resource.of(iResource).hasEmbedded('missing')).toBe(false);
    });

    it('should should return resource embedded collection or throw', () => {
      expect(Resource.of(iResource).getEmbeddedCollection('roles')).toBeTruthy();
      expect(Resource.of(iResource).getEmbeddedCollection('roles')).toHaveLength(2);
      expect(Resource.of(iResource).getEmbeddedCollection('roles')).toBeInstanceOf(Array);
      expect(Resource.of(iResource).getEmbeddedCollection('roles')[0]).toBeInstanceOf(Resource);
      expect(Resource.of(iResource).getEmbeddedCollection('roles')[1]).toBeInstanceOf(Resource);
      expect(() => Resource.of(iResource).getEmbeddedCollection('missing')).toThrow();
    });

    it('should should return if resource has embedded collection', () => {
      expect(Resource.of(iResource).hasEmbeddedCollection('preferences')).toBe(false);
      expect(Resource.of(iResource).hasEmbeddedCollection('roles')).toBe(true);
      expect(Resource.of(iResource).hasEmbeddedCollection('missing')).toBe(false);
    });

    it('should should return resource embedded object or throw', () => {
      expect(Resource.of(iResource).getEmbeddedObject('preferences')).toBeTruthy();
      expect(Resource.of(iResource).getEmbeddedObject('preferences').locale).toBeTruthy();
      expect(Resource.of(iResource).getEmbeddedObject('preferences')).toBeInstanceOf(Resource);
      expect(Resource.of(iResource).getEmbeddedObject('preferences').getLink()).toBeTruthy();
      expect(() => Resource.of(iResource).getEmbeddedCollection('missing')).toThrow();
    });

    it('should should return if resource has embedded object', () => {
      expect(Resource.of(iResource).hasEmbeddedObject('preferences')).toBe(true);
      expect(Resource.of(iResource).hasEmbeddedObject('roles')).toBe(false);
      expect(Resource.of(iResource).hasEmbeddedObject('missing')).toBe(false);
    });
  });

  describe('templates', () => {
    it('should get template', () => {
      expect(Resource.of(iResource).getTemplate()).toBeTruthy();
      expect(Resource.of(iResource).getTemplate('default')).toBeTruthy();
      expect(Resource.of(iResource).getTemplate('update')).toBeTruthy();
      expect(Resource.of(iResource).getTemplate('preferences')).toBeTruthy();
      expect(Resource.of(iResource).getTemplate('missing')).toBeNull();
    });

    it('should get template or throw', () => {
      expect(Resource.of(iResource).getTemplateOrThrow()).toBeTruthy();
      expect(Resource.of(iResource).getTemplateOrThrow('default')).toBeTruthy();
      expect(Resource.of(iResource).getTemplateOrThrow('update')).toBeTruthy();
      expect(Resource.of(iResource).getTemplateOrThrow('preferences')).toBeTruthy();
      expect(() => Resource.of(iResource).getTemplateOrThrow('missing')).toThrow();
      expect(() => Resource.of().getTemplateOrThrow()).toThrow();
    });

    it('should return if resource has template', () => {
      expect(Resource.of(iResource).hasTemplate()).toBe(true);
      expect(Resource.of(iResource).hasTemplate('default')).toBe(true);
      expect(Resource.of(iResource).hasTemplate('update')).toBe(true);
      expect(Resource.of(iResource).hasTemplate('preferences')).toBe(true);
      expect(Resource.of(iResource).hasTemplate('missing')).toBe(false);
    });

    it('should submit to template or throw', () => {
      expect(Resource.of(iResource).submitToTemplateOrThrow()).toBeTruthy();
      expect(Resource.of(iResource).submitToTemplateOrThrow('default')).toBeTruthy();
      expect(Resource.of(iResource).submitToTemplateOrThrow('update')).toBeTruthy();
      expect(Resource.of(iResource).submitToTemplateOrThrow('preferences')).toBeTruthy();
      expect(() => Resource.of(iResource).submitToTemplateOrThrow('missing')).toThrow();
    });
  });

  it('should parse to json', () => {
    const iRes = {
      _links: {
        self: { href: '/api/v1/users/1', name: 'self' },
        users: { href: '/api/v1/users', name: 'users' },
      },
      _templates: {
        default: {
          method: HttpMethod.PATCH,
          target: '/api/v1/users/1',
          properties: [{ name: 'username' }],
          title: 'update',
        },
      },
      id: 'userId',
    };

    expect(Resource.of(iRes).toJson()).toEqual(iRes);
  });
});
