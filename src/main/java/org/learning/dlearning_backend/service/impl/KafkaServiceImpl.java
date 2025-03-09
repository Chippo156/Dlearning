package org.learning.dlearning_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.model.CourseElasticSearch;
import org.learning.dlearning_backend.repository.CourseElasticRepository;
import org.learning.dlearning_backend.service.KafkaService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaServiceImpl implements KafkaService {
    private final CourseElasticRepository elasticRepository;
    @Override
    @KafkaListener(topics = "save-to-elastic-search" , groupId = "course-elastic-search")
    public void saveToElasticsearch(CourseElasticSearch courseElasticSearch, Acknowledgment acknowledgment) {
       try{
           log.info("Save course {} to elastic search", courseElasticSearch.getId());
           if(!elasticRepository.existsById(courseElasticSearch.getId())){
               elasticRepository.save(courseElasticSearch);
               log.info("Course {} saved to elastic search", courseElasticSearch.getId());
               acknowledgment.acknowledge();
           }
           else{
                log.info("Course {} already existed in elastic search", courseElasticSearch.getId());

           }
       }
       catch (Exception e){
           log.error("Error while saving course {} to elastic search", courseElasticSearch.getId());
       }

    }
}
