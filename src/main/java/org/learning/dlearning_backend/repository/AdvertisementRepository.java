package org.learning.dlearning_backend.repository;

import org.learning.dlearning_backend.common.AdsStatus;
import org.learning.dlearning_backend.model.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    @Query("SELECT ads FROM Advertisement ads WHERE ads.user.id = :userId ORDER BY ads.createdAt DESC")
    Page<Advertisement> findAdvertisementByUserId(Long userId, Pageable pageable);

    @Query("SELECT ads FROM Advertisement ads WHERE ads.adsStatus = :status")
    List<Advertisement> findAdvertisementByApprovalStatusActive(@Param("status") AdsStatus status);
}
