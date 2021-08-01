package dev.kurama.chess.backend.core.api.assembler;

import static dev.kurama.chess.backend.hateoas.domain.HateoasRelations.DEFAULT;
import static org.springframework.hateoas.mediatype.Affordances.of;

import lombok.NonNull;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpMethod;

public abstract class DomainModelAssembler<T extends RepresentationModel<T>> implements
  RepresentationModelAssembler<T, T> {

  protected abstract Class<?> getClazz();

  @Override
  public @NonNull T toModel(@NonNull T entity) {
    return entity;
  }

  @Override
  @NonNull
  public CollectionModel<T> toCollectionModel(@NonNull Iterable<? extends T> entities) {
    return RepresentationModelAssembler.super.toCollectionModel(entities);
  }

  @NonNull
  public CollectionModel<T> toSelfCollectionModel(@NonNull Iterable<? extends T> entities) {
    return toLinkedCollectionModel(entities, getAllLink());
  }

  @NonNull
  protected CollectionModel<T> toLinkedCollectionModelWithRel(@NonNull Iterable<? extends T> entities,
    WebMvcLinkBuilder link, String relationship) {
    return toCollectionModel(entities).add(getCollectionModelSelfLinkWithRel(link, relationship).withRel(relationship));
  }

  @NonNull
  protected CollectionModel<T> toLinkedCollectionModel(@NonNull Iterable<? extends T> entities,
    WebMvcLinkBuilder link) {
    return toCollectionModel(entities).add(getCollectionModelSelfLink(link).withSelfRel());
  }

  @NonNull
  protected Link getModelSelfLink(@NonNull String id) {
    return of(getSelfLink(id).withSelfRel()).afford(HttpMethod.HEAD).withName(DEFAULT).toLink();
  }

  @NonNull
  protected Link getCollectionModelSelfLink(WebMvcLinkBuilder link) {
    return of(link.withSelfRel()).afford(HttpMethod.HEAD).withName(DEFAULT).toLink();
  }

  @NonNull
  protected Link getCollectionModelSelfLinkWithRel(WebMvcLinkBuilder link, String relation) {
    return of(link.withRel(relation)).afford(HttpMethod.HEAD).withName(DEFAULT).toLink();
  }

  public abstract WebMvcLinkBuilder getSelfLink(String id);

  public abstract WebMvcLinkBuilder getAllLink();

}
