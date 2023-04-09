package info4.gl.coopcycle.domain;

import static org.assertj.core.api.Assertions.assertThat;

import info4.gl.coopcycle.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BasketTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Basket.class);
        Basket basket1 = new Basket();
        basket1.setId("id1");
        Basket basket2 = new Basket();
        basket2.setId(basket1.getId());
        assertThat(basket1).isEqualTo(basket2);
        basket2.setId("id2");
        assertThat(basket1).isNotEqualTo(basket2);
        basket1.setId(null);
        assertThat(basket1).isNotEqualTo(basket2);
    }
}
