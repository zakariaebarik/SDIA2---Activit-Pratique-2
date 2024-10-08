package ma.enset.billingservice.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullProductItem", types = ProductItem.class)
public interface ProductItemProjection {
    Long getId();
    double getQuantity();
    double getPrice();
    long getProductId();
}
