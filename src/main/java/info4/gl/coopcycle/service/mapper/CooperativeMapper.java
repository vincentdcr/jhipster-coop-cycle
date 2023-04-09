package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Cooperative;
import info4.gl.coopcycle.domain.Utilisateur;
import info4.gl.coopcycle.service.dto.CooperativeDTO;
import info4.gl.coopcycle.service.dto.UtilisateurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cooperative} and its DTO {@link CooperativeDTO}.
 */
@Mapper(componentModel = "spring")
public interface CooperativeMapper extends EntityMapper<CooperativeDTO, Cooperative> {
    @Mapping(target = "utilisateur", source = "utilisateur", qualifiedByName = "utilisateurId")
    CooperativeDTO toDto(Cooperative s);

    @Named("utilisateurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UtilisateurDTO toDtoUtilisateurId(Utilisateur utilisateur);
}
