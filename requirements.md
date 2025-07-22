# Studio Sites - Profile Template Platform Requirements

## Project Overview
A React/Vite application deployed to Netlify that enables Solana wallet users to create customizable profile websites on subdomains with optional custom domain mapping.

## Current Tech Stack
- **Frontend**: React 19, Vite, TypeScript
- **UI Components**: shadcn/ui (New York style), Tailwind CSS 4.x
- **Solana Integration**: @jup-ag/api, helius-sdk, shadcn-solana components
- **Database**: Supabase PostgreSQL
- **Deployment**: Netlify
- **Authentication**: Solana wallet (no Supabase Auth)

## Core Features

### 1. User Authentication & Management
- **Wallet Connection**: Users authenticate using Solana wallets
- **User Creation**: Custom user records created from wallet public key
- **Session Management**: Maintain user sessions tied to wallet signatures
- **Profile Ownership**: Each wallet can own one primary profile

### 2. Profile Template System
- **Template Selection**: Multiple pre-built profile templates
- **Customization Engine**: 
  - Color schemes and branding
  - Content sections (bio, links, portfolio, etc.)
  - Layout arrangements
  - Media uploads (avatar, background, gallery)
- **Real-time Preview**: Live preview during customization
- **Save/Publish**: Instant deployment to subdomain

### 3. Subdomain Management
- **Dynamic Subdomains**: `{username}.studiosite.com` format
- **Username Reservation**: First-come, first-served username claiming
- **DNS Integration**: Wildcard DNS setup for automatic subdomain routing
- **SSL Certificates**: Automatic SSL for all subdomains

### 4. Custom Domain Support
- **Domain Mapping**: Users can map custom domains to their profiles
- **DNS Instructions**: Clear setup guide for users
- **SSL Management**: Automatic SSL certificate provisioning
- **Domain Verification**: Ownership verification process

### 5. Content Management
- **Rich Text Editor**: For bio and content sections
- **Media Library**: Image/video upload and management
- **Social Links**: Integration with major platforms
- **Portfolio Showcase**: Project/work gallery
- **Contact Forms**: Built-in contact functionality

## Technical Architecture

### Frontend Structure
```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── wallet/             # Solana wallet components
│   ├── templates/          # Profile template components
│   ├── editor/             # Template customization tools
│   └── shared/             # Common components
├── pages/
│   ├── dashboard/          # User dashboard
│   ├── editor/             # Template editor
│   └── profile/            # Public profile views
├── lib/
│   ├── supabase.ts         # Database client
│   ├── wallet.ts           # Solana wallet utilities
│   └── utils.ts            # General utilities
└── hooks/
    ├── useWallet.ts        # Wallet connection hook
    ├── useProfile.ts       # Profile management
    └── useTemplate.ts      # Template operations
```

### Database Schema (Supabase)

#### Users Table
```sql
users (
  id: uuid (primary key)
  wallet_address: text (unique, not null)
  username: text (unique)
  email: text
  created_at: timestamptz
  updated_at: timestamptz
)
```

#### Profiles Table
```sql
profiles (
  id: uuid (primary key)
  user_id: uuid (foreign key -> users.id)
  username: text (unique, not null) -- for jupiter-sites.ndao.computer/{username}
  contract_address: text -- solana token contract
  is_published: boolean (default false)
  metadata: jsonb (token data, custom overrides, social links)
  created_at: timestamptz
  updated_at: timestamptz
)
```

#### Templates Table
```sql
templates (
  id: text (primary key)
  name: text (not null)
  description: text
  preview_image: text
  config_schema: jsonb (defines customizable fields)
  default_config: jsonb (default values)
  is_active: boolean (default true)
  created_at: timestamptz
)
```


### Deployment Architecture

#### Main Application (Primary Domain)
- Dashboard and editor interface
- User authentication and profile management
- Template customization tools

#### Profile Rendering (Subdomains)
- **Option A**: Single app with dynamic routing based on subdomain
- **Option B**: Build-time generation of static sites per profile
- **Recommended**: Hybrid approach - dynamic rendering with static caching

#### Netlify Configuration
- Wildcard subdomain support
- Branch deploys for staging
- Environment variables for Supabase
- Build hooks for profile updates

## User Stories

### Primary User Journey
1. **Discovery**: User visits main site and sees template examples
2. **Connection**: User connects Solana wallet
3. **Registration**: System creates user account from wallet address  
4. **Template Selection**: User browses and selects a template
5. **Customization**: User customizes template with content and styling
6. **Username Claim**: User claims available subdomain username
7. **Publish**: Profile goes live at `{username}.studiosite.com`
8. **Custom Domain** (Optional): User maps custom domain

### Admin User Stories
- View platform analytics (total users, profiles, domains)
- Manage template library
- Handle domain verification and SSL issues
- Monitor system performance

## Technical Implementation Plan

### Phase 1: Core Infrastructure
- [ ] Supabase database setup and schema creation (direct deploy, no migrations)
- [ ] Solana wallet integration using shadcn-solana defaults
- [ ] Local token storage session management across browser sessions
- [ ] Single basic Twitter-like profile template (minimal customization)

### Phase 2: Template System
- [ ] Single Solana token project profile template (Twitter-like layout)
- [ ] Contract address input field and validation
- [ ] Integrate Helius SDK for on-chain token data (similar to Kirby project)
- [ ] Fetch off-chain metadata from token URI/IPFS
- [ ] Display derived fields: name, symbol, supply, description, social links
- [ ] Basic text field overrides for custom descriptions/links
- [ ] Simple save functionality (JSON storage in profiles.metadata)

### Phase 3: Profile URLs & Deployment  
- [ ] Deploy to jupiter-sites.ndao.computer domain
- [ ] Implement path-based routing (jupiter-sites.ndao.computer/{username})
- [ ] Username claiming system (alphanumeric + hyphens, uniqueness check)
- [ ] Dynamic profile rendering via React Router
- [ ] Netlify Functions for CORS-restricted API calls (Helius, token metadata)

### Phase 4: Social Integration & SEO
- [ ] Social links for X.com (Twitter), Discord, and Telegram
- [ ] Basic meta tags for social sharing previews
- [ ] Open Graph tags for profile sharing

