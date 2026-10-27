package com.klef.soa.docker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "software_training_batches")
public class SoftwareTrainingBatch 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String courseTitle;

    @Column(nullable = false, length = 100)
    private String trainerName;

    @Column(nullable = false)
    private Integer learnerCount;

    @Column(nullable = false)
    private Boolean online;

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
		return "SoftwareTrainingBatch [id=" + id + ", courseTitle=" + courseTitle + ", trainerName=" + trainerName
				+ ", learnerCount=" + learnerCount + ", online=" + online + "]";
	}

}
