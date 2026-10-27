package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SoftwareTrainingBatchApplication 
{
    public static void main(String[] args) 
    {
        SpringApplication.run(SoftwareTrainingBatchApplication.class, args);
        System.out.println("Software Traning Project is Runing...!");
    }
}
