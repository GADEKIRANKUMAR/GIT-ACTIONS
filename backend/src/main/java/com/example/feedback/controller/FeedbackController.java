package com.example.feedback.controller;

import com.example.feedback.controller.dto.FeedbackRequest;
import com.example.feedback.controller.dto.FeedbackResponse;
import com.example.feedback.controller.dto.UpdateFeedbackStatusRequest;
import com.example.feedback.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public FeedbackResponse createFeedback(@Valid @RequestBody FeedbackRequest request,
                                           Authentication authentication) {
        return feedbackService.submitFeedback(authentication.getName(), request);
    }

    @GetMapping("/my")
    public List<FeedbackResponse> myFeedback(Authentication authentication) {
        return feedbackService.findMyFeedback(authentication.getName());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<FeedbackResponse> allFeedback() {
        return feedbackService.findAllFeedback();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public FeedbackResponse updateStatus(@PathVariable Long id,
                                         @Valid @RequestBody UpdateFeedbackStatusRequest request) {
        return feedbackService.updateStatus(id, request.getStatus());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
