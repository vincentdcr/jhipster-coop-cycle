package info4.gl.coopcycle.repository;

import info4.gl.coopcycle.domain.Basket;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Basket entity.
 *
 * When extending this class, extend BasketRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface BasketRepository extends BasketRepositoryWithBagRelationships, JpaRepository<Basket, String> {
    default Optional<Basket> findOneWithEagerRelationships(String id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Basket> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Basket> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
