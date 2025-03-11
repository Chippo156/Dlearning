package org.learning.dlearning_backend.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.response.CourseResponse;
import org.learning.dlearning_backend.dto.response.PageResponse;
import org.learning.dlearning_backend.mapper.CourseMapper;
import org.learning.dlearning_backend.model.Course;
import org.learning.dlearning_backend.repository.criteria.SearchCriteria;
import org.learning.dlearning_backend.repository.criteria.SearchCriteriaQueryConsumer;
import org.learning.dlearning_backend.repository.specification.SpecificationBuildQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
@Slf4j
public class SearchRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private CourseRepository courseRepository;


    public PageResponse<CourseResponse> getCourseWithSortMultiFieldAndSearch(int page, int size, String sortBy, String... search){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Course> criteriaQuery = criteriaBuilder.createQuery(Course.class);
        Root<Course> root = criteriaQuery.from(Course.class);
        Predicate predicate = criteriaBuilder.conjunction();

        List<SearchCriteria> criteriaList = new ArrayList<>();
        if(search != null){
            for (String s : search){
                Pattern pattern = Pattern.compile("(\\w+?)([:<>!])(.*)");
                Matcher matcher = pattern.matcher(s);
                if(matcher.find()){
                    criteriaList.add(SearchCriteria.builder()
                            .key(matcher.group(1))
                            .operation(matcher.group(2))
                            .value(matcher.group(3))
                            .build());
                }
            }
        }
        SearchCriteriaQueryConsumer searchCriteriaQueryConsumer = new SearchCriteriaQueryConsumer(criteriaBuilder, root, predicate);
        if(!criteriaList.isEmpty()){
            criteriaList.forEach(searchCriteriaQueryConsumer);
            predicate = searchCriteriaQueryConsumer.getPredicate();
            criteriaQuery.where(predicate);
        }
        if(StringUtils.hasLength(sortBy)){
            Pattern pattern = Pattern.compile("(\\w+?)([:><!])(asc|desc)");
            Matcher matcher = pattern.matcher(sortBy);
            if(matcher.find()){
                if("asc".equals(matcher.group(3))){
                    criteriaQuery.orderBy(criteriaBuilder.asc(root.get(matcher.group(1))));
                }else {
                    criteriaQuery.orderBy(criteriaBuilder.desc(root.get(matcher.group(1))));
                }
            }
        }
        List<Course> courses = entityManager.createQuery(criteriaQuery)
                .setFirstResult((page-1)*size)
                .setMaxResults(size)
                .getResultList();
        long totalElement = entityManager.createQuery(criteriaQuery).getResultList().size();
        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalElements(totalElement)
                .totalPages((int) Math.ceil(totalElement/(double) size))
                .result(courses.stream().map(courseMapper::toCourseResponse).toList())
                .build();
    }
    public PageResponse<CourseResponse> getCourseWithSortAndSearchSpecification(int page, int size, String sortBy, String... search){
        Sort sort = Sort.by(sortBy);
        Pageable pageable = PageRequest.of(page-1,size,sort);
        SpecificationBuildQuery specificationBuildQuery = new SpecificationBuildQuery();
        if(search != null){
            for (String course : search){
                Pattern pattern = Pattern.compile("(\\w+?)([:><!~^$.])(.*)(\\p{Punct}?)(.*)(\\p{Punct}?)");
                Matcher matcher = pattern.matcher(course);
                if(matcher.find()) {
                    specificationBuildQuery.with(matcher.group(1), matcher.group(2), matcher.group(3),
                            matcher.group(4), matcher.group(5));
                }
            }
        }
        Page<Course> pageCourses = courseRepository.findAll(specificationBuildQuery.buildQuery(), pageable);
        List<Course> listCourses = pageCourses.getContent();
        return PageResponse.<CourseResponse>builder()
                .currentPage(page)
                .pageSize(pageable.getPageSize())
                .totalElements(pageCourses.getTotalElements())
                .totalPages(pageCourses.getTotalPages())
                .result(listCourses.stream().map(courseMapper::toCourseResponse).toList())
                .build();
    }
}
