import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  avatar_url: z.string().url().optional(),
});

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  duration_weeks: z.number().min(1),
  max_students: z.number().optional(),
  price: z.number().optional(),
  requirements: z.array(z.string()).optional(),
  syllabus: z.string().optional(),
});

export const sessionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  session_date: z.string(),
  duration_minutes: z.number().min(1),
  meeting_link: z.string().url().optional(),
  materials: z.array(z.string()).optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  due_date: z.string(),
  max_score: z.number().min(0),
  instructions: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

export const messageSchema = z.object({
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  content: z.string().min(1, 'Message cannot be empty'),
  receiver_id: z.string().uuid(),
  attachments: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
}); 