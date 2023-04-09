package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Utilisateur;
import info4.gl.coopcycle.service.dto.UtilisateurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Utilisateur} and its DTO {@link UtilisateurDTO}.
 */
@Mapper(componentModel = "spring")
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {}
