
package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.SoftwareTrainingBatch;
import com.klef.soa.docker.repository.SoftwareTrainingBatchRepository;

@Service
public class SoftwareTrainingBatchServiceImpl implements SoftwareTrainingBatchService 
{

    @Autowired
    private SoftwareTrainingBatchRepository repo;

    @Override
    public SoftwareTrainingBatch addBatch(SoftwareTrainingBatch batch) 
    {
        return repo.save(batch);
    }

    @Override
    public List<SoftwareTrainingBatch> displayAll() 
    {
        return repo.findAll();
    }

    @Override
    public String deleteById(Long id) 
    {
        Optional<SoftwareTrainingBatch> optional = repo.findById(id);

        if (optional.isPresent()) 
        {
            SoftwareTrainingBatch existing = optional.get();
            repo.delete(existing);
            return "Deleted successfully";
        } 
        else 
        {
            return "ID not found";
        }
    }

    @Override
    public Optional<SoftwareTrainingBatch> getBatchById(Long id) 
    {
        return repo.findById(id);
    }

    @Override
    public SoftwareTrainingBatch updateBatch(Long id, SoftwareTrainingBatch batch) 
    {

        Optional<SoftwareTrainingBatch> optional = repo.findById(id);

        if (optional.isPresent()) 
        {
            SoftwareTrainingBatch existing = optional.get();

            existing.setCourseTitle(batch.getCourseTitle());
            existing.setTrainerName(batch.getTrainerName());
            existing.setLearnerCount(batch.getLearnerCount());
            existing.setOnline(batch.getOnline());

            return repo.save(existing);
        }

        return null;
    }
}
