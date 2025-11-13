# API Documentation

This document describes the data layer architecture and API patterns used in Lazy Trainer.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Database Schema](#database-schema)
- [Repositories](#repositories)
- [Models](#models)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

---

## Architecture Overview

Lazy Trainer uses **Supabase** as the backend, providing:

- PostgreSQL database
- Authentication
- Row Level Security (RLS)
- Real-time subscriptions
- Storage for assets

### Data Flow

```
Component → Page → Store → Repository → Supabase → PostgreSQL
```

**Never** bypass this flow. All data access must go through repositories.

---

## Database Schema

### Tables

#### `users`

User profiles and settings.

| Column       | Type      | Description                   |
| ------------ | --------- | ----------------------------- |
| `id`         | uuid      | Primary key (from auth.users) |
| `email`      | text      | User email                    |
| `name`       | text      | Display name                  |
| `is_trainer` | boolean   | Trainer role flag             |
| `created_at` | timestamp | Account creation date         |
| `updated_at` | timestamp | Last update date              |

#### `activities`

Workout activities created by users.

| Column        | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| `id`          | uuid      | Primary key                               |
| `user_id`     | uuid      | Owner (foreign key to users)              |
| `trainer_id`  | uuid      | Trainer (if shared, foreign key to users) |
| `title`       | text      | Activity name                             |
| `description` | text      | Activity description                      |
| `duration`    | integer   | Duration in minutes                       |
| `category`    | text      | Activity category                         |
| `color`       | text      | Badge color                               |
| `icon`        | text      | Icon identifier                           |
| `is_template` | boolean   | Template flag                             |
| `created_at`  | timestamp | Creation date                             |
| `updated_at`  | timestamp | Last update date                          |

#### `sessions`

Training sessions (scheduled activities).

| Column           | Type      | Description                      |
| ---------------- | --------- | -------------------------------- |
| `id`             | uuid      | Primary key                      |
| `user_id`        | uuid      | Owner (foreign key to users)     |
| `activity_id`    | uuid      | Activity reference (foreign key) |
| `scheduled_date` | date      | Scheduled date                   |
| `scheduled_time` | time      | Scheduled time                   |
| `completed`      | boolean   | Completion status                |
| `completed_at`   | timestamp | Completion timestamp             |
| `notes`          | text      | Session notes                    |
| `created_at`     | timestamp | Creation date                    |

#### `plans`

Training plans (collection of activities).

| Column        | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `id`          | uuid      | Primary key                    |
| `user_id`     | uuid      | Owner (foreign key to users)   |
| `trainer_id`  | uuid      | Trainer (foreign key to users) |
| `name`        | text      | Plan name                      |
| `description` | text      | Plan description               |
| `is_active`   | boolean   | Active status                  |
| `start_date`  | date      | Plan start date                |
| `end_date`    | date      | Plan end date                  |
| `created_at`  | timestamp | Creation date                  |
| `updated_at`  | timestamp | Last update date               |

#### `completions`

Activity completion records.

| Column         | Type      | Description                                 |
| -------------- | --------- | ------------------------------------------- |
| `id`           | uuid      | Primary key                                 |
| `user_id`      | uuid      | User (foreign key to users)                 |
| `activity_id`  | uuid      | Activity (foreign key to activities)        |
| `session_id`   | uuid      | Session (foreign key to sessions, optional) |
| `completed_at` | timestamp | Completion time                             |
| `duration`     | integer   | Actual duration in minutes                  |
| `notes`        | text      | Completion notes                            |

### Row Level Security (RLS)

All tables have RLS enabled:

- **Users can**:
  - Read their own data
  - Update their own profile
  - Create activities and sessions
- **Trainers can**:
  - Read client data (where `trainer_id = auth.uid()`)
  - Create activities for clients
  - View client progress

- **Public read** is disabled (authentication required)

---

## Repositories

Repositories are the **only** place where Supabase queries happen.

### Common Repository (`app/repositories/common.ts`)

Base repository interface and utilities.

```typescript
export interface Repository {
  findById<T>(table: string, id: string): Promise<T | null>;
  findAll<T>(table: string): Promise<T[]>;
  create<T>(table: string, data: Partial<T>): Promise<T | null>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<T | null>;
  delete(table: string, id: string): Promise<boolean>;
}
```

### User Repository (`app/repositories/user.ts`)

User-related data access.

#### Methods

**`getCurrentUser(): Promise<User | null>`**

- Get current authenticated user profile
- Returns `null` if not authenticated

**`updateProfile(data: Partial<User>): Promise<User | null>`**

- Update current user profile
- Returns updated user or `null` on error

**`getUserById(id: string): Promise<User | null>`**

- Get user by ID (for trainers viewing clients)
- Respects RLS policies

### Workout Repository (`app/repositories/workout.ts`)

Activity, session, and plan data access.

#### Activity Methods

**`getActivities(): Promise<Activity[]>`**

- Get all activities for current user
- Includes trainer-assigned activities

**`getActivityById(id: string): Promise<Activity | null>`**

- Get specific activity by ID

**`createActivity(data: CreateActivityInput): Promise<Activity | null>`**

- Create new activity
- Validates required fields

**`updateActivity(id: string, data: Partial<Activity>): Promise<Activity | null>`**

- Update existing activity

**`deleteActivity(id: string): Promise<boolean>`**

- Delete activity (soft delete recommended)

#### Session Methods

**`getSessions(startDate?: Date, endDate?: Date): Promise<Session[]>`**

- Get sessions within date range
- Defaults to current week

**`createSession(data: CreateSessionInput): Promise<Session | null>`**

- Schedule new session

**`updateSession(id: string, data: Partial<Session>): Promise<Session | null>`**

- Update session details

**`completeSession(id: string): Promise<Session | null>`**

- Mark session as completed

**`deleteSession(id: string): Promise<boolean>`**

- Delete scheduled session

#### Plan Methods

**`getActivePlan(): Promise<Plan | null>`**

- Get current active plan

**`createPlan(data: CreatePlanInput): Promise<Plan | null>`**

- Create new training plan

**`updatePlan(id: string, data: Partial<Plan>): Promise<Plan | null>`**

- Update plan details

#### Completion Methods

**`getCompletions(startDate?: Date, endDate?: Date): Promise<Completion[]>`**

- Get completion records within date range

**`createCompletion(data: CreateCompletionInput): Promise<Completion | null>`**

- Record activity completion

---

## Models

TypeScript interfaces for data structures.

### Activity Model (`app/models/Activity.ts`)

```typescript
export interface Activity {
  id: string;
  userId: string;
  trainerId?: string;
  title: string;
  description?: string;
  duration: number;
  category: string;
  color: string;
  icon: string;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActivityInput {
  title: string;
  description?: string;
  duration: number;
  category: string;
  color?: string;
  icon?: string;
}

export interface ActivityDTO {
  id: string;
  user_id: string;
  trainer_id?: string;
  title: string;
  description?: string;
  duration: number;
  category: string;
  color: string;
  icon: string;
  is_template: boolean;
  created_at: string;
  updated_at: string;
}

// DTO Mapping
export function mapActivityDTOToActivity(dto: ActivityDTO): Activity {
  return {
    id: dto.id,
    userId: dto.user_id,
    trainerId: dto.trainer_id,
    title: dto.title,
    description: dto.description,
    duration: dto.duration,
    category: dto.category,
    color: dto.color,
    icon: dto.icon,
    isTemplate: dto.is_template,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at),
  };
}
```

### Session Model (`app/models/Session.ts`)

```typescript
export interface Session {
  id: string;
  userId: string;
  activityId: string;
  scheduledDate: Date;
  scheduledTime?: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
}

export interface CreateSessionInput {
  activityId: string;
  scheduledDate: Date;
  scheduledTime?: string;
  notes?: string;
}
```

### User Model (`app/models/User.ts`)

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  isTrainer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  is_trainer: boolean;
  created_at: string;
  updated_at: string;
}
```

---

## Error Handling

### Repository Error Patterns

Repositories return `null` on error (never throw):

```typescript
async function getActivityById(id: string): Promise<Activity | null> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapActivityDTOToActivity(data);
  } catch (error) {
    logger.error('Failed to get activity', error);
    return null;
  }
}
```

### Store Error Handling

Stores handle errors and show user notifications:

```typescript
async function loadActivities() {
  loading.value = true;
  error.value = null;

  const result = await workoutRepo.getActivities();

  if (result) {
    activities.value = result;
  } else {
    error.value = 'Failed to load activities';
    toastStore.error('Could not load activities. Please try again.');
  }

  loading.value = false;
}
```

### Page Error Display

Pages display error states to users:

```vue
<template>
  <div>
    <BaseBanner v-if="activityStore.error" type="error">
      {{ activityStore.error }}
    </BaseBanner>

    <Loading v-if="activityStore.loading" />

    <ActivityList v-else :activities="activityStore.activities" />
  </div>
