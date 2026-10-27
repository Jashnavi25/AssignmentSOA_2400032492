
package com.klef.soa.docker.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.entity.SoftwareTrainingBatch;
import com.klef.soa.docker.service.SoftwareTrainingBatchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/SoftwareTrainingBatch")
public class SoftwareTrainingBatchController 
{

    @Autowired
    private SoftwareTrainingBatchService service;

    @GetMapping("/")
    public String home() 
    {
        return "CRUD Service is running";
    }

    @GetMapping("/displayall")
    public List<SoftwareTrainingBatch> displayall() 
    {
        return service.displayAll();
    }

    @PostMapping("/add")
    public ResponseEntity<SoftwareTrainingBatch> addBatch(@RequestBody SoftwareTrainingBatch batch) 
    {

        SoftwareTrainingBatch saved = service.addBatch(batch);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SoftwareTrainingBatch> getById(@PathVariable Long id) 
    {

        Optional<SoftwareTrainingBatch> optional =  service.getBatchById(id);

        if (optional.isPresent()) 
        {
            return ResponseEntity.ok(optional.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SoftwareTrainingBatch> update(@PathVariable Long id, @RequestBody SoftwareTrainingBatch batch) 
    {

        SoftwareTrainingBatch updated = service.updateBatch(id, batch);

        if (updated != null) 
        {
            return ResponseEntity.ok(updated);
        }

        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletebyid(@PathVariable Long id) 
    {

        String msg = service.deleteById(id);

        if ("Deleted successfully".equals(msg)) 
        {
            return ResponseEntity.ok(msg);
        }

        return ResponseEntity.status(404).body(msg);
    }
}
