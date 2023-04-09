package info4.gl.coopcycle.repository;

import info4.gl.coopcycle.domain.Basket;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class BasketRepositoryWithBagRelationshipsImpl implements BasketRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Basket> fetchBagRelationships(Optional<Basket> basket) {
        return basket.map(this::fetchProducts);
    }

    @Override
    public Page<Basket> fetchBagRelationships(Page<Basket> baskets) {
        return new PageImpl<>(fetchBagRelationships(baskets.getContent()), baskets.getPageable(), baskets.getTotalElements());
    }

    @Override
    public List<Basket> fetchBagRelationships(List<Basket> baskets) {
        return Optional.of(baskets).map(this::fetchProducts).orElse(Collections.emptyList());
    }

    Basket fetchProducts(Basket result) {
        return entityManager
            .createQuery("select basket from Basket basket left join fetch basket.products where basket is :basket", Basket.class)
            .setParameter("basket", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Basket> fetchProducts(List<Basket> baskets) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, baskets.size()).forEach(index -> order.put(baskets.get(index).getId(), index));
        List<Basket> result = entityManager
            .createQuery("select distinct basket from Basket basket left join fetch basket.products where basket in :baskets", Basket.class)
            .setParameter("baskets", baskets)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
