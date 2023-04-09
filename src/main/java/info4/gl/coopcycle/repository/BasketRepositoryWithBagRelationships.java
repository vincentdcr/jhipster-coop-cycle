package info4.gl.coopcycle.repository;

import info4.gl.coopcycle.domain.Basket;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface BasketRepositoryWithBagRelationships {
    Optional<Basket> fetchBagRelationships(Optional<Basket> basket);

    List<Basket> fetchBagRelationships(List<Basket> baskets);

    Page<Basket> fetchBagRelationships(Page<Basket> baskets);
}
