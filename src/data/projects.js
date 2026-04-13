export const projects = [
  {
    id: 1,
    title: 'CRM System',
    subtitle: 'IT Training Institute',
    description:
      'In-house proprietary CRM built from scratch for an IT training institute — not publicly accessible. Features a robust RBAC middleware layer enforcing 3 permission tiers (Admin / Counselor / Student). Replaced a spreadsheet workflow and supports 10,000+ student records with sub-200ms query times.',
    tech: ['MERN Stack', 'JWT', 'RBAC', 'Mongoose', 'React Router'],
    color: 'accent',
    colorHex: '#0CFCA8',
    highlights: [
      '~50% reduction in lead-to-enrollment tracking time',
      '10K+ records at sub-200ms query speed',
      'Zero role-leakage incidents in production',
    ],
    github: 'https://github.com/dev-ayush0106',
    live: null,
    featured: true,
    tag: 'Full Stack',

    // ── Modal Data ────────────────────────────────────────────────────────────
    modal: {
      version: 'v2.4.1',
      status: 'Production',
      overview: `A production-grade CRM built in-house for an IT training institute, managing leads, students, courses, enrollments, and fee collection. Developed as a proprietary internal tool — not publicly accessible. The system replaced a fragmented spreadsheet workflow that caused data inconsistencies and reporting delays. It now serves as the single source of truth for all institute operations across Admin, Counselor, and Student roles.`,

      problem: `The institute was managing 10,000+ student records across multiple Excel sheets shared over WhatsApp. Lead assignment was manual, enrollment tracking was error-prone, and fee records were inconsistent. Generating monthly reports took 2-3 days of manual work.`,

      solution: `Built a centralized MERN stack CRM with role-based access control, automated lead assignment, real-time enrollment tracking, and one-click report generation. Each role sees only the data and actions relevant to them.`,

      architecture: {
        layers: [
          { name: 'React Frontend', detail: 'SPA with React Router v6, protected route guards, role-based UI rendering' },
          { name: 'Express API Layer', detail: 'RESTful API with 12+ endpoints, JWT middleware on every route, RBAC enforcement' },
          { name: 'Business Logic', detail: 'Service layer separating controllers from DB — lead assignment engine, fee calculator' },
          { name: 'MongoDB + Mongoose', detail: '5 relational schemas with compound indexes, virtual fields, and pre-save hooks' },
        ],
        diagram: [
          { label: 'Client (React)', color: '#0CFCA8', x: 10 },
          { label: 'Express API', color: '#38BDF8', x: 35 },
          { label: 'RBAC Middleware', color: '#FFB347', x: 60 },
          { label: 'MongoDB', color: '#A788FA', x: 85 },
        ],
      },

      metrics: [
        { label: 'API Response Time', value: '<200ms', sub: 'avg across all endpoints', color: '#0CFCA8', bar: 92 },
        { label: 'Lead→Enroll Time ↓', value: '50%',   sub: 'vs previous spreadsheet', color: '#38BDF8', bar: 50 },
        { label: 'Role Leakage Incidents', value: '0', sub: 'since go-live', color: '#0CFCA8', bar: 100 },
        { label: 'Student Records', value: '10K+',     sub: 'supported without degradation', color: '#A788FA', bar: 80 },
        { label: 'Report Gen Time',  value: '~3s',     sub: 'vs 2-3 days manual', color: '#FFB347', bar: 97 },
        { label: 'Unauthorized Errors', value: '0',    sub: 'in QA and production', color: '#0CFCA8', bar: 100 },
      ],

      security: [
        { badge: 'JWT Auth',         detail: 'Access tokens (15min) + refresh tokens (7d). Tokens are httpOnly cookies — not localStorage.', level: 'High' },
        { badge: 'RBAC Middleware',  detail: 'Every route checks req.user.role against an allowedRoles array before hitting the controller.', level: 'High' },
        { badge: 'Input Validation', detail: 'Mongoose schema-level validation + express-validator on all POST/PUT endpoints.', level: 'Medium' },
        { badge: 'Password Hashing', detail: 'bcrypt with salt rounds = 12. Passwords never stored or logged in plaintext.', level: 'High' },
        { badge: 'Rate Limiting',    detail: 'express-rate-limit on auth routes — max 5 attempts per 15 minutes per IP.', level: 'Medium' },
        { badge: 'CORS Policy',      detail: 'Strict origin whitelist — only the frontend domain is allowed.', level: 'Medium' },
      ],

      techDeep: [
        { name: 'Compound Indexes', detail: 'MongoDB indexes on (leadId, status) and (studentId, courseId) — reduced full collection scans, avg query time dropped ~40%.' },
        { name: 'RBAC Pattern',     detail: 'Middleware factory: rbac(["admin","counselor"]) returns an Express middleware that checks the decoded JWT role. Zero role-leakage architecture.' },
        { name: 'React Router Guards', detail: 'ProtectedRoute component checks auth state and role before rendering. Unauthorized access redirects to login with the original path saved.' },
        { name: 'Mongoose Virtuals', detail: 'enrollmentCount and totalFees are computed as virtual fields — not stored in DB, calculated on read. Keeps storage lean.' },
      ],

      codeSnippet: {
        title: 'rbac.middleware.js',
        code: `const rbac = (allowedRoles) => (req, res, next) => {
  const user = req.user;          // set by JWT middleware
  if (!user || !allowedRoles.includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied — insufficient permissions',
    });
  }
  next();
};

// Usage on routes:
router.delete('/lead/:id',
  verifyToken,
  rbac(['admin']),   // only admin can delete
  LeadController.delete
);`,
      },
    },
  },

  {
    id: 2,
    title: 'FlowTrack',
    subtitle: 'Daily Productivity Intelligence Dashboard',
    description:
      'A productivity intelligence dashboard built with React 19 + Vite 8, backed by Supabase for database and full authentication & authorization. Features recurring task automation, browser push notifications, Recharts analytics dashboard with accuracy/concentration tracking — deployed on GitHub Pages.',
    tech: ['React 19', 'Vite 8', 'Supabase', 'Recharts', 'Framer Motion', 'date-fns'],
    color: 'sky',
    colorHex: '#38BDF8',
    highlights: [
      'Full auth & authorization with Supabase — secure user sessions',
      'Recurring tasks auto-create next occurrence on completion',
      'Analytics: accuracy %, concentration %, daily streak, per-day drill-down',
    ],
    github: 'https://github.com/dev-ayush0106',
    live: 'https://dev-ayush0106.github.io/daily-flow/',
    featured: true,
    tag: 'Frontend',

    modal: {
      version: 'v1.0.0',
      status: 'Live · GitHub Pages',
      overview: `FlowTrack is a productivity intelligence dashboard built with React 19 and Vite 8, with Supabase powering the database and full authentication & authorization. Users sign up, log in, and their tasks and history are securely persisted per account. It tracks daily todos across 6 categories and 3 priority levels, auto-generates recurring tasks, fires browser push notifications for upcoming deadlines, and visualises performance through a Recharts analytics dashboard. Deployed to GitHub Pages via gh-pages.`,

      problem: `Most productivity apps are over-engineered — they require accounts, internet access, and subscriptions just to track daily tasks. What was needed was a fast, private tool that doesn't just track completion but measures how accurately and on-time work gets done over time, with real user accounts and persistent data.`,

      solution: `A tab-based SPA backed by Supabase for auth and database. Supabase Auth handles secure user sessions (sign-up, login, JWT tokens). All task and history data is stored in Supabase tables per user — not just localStorage. Analytics computations are pure utility functions. Notifications are handled by a dedicated module using the Web Notifications API with sessionStorage deduplication so alerts only fire once per session.`,

      architecture: {
        layers: [
          { name: 'React 19 UI Layer',       detail: 'Tab-based routing via useState (no React Router). Framer Motion for page transitions, entrance animations, animated orb backgrounds. lucide-react for all icons.' },
          { name: 'Supabase Auth',           detail: 'Email/password authentication with Supabase Auth. JWT-based sessions managed automatically. Protected routes redirect unauthenticated users to login.' },
          { name: 'Supabase Database',       detail: 'PostgreSQL via Supabase — tasks and history stored per user. Row Level Security (RLS) policies ensure users can only access their own data.' },
          { name: 'useTodos Custom Hook',    detail: 'Single hook owns all task state: add/edit/delete/toggle, recurring logic. Syncs to Supabase on every mutation, reads on mount.' },
          { name: 'analytics.js Module',     detail: 'Pure functions: completion accuracy %, concentration % (on-time / total), daily streak, per-day drill-down — computed from task history.' },
          { name: 'notifications.js Module', detail: 'Polls tasks every minute, fires Web Notifications API alert for tasks due within 10 minutes. sessionStorage deduplication prevents repeat alerts.' },
        ],
        diagram: [
          { label: 'React 19 UI', color: '#38BDF8', x: 5 },
          { label: 'Supabase Auth', color: '#0CFCA8', x: 27 },
          { label: 'Supabase DB', color: '#A788FA', x: 50 },
          { label: 'analytics.js', color: '#FFB347', x: 72 },
          { label: 'notifications.js', color: '#FF4B6B', x: 90 },
        ],
      },

      metrics: [
        { label: 'Auth System',           value: 'Full',  sub: 'Supabase Auth — sign-up, login, JWT sessions', color: '#38BDF8', bar: 100 },
        { label: 'Task Fields Supported', value: '8',     sub: 'text, category, priority, due, notes, recurring…', color: '#0CFCA8', bar: 80 },
        { label: 'Recurring Frequencies', value: '3',     sub: 'daily / weekly / monthly auto-creation',   color: '#A788FA', bar: 75 },
        { label: 'Analytics Metrics',     value: '5+',    sub: 'accuracy, concentration, streak, per-day, charts', color: '#38BDF8', bar: 85 },
        { label: 'Notification Dedup',    value: '100%',  sub: 'sessionStorage prevents repeat alerts',    color: '#FFB347', bar: 100 },
        { label: 'Responsive Breakpoints', value: '3',    sub: 'mobile (<640px) · tablet (<1024px) · desktop', color: '#0CFCA8', bar: 90 },
      ],

      security: [
        { badge: 'Supabase Auth',               detail: 'Full authentication and authorization via Supabase Auth. Email/password sign-up with JWT-based sessions. Tokens are managed and refreshed automatically by the Supabase client.', level: 'High' },
        { badge: 'Row Level Security (RLS)',     detail: 'Supabase RLS policies on all tables ensure each user can only read and write their own rows — enforced at the database level, not just the application layer.', level: 'High' },
        { badge: 'Notification Permission Gate', detail: 'Web Notifications API is only invoked after the user explicitly grants browser permission. No permission → no alerts. Follows the Permissions API correctly.', level: 'High' },
        { badge: 'sessionStorage Deduplication', detail: 'Notification IDs are written to sessionStorage after firing. On the next polling interval, already-notified task IDs are skipped — prevents alert spam.', level: 'Medium' },
        { badge: 'Env Variable Isolation',       detail: 'Supabase URL and anon key are stored in environment variables — never hardcoded or committed to source.', level: 'Medium' },
      ],

      techDeep: [
        { name: 'Supabase Auth & RLS',      detail: 'Supabase Auth provides sign-up/login with JWT sessions. All database tables have RLS policies: `auth.uid() = user_id`. This means even if someone gets the anon key, they can only access rows they own.' },
        { name: 'useTodos Custom Hook',     detail: 'All task state — CRUD, toggle, recurring generation — lives in one hook. On mount, fetches tasks from Supabase for the current user. On every mutation, syncs to Supabase immediately.' },
        { name: 'Recharts Analytics',       detail: 'Bar charts for daily/weekly completion volume, pie charts for priority and category distribution. All charts receive computed data from analytics.js — components only render, never compute.' },
        { name: 'Framer Motion Variants',   detail: 'Tab transitions use variants with staggerChildren so list items entrance-animate in sequence. AnimatePresence handles tab unmount animations.' },
        { name: 'date-fns for Recurring',   detail: 'addDays, addWeeks, addMonths, isBefore, isToday, format — date-fns functions replace moment.js with zero bloat. Recurring due-date calculation is a single pure function: getNextOccurrence(task) → Date.' },
      ],

      codeSnippet: {
        title: 'useTodos.js (Supabase sync)',
        code: `import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  // Load tasks for current user on mount
  useEffect(() => {
    if (!user) return;
    supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setTodos(data ?? []));
  }, [user]);

  async function addTodo(task) {
    const { data } = await supabase
      .from('tasks')
      .insert({ ...task, user_id: user.id })
      .select()
      .single();
    setTodos(prev => [data, ...prev]);
  }

  async function toggleTodo(id, completed) {
    await supabase.from('tasks').update({ completed }).eq('id', id);
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
  }

  return { todos, addTodo, toggleTodo };
}`,
      },
    },
  },

  {
    id: 3,
    title: 'Pixora',
    subtitle: 'AI-Powered Social Media Platform',
    description:
      'A full-stack Instagram-inspired social platform where users upload images and Gemini 1.5 Flash auto-generates captions. Built with React 18, Node.js, ImageKit CDN, JWT auth, and deployed across Vercel + Render + MongoDB Atlas.',
    tech: ['React 18', 'Node.js', 'Gemini AI', 'ImageKit', 'MongoDB', 'JWT'],
    color: 'lavender',
    colorHex: '#A788FA',
    highlights: [
      'Gemini 1.5 Flash generates captions from base64 image input',
      'ImageKit CDN delivers images at w-600, q-75, f-webp automatically',
      'Light/dark theme via CSS variables + ThemeContext',
    ],
    github: 'https://github.com/dev-ayush0106',
    live: 'https://pixora-frontend-eight.vercel.app/',
    featured: true,
    tag: 'AI / Full Stack',

    modal: {
      version: 'v1.0.0',
      status: 'Production · Live',
      overview: `Pixora is a full-stack social media platform inspired by Instagram, where users can sign up, upload images, and get AI-generated captions powered by Google Gemini 1.5 Flash. The frontend is a React 18 SPA with Framer Motion animations, light/dark theming via CSS variables, and Axios handling all authenticated API calls with a Bearer token interceptor. The backend is a Node.js/Express REST API connected to MongoDB Atlas, using ImageKit as the image CDN for optimized delivery.`,

      problem: `Building a social media app that feels fast and polished is hard — image uploads are slow, captions take effort, and theming is painful. Most tutorials stop at CRUD. Pixora goes further: real CDN delivery, AI-assisted content creation, and production deployment across three separate services.`,

      solution: `Images are uploaded via Multer on the backend, then pushed to ImageKit which handles CDN distribution and on-the-fly transformations (WebP conversion, resize, compression). Simultaneously, the image is sent to Gemini 1.5 Flash as a base64-encoded inline part — the model returns a caption in under 2 seconds. The frontend uses a custom PostImage component with auto-retry logic to handle CDN propagation delays gracefully.`,

      architecture: {
        layers: [
          { name: 'React 18 + Vite (Vercel)',  detail: 'SPA with React Router v7, AuthContext + ThemeContext, Axios interceptor auto-attaches Bearer token on every request' },
          { name: 'Node.js + Express (Render)', detail: 'REST API — auth routes, post CRUD, image upload endpoint. Auth middleware validates JWT + enforces ownership on edit/delete' },
          { name: 'Multer → ImageKit',          detail: 'Multer parses multipart/form-data, ImageKit SDK uploads and returns a CDN URL with transformation params baked in' },
          { name: 'Gemini 1.5 Flash',           detail: 'Image converted to base64 on server, sent as inline part to Gemini — caption returned and saved with the post document' },
          { name: 'MongoDB Atlas (M0)',          detail: 'Mongoose 9 schemas for User + Post. Posts store imageUrl (ImageKit CDN), caption, owner ref, timestamps' },
        ],
        diagram: [
          { label: 'React (Vercel)', color: '#A788FA', x: 5 },
          { label: 'Express (Render)', color: '#38BDF8', x: 28 },
          { label: 'Multer', color: '#FFB347', x: 50 },
          { label: 'ImageKit CDN', color: '#0CFCA8', x: 68 },
          { label: 'Gemini AI', color: '#FF4B6B', x: 86 },
        ],
      },

      metrics: [
        { label: 'AI Caption Speed',    value: '<2s',   sub: 'Gemini 1.5 Flash response time',       color: '#A788FA', bar: 94 },
        { label: 'Image Delivery',      value: 'CDN',   sub: 'ImageKit w-600, q-75, f-webp transform', color: '#0CFCA8', bar: 98 },
        { label: 'Theme Coverage',      value: '100%',  sub: 'light + dark via CSS variables',        color: '#38BDF8', bar: 100 },
        { label: 'Auth Coverage',       value: '100%',  sub: 'all private routes JWT-protected',      color: '#A788FA', bar: 100 },
        { label: 'CDN Retry Handling',  value: 'Auto',  sub: 'PostImage retries on propagation delay', color: '#FFB347', bar: 90 },
        { label: 'Deployment Services', value: '3',     sub: 'Vercel · Render · MongoDB Atlas',       color: '#FF4B6B', bar: 75 },
      ],

      security: [
        { badge: 'JWT Auth',              detail: 'jsonwebtoken signs tokens on login. Every protected route passes through auth middleware that verifies the Bearer token from the Authorization header.', level: 'High' },
        { badge: 'bcryptjs Hashing',      detail: 'Passwords hashed with bcryptjs before saving to MongoDB. Plain-text passwords are never stored or logged anywhere.', level: 'High' },
        { badge: 'Ownership Checks',      detail: 'Edit and delete endpoints verify req.user._id matches the post\'s owner field — users cannot modify or delete others\' posts.', level: 'High' },
        { badge: 'Single-Origin CORS',    detail: 'CORS configured with a single allowed origin from the CORS_ORIGIN environment variable. No wildcard (*) in production.', level: 'High' },
        { badge: 'Multer File Guard',     detail: 'Multer limits upload size and file type server-side — malformed or oversized uploads are rejected before reaching ImageKit.', level: 'Medium' },
        { badge: 'Env Variable Isolation', detail: 'GEMINI_API_KEY, IMAGEKIT credentials, JWT_SECRET, and MONGO_URI are all environment variables — never hardcoded or committed to source.', level: 'High' },
      ],

      techDeep: [
        { name: 'Axios Request Interceptor', detail: 'A single Axios instance is created with a request interceptor that reads the JWT from localStorage and attaches it as a Bearer token on every outgoing request — no manual header management in any component.' },
        { name: 'ImageKit Transformations',  detail: 'ImageKit URLs are constructed with tr=w-600,q-75,f-webp — every image is automatically resized to 600px width, compressed to 75% quality, and converted to WebP format. This happens at CDN level, not server level.' },
        { name: 'Gemini Base64 Input',       detail: 'Rather than sending an image URL, the image buffer from Multer is converted to base64 and sent as an inlinePart with the correct mimeType. This avoids a round-trip and works even before the ImageKit CDN propagation completes.' },
        { name: 'PostImage Auto-Retry',      detail: 'The custom PostImage component catches onError events and retries the image src after a delay — handling the window between when ImageKit returns a URL and when the CDN edge node has the file cached.' },
        { name: 'CSS Variable Theming',      detail: 'Light/dark themes are implemented via CSS custom properties toggled by ThemeContext on the :root element. No class-name switching — components just use var(--color-bg), var(--color-text) etc. and the theme updates globally.' },
      ],

      codeSnippet: {
        title: 'geminiCaption.js (server)',
        code: `import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCaption(fileBuffer, mimeType) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  // Send image as base64 inline part — no URL needed
  const imagePart = {
    inlineData: {
      data: fileBuffer.toString('base64'),
      mimeType,                 // e.g. "image/jpeg"
    },
  };

  const result = await model.generateContent([
    imagePart,
    'Write a short, engaging social media caption for this image.',
  ]);

  return result.response.text();
}`,
      },
    },
  },
]
