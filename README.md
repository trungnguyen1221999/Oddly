# Oddly — Project Documentation
> Finnish language learning through AI-generated personalized stories

---

## Problem Statement

People learning Finnish lack reading content suited to their level. Most apps focus on listening and speaking. But for a complex language like Finnish, reading first leads to better comprehension.

The problem: content that's too easy is boring. Content that's too hard is discouraging.

**Oddly solves this:** AI generates personalized stories based on a character the user creates, at the right difficulty level, automatically injecting vocabulary the user is actively learning.

---

## Target User

- People learning Finnish who want to improve reading
- Living in or planning to move to Finland
- Frustrated with manually prompting AI every session — having to re-supply character context, wishlist words, and settings each time

---

## Core Insight

Spaced repetition through story context — not flashcards. Words appear naturally in stories the user cares about, repeating until fluent. User decides when a word is mastered and removes it from the wishlist.

---

## MVP Features

### In scope
- Create a character — name, age, gender, job, personality, hobbies, location
- Choose level: A1 / A2 / B1 / B2
- Choose story genre: funny, fairytale, horror, romantic...
- AI generates a story based on the character
- Click any word → translates the full sentence + meaning of that word in context
- Add word to wishlist from the popup
- Next story automatically injects wishlist words naturally

### Out of scope (v2)
- Grammar explanation
- Puhekieli conversion
- Conjugation breakdown
- Multiple characters at once
- Story history tracking
- Reddit as content source (dropped)

---

## Data Model

```
User
  id
  name
  email
  passwordHash
  level           -- A1 | A2 | B1 | B2
  avatar
  createdAt
  updatedAt

Character
  id
  userId
  name
  age
  sex
  job
  personality
  hobbies
  location
  createdAt

Story
  id
  userId
  characterId
  content
  level
  wordCount
  genre
  createdAt

WishlistWord
  id
  userId
  word            -- Finnish word
  translation     -- English meaning
  level
  addedAt
  removedAt       -- null = still active, date = mastered & removed
```

---

## API Endpoints

```
// Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

// Character
POST   /api/characters
GET    /api/characters
GET    /api/characters/:id
PUT    /api/characters/:id

// Story
POST   /api/stories
GET    /api/stories
GET    /api/stories/:id
DELETE /api/stories/:id

// Wishlist
POST   /api/wishlist
GET    /api/wishlist
DELETE /api/wishlist/:id
```

---

## Story Generation Pipeline

```
User selects character + level + genre
  ↓
Has wishlist words?
  → Yes: inject wishlist words into prompt
  → No:  use most common words for that level (A1: 200, A2: 500, B1: 1000...)
  ↓
AI generates story
  → Matches character's personality, job, hobbies, location
  → Correct difficulty level
  → Uses wishlist words naturally in sentences
  ↓
Store story → serve to user
```

---

## Key Design Decisions

**Story mode over Reddit**
More flexible, wishlist words inject more naturally, no dependency on external API.

**Tokens not stored in DB**
JWT is stateless — verified by secret key. No need to persist tokens.

**Wishlist as separate table**
Each word has its own metadata (addedAt, removedAt). Cannot be embedded in User.

**No Character delete for MVP**
Deleting a character raises questions about linked stories. Add when real users request it.

**No StoryWord table**
MVP does not need to track which words were injected into which story.

**No GET /wishlist/:id**
Users view their full wishlist, not individual words.

**Click word → translate full sentence**
Same word can mean different things in different contexts. Translating the full sentence gives the user the correct meaning being used.

**User decides when a word is mastered**
No automatic tracking. User removes a word from wishlist when they feel confident with it.

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | Next.js + TypeScript    |
| Backend    | Node.js + Express       |
| Database   | Supabase (PostgreSQL)   |
| AI         | OpenAI API              |
| Auth       | JWT                     |
| Testing    | Vitest                  |
| Deployment | Vercel + Railway        |

---

## Next Steps — Phase 3: Setup

- [ ] Init Git repository
- [ ] Define folder structure
- [ ] TypeScript strict mode
- [ ] ESLint + Prettier
- [ ] Vitest setup
- [ ] GitHub Actions — lint + test on every push
- [ ] Deploy skeleton to Vercel
