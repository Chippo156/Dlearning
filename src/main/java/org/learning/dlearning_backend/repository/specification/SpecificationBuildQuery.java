package org.learning.dlearning_backend.repository.specification;

import org.learning.dlearning_backend.common.SearchOperation;
import org.learning.dlearning_backend.model.Course;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SpecificationBuildQuery {
    private final List<SpecSearchCriteria> criteria;
    public SpecificationBuildQuery() {
        this.criteria = new ArrayList<>();
    }

    public SpecificationBuildQuery with(String key, String operation, String value, String prefix, String suffix) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public SpecificationBuildQuery with(String orPredicate, String key, String operation, String value, String prefix, String suffix) {
        SearchOperation searchOperation = SearchOperation.getOperation(operation.charAt(0));

        // Xác định loại tìm kiếm cho chuỗi (EQUALITY -> CONTAINS / STARTS_WITH / ENDS_WITH)
        if (searchOperation == SearchOperation.EQUALITY) {
            boolean startWith = prefix != null && prefix.equals(SearchOperation.ZERO_OR_MORE_REGEX);
            boolean endWith = suffix != null && suffix.equals(SearchOperation.ZERO_OR_MORE_REGEX);
            if (startWith && endWith) {
                searchOperation = SearchOperation.CONTAINS;
            } else if (startWith) {
                searchOperation = SearchOperation.ENDS_WITH;
            } else {
                searchOperation = SearchOperation.STARTS_WITH;
            }
        }

        // Kiểm tra nếu đã có key này trong danh sách
        boolean keyExists = criteria.stream().anyMatch(c -> c.getKey().equals(key));

        // Kiểm tra giá trị có phải là số không
        boolean isNumber = value.matches("-?\\d+(\\.\\d+)?");

        if (keyExists) {
            // Nếu value là String, áp dụng OR_PREDICATE, nếu là Number thì giữ mặc định AND
            if (!isNumber) {
                criteria.add(new SpecSearchCriteria(key, searchOperation, value, SearchOperation.OR_PREDICATE));
            } else {
                criteria.add(new SpecSearchCriteria(key, searchOperation, value, orPredicate));
            }
        } else {
            criteria.add(new SpecSearchCriteria(key, searchOperation, value, orPredicate));
        }
        return this;
    }


    public Specification<Course> buildQuery() {
        if (criteria.isEmpty()) return null;
        Specification<Course> specification = new SpecificationCourse(criteria.get(0));
        if (criteria.size() > 1) {
            for (int i = 1; i < criteria.size(); i++) {
                specification = criteria.get(i).getOrPredicate()
                        ? specification.or(new SpecificationCourse(criteria.get(i)))
                        : specification.and(new SpecificationCourse(criteria.get(i)));
            }
        }
        return specification;
    }

}
