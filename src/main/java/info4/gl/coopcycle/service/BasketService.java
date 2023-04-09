package info4.gl.coopcycle.service;

import info4.gl.coopcycle.domain.Basket;
import info4.gl.coopcycle.repository.BasketRepository;
import info4.gl.coopcycle.service.dto.BasketDTO;
import info4.gl.coopcycle.service.mapper.BasketMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Basket}.
 */
@Service
@Transactional
public class BasketService {

    private final Logger log = LoggerFactory.getLogger(BasketService.class);

    private final BasketRepository basketRepository;

    private final BasketMapper basketMapper;

    public BasketService(BasketRepository basketRepository, BasketMapper basketMapper) {
        this.basketRepository = basketRepository;
        this.basketMapper = basketMapper;
    }

    /**
     * Save a basket.
     *
     * @param basketDTO the entity to save.
     * @return the persisted entity.
     */
    public BasketDTO save(BasketDTO basketDTO) {
        log.debug("Request to save Basket : {}", basketDTO);
        Basket basket = basketMapper.toEntity(basketDTO);
        basket = basketRepository.save(basket);
        return basketMapper.toDto(basket);
    }

    /**
     * Update a basket.
     *
     * @param basketDTO the entity to save.
     * @return the persisted entity.
     */
    public BasketDTO update(BasketDTO basketDTO) {
        log.debug("Request to update Basket : {}", basketDTO);
        Basket basket = basketMapper.toEntity(basketDTO);
        basket.setIsPersisted();
        basket = basketRepository.save(basket);
        return basketMapper.toDto(basket);
    }

    /**
     * Partially update a basket.
     *
     * @param basketDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<BasketDTO> partialUpdate(BasketDTO basketDTO) {
        log.debug("Request to partially update Basket : {}", basketDTO);

        return basketRepository
            .findById(basketDTO.getId())
            .map(existingBasket -> {
                basketMapper.partialUpdate(existingBasket, basketDTO);

                return existingBasket;
            })
            .map(basketRepository::save)
            .map(basketMapper::toDto);
    }

    /**
     * Get all the baskets.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BasketDTO> findAll() {
        log.debug("Request to get all Baskets");
        return basketRepository.findAll().stream().map(basketMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the baskets with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<BasketDTO> findAllWithEagerRelationships(Pageable pageable) {
        return basketRepository.findAllWithEagerRelationships(pageable).map(basketMapper::toDto);
    }

    /**
     *  Get all the baskets where Order is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BasketDTO> findAllWhereOrderIsNull() {
        log.debug("Request to get all baskets where Order is null");
        return StreamSupport
            .stream(basketRepository.findAll().spliterator(), false)
            .filter(basket -> basket.getOrder() == null)
            .map(basketMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one basket by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BasketDTO> findOne(String id) {
        log.debug("Request to get Basket : {}", id);
        return basketRepository.findOneWithEagerRelationships(id).map(basketMapper::toDto);
    }

    /**
     * Delete the basket by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Basket : {}", id);
        basketRepository.deleteById(id);
    }
}
