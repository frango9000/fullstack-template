package dev.kurama.api.core.domain;

import com.google.common.collect.Sets;
import java.io.Serializable;
import java.util.Set;
import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@SuperBuilder
@Getter
@Setter
@ToString
@NoArgsConstructor
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Entity
public class Role extends AbstractEntity implements Serializable {

  private String name;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Builder.Default
  @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
  private Set<User> users = Sets.newHashSet();

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Builder.Default
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "role_authorities", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
             inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
  private Set<Authority> authorities = Sets.newHashSet();

  @Builder.Default
  private boolean coreRole = false;

  @Builder.Default
  private boolean canLogin = false;

}
