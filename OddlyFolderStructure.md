# Oddly — Folder Structure & Responsibilities

---

## Frontend

### `assets/`
Stores all static files: logo, images, icons, fonts.
No logic — files only.

---

### `components/`
Reusable UI pieces, organized by feature.

| Folder | Purpose | Examples |
|---|---|---|
| `ui/` | Generic components not tied to any feature | Button, Input, Modal, Spinner |
| `story/` | Components related to stories only | StoryCard, StoryReader, WordPopup |
| `character/` | Components related to characters | CharacterForm, CharacterCard |
| `wishlist/` | Components related to wishlist | WishlistPopup, WordCard |

**Rule:** Components only render UI. No API calls, no business logic.

---

### `pages/`
One file = one route. Pages do not contain complex logic — they combine components and call hooks.

| File | Route |
|---|---|
| `Home.tsx` | `/` |
| `Login.tsx` | `/login` |
| `Register.tsx` | `/register` |
| `Dashboard.tsx` | `/dashboard` |
| `StoryReader.tsx` | `/story/:id` |
| `Wishlist.tsx` | `/wishlist` |
| `CreateCharacter.tsx` | `/character/create` |

---

### `hooks/`
Custom React hooks — reusable logic shared between components.

| File | Responsibility |
|---|---|
| `useAuth.ts` | Login, logout, check auth state |
| `useStory.ts` | Fetch story, generate new story |
| `useWishlist.ts` | Add word, remove word, get list |

---

### `services/`
All API calls to the backend live here. Components never call the API directly — always through a service.

**Why:** If the backend URL changes, you fix it in one place only.

| File | Responsibility |
|---|---|
| `authService.ts` | register, login, logout API calls |
| `storyService.ts` | generate story, fetch story |
| `characterService.ts` | create, get, update character |
| `wishlistService.ts` | add word, remove word, get wishlist |

---

### `store/`
Global state shared across multiple components via React Context.

| File | What it holds |
|---|---|
| `authStore.ts` | Current logged-in user, auth status |
| `storyStore.ts` | Current story being read |
| `wishlistStore.ts` | User's active wishlist words |

---

### `types/`
TypeScript type definitions. Defined once, used everywhere. Never define types inline in individual files.

| File | Types inside |
|---|---|
| `user.ts` | User, RegisterInput, LoginInput |
| `story.ts` | Story, GenerateStoryInput |
| `character.ts` | Character, CreateCharacterInput |
| `wishlist.ts` | WishlistWord, AddWordInput |

---

### `utils/`
Pure helper functions with no React dependency.

| File | Responsibility |
|---|---|
| `formatDate.ts` | Format timestamps into readable strings |
| `tokenHelper.ts` | Get / set / remove JWT from localStorage |

---

### `config/api.ts`
Backend base URL and API configuration. One place to change when deploying.

```ts
export const API_BASE_URL = import.meta.env.VITE_API_URL
```

---

---

## Backend

### `routes/`
Defines HTTP endpoints. No logic — only maps URLs to the correct controller.

```ts
// authRoutes.ts
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
```

---

### `controllers/`
Receives the request, calls the service, returns the response.
No business logic — bridge between HTTP and service layer only.

```ts
// authController.ts
async register(req: Request, res: Response) {
  const user = await authService.register(req.body)
  res.status(201).json(user)
}
```

---

### `services/`
All business logic lives here. The most important layer.

| File | Responsibility |
|---|---|
| `authService.ts` | Validate input, hash password, generate JWT |
| `characterService.ts` | Character creation and update logic |
| `storyService.ts` | Build AI prompt, process response, store story |
| `wishlistService.ts` | Add/remove words, fetch active words |
| `aiService.ts` | OpenAI API calls only — isolated so switching AI providers only requires changing this file |

---

### `repositories/`
All database queries live here. Services never query the DB directly — always through a repository.

**Why:** If you switch from Supabase to another DB, you only change this layer.

```ts
// userRepository.ts
async findByEmail(email: string) {
  return await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single()
}
```

---

### `models/`
TypeScript types and interfaces for DB entities. Mirrors the data model.

| File | Types inside |
|---|---|
| `user.ts` | User |
| `character.ts` | Character |
| `story.ts` | Story |
| `wishlistWord.ts` | WishlistWord |

---

### `middleware/`
Functions that run before a request reaches the controller.

| File | Responsibility |
|---|---|
| `authMiddleware.ts` | Verify JWT, attach user to request object |
| `errorMiddleware.ts` | Catch all errors, return consistent error response format |

---

### `utils/`
Pure helper functions with no Express dependency.

| File | Responsibility |
|---|---|
| `jwt.ts` | Sign and verify JWT tokens |
| `hash.ts` | Hash and compare passwords using bcrypt |

---

### `config/env.ts`
Validates all required environment variables at server startup.
If `JWT_SECRET` is missing — crash immediately with a clear error message.
Never crash silently 30 minutes later when a user tries to log in.

```ts
if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET — check your .env file')
}
```

---

### `config/supabase.ts`
Initializes the Supabase client once. Import from here — never re-initialize in individual files.

---

### `app.ts`
Sets up Express: registers middleware, routes, and error handler.
Does NOT start the server.

---

### `server.ts`
Imports `app` and listens on a port. Nothing else.

**Why separate from app.ts:** Tests can import `app` without actually starting a server.

---

---

## Root

### `.gitignore`
Ensures `.env`, `node_modules`, and `dist` are never committed to Git.

### `README.md`
Project documentation. The first thing an interviewer reads when they open your GitHub.

---

## Dependency Flow

```
// Frontend
Pages  →  Hooks  →  Services  →  Backend API

// Backend
Routes  →  Controllers  →  Services  →  Repositories  →  Database
```

Each layer only knows about the layer directly below it.
No layer skips levels. No layer imports upward.

---

## The Golden Rules

1. **Routes** — no logic, map URLs only
2. **Controllers** — no logic, bridge HTTP to service
3. **Services** — all business logic lives here
4. **Repositories** — all DB queries live here, nothing else
5. **Components** — render UI only, call hooks
6. **Hooks** — call services, manage local state
7. **Services (frontend)** — API calls only, no UI logic