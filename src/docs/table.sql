-- Create ENUM types
CREATE TYPE USER_ROLE AS ENUM ('GeneralUser', 'LocalAuthority', 'OrganizationRepresentative', 'Admin');
CREATE TYPE USER_ACCOUNT_STATUS AS ENUM ('PendingEmailVerification', 'PendingAdminApproval', 'Active', 'Suspended', 'Banned');
CREATE TYPE REPORT_CATEGORY AS ENUM ('WildlifeHazard', 'WasteManagement', 'Pollution', 'Biodiversity', 'Other');
CREATE TYPE REPORT_PRIORITY AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE REPORT_STATUS AS ENUM ('Submitted', 'InProgress', 'Resolved', 'Rejected', 'Claimed');
CREATE TYPE RESOURCE_TYPE AS ENUM ('Article', 'Video', 'PDF', 'Link');
CREATE TYPE COMMUNITY_TYPE AS ENUM ('LocationBased', 'OrganizationLed');
CREATE TYPE RSVP_STATUS AS ENUM ('Attending', 'Maybe', 'NotAttending');
CREATE TYPE GAMIFICATION_ACTIVITY_TYPE AS ENUM ('ReportSubmission', 'ReportResolution', 'Comment', 'Upvote', 'QuizCompletion', 'ResourceRead', 'EventCreation', 'BadgeEarned');
CREATE TYPE LOG_LEVEL AS ENUM ('INFO', 'WARN', 'ERROR', 'DEBUG');
CREATE TYPE NOTIFICATION_TYPE AS ENUM ('report_update', 'new_message', 'event_reminder', 'admin_message', 'gamification_award');

-- Table: User
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) UNIQUE,
    role USER_ROLE NOT NULL,
    image VARCHAR(255),
    bio TEXT,
    location JSONB, -- GeoJSON type can be stored as JSONB
    interests TEXT[], -- Array of strings
    emailVerified BOOLEAN DEFAULT FALSE,
    accountStatus USER_ACCOUNT_STATUS DEFAULT 'PendingEmailVerification',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Organization
CREATE TABLE "Organization" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    focusAreas TEXT[], -- Array of strings
    contactEmail VARCHAR(255),
    websiteUrl VARCHAR(255),
    logoUrl VARCHAR(255),
    adminApproved BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Report
CREATE TABLE "Report" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submittedByUserId UUID NOT NULL REFERENCES "User"(id),
    location JSONB NOT NULL, -- GeoJSON type can be stored as JSONB
    category REPORT_CATEGORY NOT NULL,
    description TEXT NOT NULL,
    priority REPORT_PRIORITY NOT NULL,
    status REPORT_STATUS DEFAULT 'Submitted',
    mediaUrls TEXT[], -- Array of strings
    assignedToOrgId UUID REFERENCES "Organization"(id),
    assignedToLocalAuthorityId UUID REFERENCES "User"(id), -- Assuming LocalAuthority is a User role
    resolutionNotes TEXT,
    resolvedByUserId UUID REFERENCES "User"(id),
    resolvedAt TIMESTAMP WITH TIME ZONE,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Comment
CREATE TABLE "Comment" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reportId UUID NOT NULL REFERENCES "Report"(id),
    userId UUID NOT NULL REFERENCES "User"(id),
    content TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Resource
CREATE TABLE "Resource" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type RESOURCE_TYPE NOT NULL,
    contentUrl VARCHAR(255) NOT NULL,
    publishedByOrgId UUID NOT NULL REFERENCES "Organization"(id),
    adminApproved BOOLEAN DEFAULT FALSE,
    tags TEXT[], -- Array of strings
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Community
CREATE TABLE "Community" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type COMMUNITY_TYPE NOT NULL,
    location JSONB, -- GeoJSON type can be stored as JSONB
    createdByOrgId UUID REFERENCES "Organization"(id),
    memberCount INTEGER DEFAULT 0,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: CommunityMember (Junction table for User and Community)
CREATE TABLE "CommunityMember" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    communityId UUID NOT NULL REFERENCES "Community"(id),
    userId UUID NOT NULL REFERENCES "User"(id),
    joinedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (communityId, userId) -- A user can only be a member of a community once
);

-- Table: Event
CREATE TABLE "Event" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    communityId UUID NOT NULL REFERENCES "Community"(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location JSONB NOT NULL, -- GeoJSON type can be stored as JSONB
    startTime TIMESTAMP WITH TIME ZONE NOT NULL,
    endTime TIMESTAMP WITH TIME ZONE NOT NULL,
    createdByUserId UUID NOT NULL REFERENCES "User"(id),
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: EventAttendee (Junction table for User and Event)
CREATE TABLE "EventAttendee" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    eventId UUID NOT NULL REFERENCES "Event"(id),
    userId UUID NOT NULL REFERENCES "User"(id),
    rsvpStatus RSVP_STATUS NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (eventId, userId) -- A user can only RSVP to an event once
);

-- Table: GamificationPoint
CREATE TABLE "GamificationPoint" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL REFERENCES "User"(id),
    points INTEGER NOT NULL,
    activityType GAMIFICATION_ACTIVITY_TYPE NOT NULL,
    referenceId UUID, -- Can reference Report, Comment, Quiz, Resource, Event, Badge
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Badge
CREATE TABLE "Badge" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    criteria TEXT NOT NULL
);

-- Table: UserBadge (Junction table for User and Badge)
CREATE TABLE "UserBadge" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL REFERENCES "User"(id),
    badgeId UUID NOT NULL REFERENCES "Badge"(id),
    earnedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (userId, badgeId) -- A user can only earn a badge once
);

-- Table: Log
CREATE TABLE "Log" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    level LOG_LEVEL NOT NULL,
    message TEXT NOT NULL,
    userId UUID REFERENCES "User"(id),
    context JSONB -- Optional: for storing additional structured log data
);

-- Table: Notification
CREATE TABLE "Notification" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL REFERENCES "User"(id),
    type NOTIFICATION_TYPE NOT NULL,
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    oneSignalPlayerId VARCHAR(255), -- OneSignal player ID for push notifications
    referenceId UUID, -- Optional: ID of the entity related to the notification (e.g., Report ID, Event ID)
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);