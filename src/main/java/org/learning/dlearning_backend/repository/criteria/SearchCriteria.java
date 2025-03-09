package org.learning.dlearning_backend.repository.criteria;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchCriteria {
    private String key;  // tên cột cần tìm kiếm
    private String operation; // phép toán tìm kiếm
    private Object value; // giá trị cần tìm kiếm
}
