package com.example.feedback.service;

import com.example.feedback.controller.dto.FeedbackRequest;
import com.example.feedback.controller.dto.FeedbackResponse;
import com.example.feedback.exception.ResourceNotFoundException;
import com.example.feedback.model.Feedback;
import com.example.feedback.model.FeedbackStatus;
import com.example.feedback.model.User;
import com.example.feedback.repository.FeedbackRepository;
import com.example.feedback.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public FeedbackResponse submitFeedback(String username, FeedbackRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        Feedback feedback = new Feedback();
        feedback.setTitle(request.getTitle());
        feedback.setMessage(request.getMessage());
        feedback.setRating(request.getRating());
        feedback.setUser(user);
        feedback.setStatus(FeedbackStatus.PENDING);

        return toResponse(feedbackRepository.save(feedback));
    }

    @Transactional(readOnly = true)
    public List<FeedbackResponse> findMyFeedback(String username) {
        return feedbackRepository.findByUserUsername(username)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FeedbackResponse> findAllFeedback() {
        return feedbackRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public FeedbackResponse updateStatus(Long id, FeedbackStatus status) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found: " + id));
        feedback.setStatus(status);
        return toResponse(feedbackRepository.save(feedback));
    }

    @Transactional
    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new ResourceNotFoundException("Feedback not found: " + id);
        }
        feedbackRepository.deleteById(id);
    }

    private FeedbackResponse toResponse(Feedback feedback) {
        FeedbackResponse response = new FeedbackResponse();
        response.setId(feedback.getId());
        response.setTitle(feedback.getTitle());
        response.setMessage(feedback.getMessage());
        response.setRating(feedback.getRating());
        response.setStatus(feedback.getStatus());
        response.setCreatedAt(feedback.getCreatedAt());
        response.setSubmittedBy(feedback.getUser() != null ? feedback.getUser().getUsername() : null);
        return response;
    }
}

