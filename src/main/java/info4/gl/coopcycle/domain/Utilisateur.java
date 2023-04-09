package info4.gl.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Pattern(regexp = "\\d+$")
    @Column(name = "phone", nullable = false)
    private String phone;

    @NotNull
    @Size(min = 3, max = 100)
    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "restaurants", "utilisateur" }, allowSetters = true)
    private Set<Cooperative> cooperatives = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "products", "order", "utilisateur" }, allowSetters = true)
    private Set<Basket> baskets = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "basket", "payment", "restaurant", "utilisateur" }, allowSetters = true)
    private Set<Order> orders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Utilisateur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Utilisateur name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public Utilisateur email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public Utilisateur phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return this.address;
    }

    public Utilisateur address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Cooperative> getCooperatives() {
        return this.cooperatives;
    }

    public void setCooperatives(Set<Cooperative> cooperatives) {
        if (this.cooperatives != null) {
            this.cooperatives.forEach(i -> i.setUtilisateur(null));
        }
        if (cooperatives != null) {
            cooperatives.forEach(i -> i.setUtilisateur(this));
        }
        this.cooperatives = cooperatives;
    }

    public Utilisateur cooperatives(Set<Cooperative> cooperatives) {
        this.setCooperatives(cooperatives);
        return this;
    }

    public Utilisateur addCooperative(Cooperative cooperative) {
        this.cooperatives.add(cooperative);
        cooperative.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeCooperative(Cooperative cooperative) {
        this.cooperatives.remove(cooperative);
        cooperative.setUtilisateur(null);
        return this;
    }

    public Set<Basket> getBaskets() {
        return this.baskets;
    }

    public void setBaskets(Set<Basket> baskets) {
        if (this.baskets != null) {
            this.baskets.forEach(i -> i.setUtilisateur(null));
        }
        if (baskets != null) {
            baskets.forEach(i -> i.setUtilisateur(this));
        }
        this.baskets = baskets;
    }

    public Utilisateur baskets(Set<Basket> baskets) {
        this.setBaskets(baskets);
        return this;
    }

    public Utilisateur addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.setUtilisateur(null);
        return this;
    }

    public Set<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(Set<Order> orders) {
        if (this.orders != null) {
            this.orders.forEach(i -> i.setUtilisateur(null));
        }
        if (orders != null) {
            orders.forEach(i -> i.setUtilisateur(this));
        }
        this.orders = orders;
    }

    public Utilisateur orders(Set<Order> orders) {
        this.setOrders(orders);
        return this;
    }

    public Utilisateur addOrder(Order order) {
        this.orders.add(order);
        order.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeOrder(Order order) {
        this.orders.remove(order);
        order.setUtilisateur(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
