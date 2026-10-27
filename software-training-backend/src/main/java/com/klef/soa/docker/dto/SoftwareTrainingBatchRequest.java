package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class SoftwareTrainingBatchRequest 
{
    @NotBlank(message = "Course title is required")
    @Size(max = 120, message = "Course title must be at most 120 characters")
    private String courseTitle;

    @NotBlank(message = "Trainer name is required")
    @Size(max = 100, message = "Trainer name must be at most 100 characters")
    private String trainerName;

    @NotNull(message = "Learner count is required")
    @PositiveOrZero(message = "Learner count cannot be negative")
    private Integer learnerCount;

    @NotNull(message = "Online must be true or false")
    private Boolean online;

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
		return "SoftwareTrainingBatchRequest [courseTitle=" + courseTitle + ", trainerName=" + trainerName
				+ ", learnerCount=" + learnerCount + ", online=" + online + "]";
	}
}
