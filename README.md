## Feedback Management System

Production-ready template for collecting user feedback with a Spring Boot backend, React frontend, and optional Docker/Kubernetes deployment assets.

### Features
- JWT-based authentication with role-aware access control.
- Feedback workflow with status transitions (`PENDING`, `IN_PROGRESS`, `RESOLVED`).
- REST API hardened with validation, DTOs, and structured error responses.
- Modern React UI with protected routes, optimistic UX, and API client interceptors.
- Containerized deployment via Docker Compose and manifests for Kubernetes/Ansible.

### Project Structure
```
backend/   # Spring Boot API + JWT auth
frontend/  # React + Vite SPA
infra/     # Optional Ansible playbooks and Kubernetes manifests
```

### Prerequisites
- Java 17+, Maven 3.9+
- Node.js 18+ (for the frontend)
- MySQL 8 (local or container)

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```
Key environment variables (defaults in `application.properties`):
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Configure API base URL via `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Docker Compose
```bash
docker compose up --build
```
This starts MySQL, the backend (port 8080), and the frontend served by Nginx (port 3000).

### Kubernetes (optional)
Apply manifests in `infra/k8s` after creating the namespace:
```bash
kubectl apply -f infra/k8s/namespace.yaml
kubectl apply -f infra/k8s
```

### Testing the API
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Submit feedback: `POST /api/feedback`
- Admin queue: `GET /api/feedback/all`

Use the included Postman collection or curl commands to verify the workflow.

### Conventions
- Backend follows DTO + service layers with Bean Validation.
- Frontend keeps API interaction centralized in `axiosClient`, and UI pieces in reusable components.
- Secrets are injected through environment variables and never hard-coded.

### Roadmap ideas
- Add automated tests (JUnit, React Testing Library).
- Add email notifications for resolved feedback.
- Introduce analytics dashboards for feedback trends.

