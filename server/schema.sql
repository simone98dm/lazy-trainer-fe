-- Lazy Trainer Database Schema
-- Extracted from backup: db_cluster-30-06-2024@10-18-37.backup

-- =============================================================================
-- PUBLIC SCHEMA TABLES (Application Tables)
-- =============================================================================

-- Activities Table
-- Stores workout activities/exercises
CREATE TABLE public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    order_index integer NOT NULL,
    reps text DEFAULT '0'::text,
    "requestChange" boolean NOT NULL,
    "sessionId" uuid NOT NULL,
    "time" integer DEFAULT 0,
    warmup boolean DEFAULT false,
    PRIMARY KEY (id)
);

-- Configurations Table
-- Stores user configurations and settings
CREATE TABLE public.configurations (
    id uuid NOT NULL,
    role character varying(255) NOT NULL,
    configurations json,
    PRIMARY KEY (id)
);

-- Plans Table
-- Stores workout plans
CREATE TABLE public.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    "trainerId" uuid,
    "ownerId" uuid NOT NULL,
    PRIMARY KEY (id)
);

-- Sessions Table
-- Stores workout sessions within plans
CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "dayOfWeek" integer NOT NULL,
    "planId" uuid NOT NULL,
    PRIMARY KEY (id)
);

-- =============================================================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================================================

-- Activities -> Sessions relationship
ALTER TABLE public.activities
    ADD CONSTRAINT activities_sessionId_fkey 
    FOREIGN KEY ("sessionId") REFERENCES public.sessions(id) 
    ON DELETE CASCADE;

-- Sessions -> Plans relationship
ALTER TABLE public.sessions
    ADD CONSTRAINT sessions_planId_fkey 
    FOREIGN KEY ("planId") REFERENCES public.plans(id) 
    ON DELETE CASCADE;

-- Plans -> Configurations relationship (owner)
ALTER TABLE public.plans
    ADD CONSTRAINT plans_ownerId_fkey 
    FOREIGN KEY ("ownerId") REFERENCES public.configurations(id) 
    ON DELETE CASCADE;

-- Plans -> Configurations relationship (trainer)
ALTER TABLE public.plans
    ADD CONSTRAINT plans_trainerId_fkey 
    FOREIGN KEY ("trainerId") REFERENCES public.configurations(id) 
    ON DELETE SET NULL;

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX idx_activities_sessionId ON public.activities("sessionId");
CREATE INDEX idx_sessions_planId ON public.sessions("planId");
CREATE INDEX idx_plans_ownerId ON public.plans("ownerId");
CREATE INDEX idx_plans_trainerId ON public.plans("trainerId");

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- GRANTS
-- =============================================================================

-- Activities table grants
GRANT ALL ON TABLE public.activities TO anon;
GRANT ALL ON TABLE public.activities TO authenticated;
GRANT ALL ON TABLE public.activities TO service_role;

-- Configurations table grants
GRANT ALL ON TABLE public.configurations TO anon;
GRANT ALL ON TABLE public.configurations TO authenticated;
GRANT ALL ON TABLE public.configurations TO service_role;

-- Plans table grants
GRANT ALL ON TABLE public.plans TO anon;
GRANT ALL ON TABLE public.plans TO authenticated;
GRANT ALL ON TABLE public.plans TO service_role;

-- Sessions table grants
GRANT ALL ON TABLE public.sessions TO anon;
GRANT ALL ON TABLE public.sessions TO authenticated;
GRANT ALL ON TABLE public.sessions TO service_role;
