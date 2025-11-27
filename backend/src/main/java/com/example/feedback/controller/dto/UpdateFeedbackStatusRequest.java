package com.example.feedback.controller.dto;

import com.example.feedback.model.FeedbackStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateFeedbackStatusRequest {

    @NotNull
    private FeedbackStatus status;

    public FeedbackStatus getStatus() {
        return status;
    }

    public void setStatus(FeedbackStatus status) {
        this.status = status;
    }
}

