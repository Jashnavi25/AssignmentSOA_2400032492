package com.klef.soa.docker.dto;

import com.klef.soa.docker.entity.SoftwareTrainingBatch;

public class SoftwareTrainingBatchResponse 
{
    private Long id;
    private String courseTitle;
    private String trainerName;
    private Integer learnerCount;
    private Boolean online;
    
    public SoftwareTrainingBatchResponse(SoftwareTrainingBatch batch) 
    {
        this.id = batch.getId();
        this.courseTitle = batch.getCourseTitle();
        this.trainerName = batch.getTrainerName();
        this.learnerCount = batch.getLearnerCount();
        this.online = batch.getOnline();
    }
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCourseTitle() {
		return courseTitle;
	}
	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}
	public String getTrainerName() {
		return trainerName;
	}
	public void setTrainerName(String trainerName) {
		this.trainerName = trainerName;
	}
	public Integer getLearnerCount() {
		return learnerCount;
	}
	public void setLearnerCount(Integer learnerCount) {
		this.learnerCount = learnerCount;
	}
	public Boolean getOnline() {
		return online;
	}
	public void setOnline(Boolean online) {
		this.online = online;
	}
	@Override
	public String toString() {
		return "SoftwareTrainingBatchResponse [id=" + id + ", courseTitle=" + courseTitle + ", trainerName="
				+ trainerName + ", learnerCount=" + learnerCount + ", online=" + online + "]";
	}

    
}
