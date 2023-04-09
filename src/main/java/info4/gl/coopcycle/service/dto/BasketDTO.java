package info4.gl.coopcycle.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link info4.gl.coopcycle.domain.Basket} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BasketDTO implements Serializable {

    @NotNull
    private String id;

    @NotNull
    @DecimalMin(value = "0")
    private Float price;

    private Set<ProductDTO> products = new HashSet<>();

    private UtilisateurDTO utilisateur;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Set<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductDTO> products) {
        this.products = products;
    }

    public UtilisateurDTO getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(UtilisateurDTO utilisateur) {
        this.utilisateur = utilisateur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BasketDTO)) {
            return false;
        }

        BasketDTO basketDTO = (BasketDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, basketDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BasketDTO{" +
            "id='" + getId() + "'" +
            ", price=" + getPrice() +
            ", products=" + getProducts() +
            ", utilisateur=" + getUtilisateur() +
            "}";
    }
}
