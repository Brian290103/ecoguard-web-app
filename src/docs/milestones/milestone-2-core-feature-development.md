# Milestone 2: Core Feature Development (MVP)

## Objective
Develop and implement the minimum viable product (MVP) features, focusing on essential user functionalities for reporting and basic community interaction.

## Key Tasks & Deliverables

### 2.1 User Authentication & Profile Management
- **Task**: Implement User (General User) self-registration with email verification.
  - **Deliverable**: Functional sign-up, sign-in, forgot password, and email verification flows.
  - **Reference**: `src/docs/workflow/user-workflow.md`
- **Task**: Implement Local Authority self-registration with email verification and Admin approval.
  - **Deliverable**: Functional registration and approval flow for Local Authorities.
  - **Reference**: `src/docs/workflow/local-authority-workflow.md`
- **Task**: Implement Organization Representative self-registration with email verification and Admin approval.
  - **Deliverable**: Functional registration and approval flow for Organization Representatives.
  - **Reference**: `src/docs/workflow/organization-rep-workflow.md`
- **Task**: Develop basic user profile management (edit details, view activity).
  - **Deliverable**: User profile pages.

### 2.2 Environmental Issue Reporting
- **Task**: Implement report submission form (location, photos, description, category, priority).
  - **Deliverable**: Functional report submission on mobile and web.
  - **Reference**: `src/docs/workflow/user-workflow.md`
- **Task**: Implement priority-based notification routing (Local Authorities for High, Organizations for Medium/Low).
  - **Deliverable**: Automated notifications based on report priority.
  - **Reference**: `src/docs/prd/02-features-and-functionality.md`
- **Task**: Develop report status tracking for General Users.
  - **Deliverable**: Users can view status of their submitted reports.

### 2.3 Basic Community Interaction
- **Task**: Implement core community forums/chats (Stream integration).
  - **Deliverable**: Functional chat and discussion features.
  - **Reference**: `src/docs/prd/02-features-and-functionality.md`
- **Task**: Develop automatic community grouping based on location (initial 1KM radius, 50 user threshold).
  - **Deliverable**: Backend logic for community creation and user assignment.
  - **Reference**: `src/docs/workflow/user-workflow.md`

## Success Criteria
- All user types can successfully register, verify, and sign in.
- General Users can submit reports with all required fields and track their status.
- Priority-based notifications are correctly routed to Local Authorities and Organizations.
- Basic community chat functionality is operational.
- Location-based community grouping is functional for new users.
- Core features are stable and meet basic functional requirements.