package org.learning.dlearning_backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.learning.dlearning_backend.common.PaymentMethodName;

@Entity
@Table(name = "payment_methods")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentMethod extends AbstractEntity<Long> {


    @Enumerated(EnumType.STRING)
    @Column(name = "method_name")
    PaymentMethodName methodName;

    @Column(name = "details")
    String details;
}
