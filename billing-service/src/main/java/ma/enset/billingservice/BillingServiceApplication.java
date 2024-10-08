package ma.enset.billingservice;

import ma.enset.billingservice.entities.Bill;
import ma.enset.billingservice.entities.ProductItem;
import ma.enset.billingservice.feign.CustomerRestClient;
import ma.enset.billingservice.feign.ProductRestClient;
import ma.enset.billingservice.models.Customer;
import ma.enset.billingservice.models.Product;
import ma.enset.billingservice.repositories.BillRepository;
import ma.enset.billingservice.repositories.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(BillRepository billRepository,
                            ProductItemRepository productItemRepository,
                            CustomerRestClient customerRestClient,
                            ProductRestClient productItemRestClient){
        return args -> {
            Customer customer = customerRestClient.getCustomerById(1L);
            PagedModel<Product> productPagedModel = productItemRestClient.pageProducts(0,0);
            Bill bill = billRepository.save(new Bill(null, new Date(), customer.getId(), null, null));

            productPagedModel.forEach(p->{

                ProductItem productItem = new ProductItem();
                productItem.setProductId(p.getId());
                productItem.setPrice(p.getPrice());
                productItem.setQuantity((int)(1+Math.random()*100));
                productItem.setBill(bill);
                productItemRepository.save(productItem);
            });
        };
    }

}
