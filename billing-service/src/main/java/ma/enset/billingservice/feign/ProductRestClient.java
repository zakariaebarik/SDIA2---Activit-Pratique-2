package ma.enset.billingservice.feign;

import ma.enset.billingservice.models.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "INVENTORY-SERVICE")
public interface ProductRestClient {
    @GetMapping(path = "/products")
    PagedModel<Product> pageProducts(@RequestParam(name="page") int page,
                                     @RequestParam(name="size") int size);

    @GetMapping(path = "/products/{id}")
    Product getProductById(@PathVariable Long id);
}
