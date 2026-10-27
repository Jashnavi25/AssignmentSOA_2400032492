package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.SoftwareTrainingBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoftwareTrainingBatchRepository extends JpaRepository<SoftwareTrainingBatch, Long> 
{
	
}
