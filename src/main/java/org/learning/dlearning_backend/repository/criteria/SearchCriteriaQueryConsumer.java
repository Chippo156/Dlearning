package org.learning.dlearning_backend.repository.criteria;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.*;

import java.util.function.Consumer;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchCriteriaQueryConsumer implements Consumer<SearchCriteria> {
    private CriteriaBuilder criteriaBuilder;
    private Root<?> root;
    private Predicate predicate;

    @Override
    public void accept(SearchCriteria searchCriteria) {
        switch (searchCriteria.getOperation()) {
            case ":" -> {
                if (root.get(searchCriteria.getKey()).getJavaType().equals(String.class)) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(
                            root.get(searchCriteria.getKey()), "%" + searchCriteria.getValue() + "%"));
                } else {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(
                            root.get(searchCriteria.getKey()), searchCriteria.getValue()));
                }
            }
            case "!" -> predicate = criteriaBuilder.and(predicate, criteriaBuilder.notEqual(
                    root.get(searchCriteria.getKey()), searchCriteria.getValue()));
            case ">" -> predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(
                    root.get(searchCriteria.getKey()), searchCriteria.getValue().toString()));
            case "<" -> predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(
                    root.get(searchCriteria.getKey()), searchCriteria.getValue().toString()));
        }
    }
}
