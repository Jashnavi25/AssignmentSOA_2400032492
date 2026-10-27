
package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import com.klef.soa.docker.entity.SoftwareTrainingBatch;

public interface SoftwareTrainingBatchService 
{
    SoftwareTrainingBatch addBatch(SoftwareTrainingBatch batch);
    List<SoftwareTrainingBatch> displayAll();
    String deleteById(Long id);
    Optional<SoftwareTrainingBatch> getBatchById(Long id);
    SoftwareTrainingBatch updateBatch(Long id, SoftwareTrainingBatch batch);
}
