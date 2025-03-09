package org.learning.dlearning_backend.service;

import org.learning.dlearning_backend.model.CourseElasticSearch;
import org.springframework.kafka.support.Acknowledgment;

public interface KafkaService {
    void saveToElasticsearch(CourseElasticSearch courseElasticSearch, Acknowledgment acknowledgment);

}