</template>
```

---

## Best Practices

### ✅ DO

1. **Use repositories for all data access**

   ```typescript
   const workoutRepo = workoutRepository();
   const activities = await workoutRepo.getActivities();
   ```

2. **Map DTOs to models**

   ```typescript
   const activity = mapActivityDTOToActivity(dto);
   ```

3. **Handle errors gracefully**

   ```typescript
   const result = await workoutRepo.createActivity(data);
   if (!result) {
     toastStore.error('Failed to create activity');
     return;
   }
   ```

4. **Use TypeScript types**

   ```typescript
   async function createActivity(
     data: CreateActivityInput,
   ): Promise<Activity | null>;
   ```

5. **Log errors**
   ```typescript
   catch (error) {
     logger.error('Operation failed', error);
     return null;
   }
   ```

### ❌ DON'T

1. **Don't query Supabase in components/pages**

   ```typescript
   // ❌ BAD
   const { data } = await supabase.from('activities').select();
   ```

2. **Don't throw errors in repositories**

   ```typescript
   // ❌ BAD
   throw new Error('Activity not found');
   ```

3. **Don't ignore errors**

   ```typescript
   // ❌ BAD
   await workoutRepo.createActivity(data); // No error handling
   ```

4. **Don't use `any` types**

   ```typescript
   // ❌ BAD
   async function getData(): Promise<any>;
   ```

5. **Don't bypass the store layer**
   ```typescript
   // ❌ BAD - Component calling repository directly
   const activities = await workoutRepo.getActivities();
   ```

---

## Testing

### Repository Tests

Mock Supabase client:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { workoutRepository } from '~/repositories/workout';

describe('workoutRepository', () => {
  it('gets activities', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: [
            /* mock data */
          ],
          error: null,
        }),
      }),
    };

    // Test implementation
  });
});
```

### Store Tests

Mock repository:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useActivityStore } from '~/stores/activity';

describe('activityStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('loads activities', async () => {
    const store = useActivityStore();
    await store.loadActivities();
    expect(store.activities).toHaveLength(0);
  });
});
```

---

## Future Enhancements

- [ ] Real-time subscriptions for collaborative features
- [ ] Offline-first with IndexedDB sync
- [ ] GraphQL API layer
- [ ] Webhook integrations
- [ ] Advanced filtering and search
- [ ] Bulk operations
- [ ] Export/import functionality

---

**Last Updated**: November 13, 2025
