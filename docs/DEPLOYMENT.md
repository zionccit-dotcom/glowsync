# Deploying GlowSync to Vercel

Since GlowSync is a Next.js application, Vercel is the natural place to deploy it for the best performance and ease of use.

## Prerequisites
- A GitHub, GitLab, or Bitbucket account.
- A [Vercel Account](https://vercel.com/signup).

## Option 1: The "Zero Config" Way (Recommended)

1.  **Push your code to GitHub:**
    - I have already initialized git for you. You just need to create a repository on GitHub.
    - Run these commands in your terminal (I can help checking if you have the gh/git setup):
      ```bash
      git add .
      git commit -m "Initial commit of GlowSync"
      # Create a new repo on GitHub (manual step on github.com)
      git remote add origin https://github.com/YOUR_USERNAME/glowsync.git
      git push -u origin main
      ```

2.  **Import to Vercel:**
    - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Select your `glowsync` repository.
    - Click **"Deploy"**.

Vercel will automatically detect that it's a Next.js app and configure the build settings (`npm run build`).

## Option 2: Using the CLI (Directly from Terminal)

If you have the `vercel` CLI installed, you can deploy right from here without GitHub.

1.  **Install CLI (if not installed):**
    ```bash
    npm i -g vercel
    ```

2.  **Login:**
    ```bash
    vercel login
    ```

3.  **Deploy:**
    ```bash
    vercel
    ```
    - Follow the prompts (Keep default settings: Yes to all).

## Post-Deployment (Supabase Integration)

Once we build the Supabase backend (Step 3):
1.  Go to your Vercel Project Settings -> **Environment Variables**.
2.  Add your Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.).
3.  Redeploy.
