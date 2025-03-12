package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.model.CourseElasticSearch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.ReactiveElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseElasticRepository extends ReactiveElasticsearchRepository<CourseElasticSearch, Long>{

}
