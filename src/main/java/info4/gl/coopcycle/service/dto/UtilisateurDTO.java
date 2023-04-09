package info4.gl.coopcycle.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link info4.gl.coopcycle.domain.Utilisateur} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UtilisateurDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    private String email;

    @NotNull
    @Pattern(regexp = "\\d+$")
    private String phone;

    @NotNull
    @Size(min = 3, max = 100)
    private String address;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UtilisateurDTO)) {
            return false;
        }

        UtilisateurDTO utilisateurDTO = (UtilisateurDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, utilisateurDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UtilisateurDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
