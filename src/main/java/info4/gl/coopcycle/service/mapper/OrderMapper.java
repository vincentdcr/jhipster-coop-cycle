package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Basket;
import info4.gl.coopcycle.domain.Order;
import info4.gl.coopcycle.domain.Restaurant;
import info4.gl.coopcycle.domain.Utilisateur;
import info4.gl.coopcycle.service.dto.BasketDTO;
import info4.gl.coopcycle.service.dto.OrderDTO;
import info4.gl.coopcycle.service.dto.RestaurantDTO;
import info4.gl.coopcycle.service.dto.UtilisateurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "basket", source = "basket", qualifiedByName = "basketId")
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "restaurantId")
    @Mapping(target = "utilisateur", source = "utilisateur", qualifiedByName = "utilisateurId")
    OrderDTO toDto(Order s);

    @Named("basketId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BasketDTO toDtoBasketId(Basket basket);

    @Named("restaurantId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurantDTO toDtoRestaurantId(Restaurant restaurant);

    @Named("utilisateurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UtilisateurDTO toDtoUtilisateurId(Utilisateur utilisateur);
}
