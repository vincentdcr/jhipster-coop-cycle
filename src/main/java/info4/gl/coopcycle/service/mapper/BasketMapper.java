package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Basket;
import info4.gl.coopcycle.domain.Product;
import info4.gl.coopcycle.domain.Utilisateur;
import info4.gl.coopcycle.service.dto.BasketDTO;
import info4.gl.coopcycle.service.dto.ProductDTO;
import info4.gl.coopcycle.service.dto.UtilisateurDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Basket} and its DTO {@link BasketDTO}.
 */
@Mapper(componentModel = "spring")
public interface BasketMapper extends EntityMapper<BasketDTO, Basket> {
    @Mapping(target = "products", source = "products", qualifiedByName = "productIdSet")
    @Mapping(target = "utilisateur", source = "utilisateur", qualifiedByName = "utilisateurId")
    BasketDTO toDto(Basket s);

    @Mapping(target = "removeProduct", ignore = true)
    Basket toEntity(BasketDTO basketDTO);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);

    @Named("productIdSet")
    default Set<ProductDTO> toDtoProductIdSet(Set<Product> product) {
        return product.stream().map(this::toDtoProductId).collect(Collectors.toSet());
    }

    @Named("utilisateurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UtilisateurDTO toDtoUtilisateurId(Utilisateur utilisateur);
}
