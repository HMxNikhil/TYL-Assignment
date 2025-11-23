# How to Push Your To-Do List Project to GitHub

This guide outlines the steps to push your local `To-Do_List` project to a GitHub repository and explains how to resolve common errors you might encounter.

## 📋 Prerequisites

- You have a GitHub account.
- You have created a repository on GitHub (e.g., `TYL-Assignment`).
- You have `git` installed on your computer.

---

## 🚀 Step-by-Step Guide

### 1. Initialize Git (If not already done)
*Your project is already initialized, so you can skip this step.*
If it wasn't, you would run:
```bash
git init
```

### 2. Check Your Status
See which files are changed or untracked:
```bash
git status
```

### 3. Add Your Changes
Stage all your changes for the commit:
```bash
git add .
```

### 4. Commit Your Changes
Save your changes with a descriptive message:
```bash
git commit -m "Initial commit for To-Do List App"
```

### 5. Add the Remote Repository
Link your local project to your GitHub repository.
*Replace `HMxNikhil` with your username if different.*

**Using HTTPS (Recommended if SSH is not set up):**
```bash
git remote add origin https://github.com/HMxNikhil/TYL-Assignment.git
```

**Using SSH:**
```bash
git remote add origin git@github.com:HMxNikhil/TYL-Assignment.git
```

*Note: If you already have a remote named `origin`, you might need to remove it first (`git remote remove origin`) or use a different name.*

### 6. Create/Switch to Your Branch
It is good practice to use a specific branch for each project if they are in the same repo.
```bash
git checkout -b To-Do-List
```

### 7. Push to GitHub
Push your code to the new branch on GitHub:
```bash
git push -u origin To-Do-List
```

---

## ⚠️ Common Errors & Solutions

### ❌ Error: `remote origin already exists`
**Cause:** You are trying to add a remote URL, but one is already configured.
**Solution:**
Check the current remote:
```bash
git remote -v
```
If it's wrong, remove it and add the correct one:
```bash
git remote remove origin
git remote add origin <YOUR_REPO_URL>
```

### ❌ Error: `Permission denied (publickey)`
**Cause:** You are using the SSH URL (`git@github.com...`) but your SSH keys are not configured or added to your GitHub account.
**Solution:**
Switch to using the HTTPS URL:
```bash
git remote set-url origin https://github.com/HMxNikhil/TYL-Assignment.git
```
Then try pushing again. You may be asked to log in via a browser or enter a Personal Access Token.

### ❌ Error: `failed to push some refs... Updates were rejected because the remote contains work`
**Cause:** The branch on GitHub has changes (e.g., a README or previous code) that you don't have locally.
**Solution:**
You need to pull the remote changes first.
```bash
git pull origin To-Do-List
```
If you get a "merge conflict", you will need to open the conflicted files, choose which code to keep, save them, and then run:
```bash
git add .
git commit -m "Resolved merge conflicts"
git push -u origin To-Do-List
```

### ❌ Error: `fatal: refusing to merge unrelated histories`
**Cause:** You are trying to pull from a remote repository that was created independently from your local one (common when you create a repo on GitHub with a README and then try to push an existing local project).
**Solution:**
Allow unrelated histories during the pull:
```bash
git pull origin To-Do-List --allow-unrelated-histories
```
Then resolve any conflicts as described above.

### ❌ Error: `src refspec ... does not match any`
**Cause:** You are trying to push a branch that doesn't exist locally (e.g., you are on `master` but tried `git push origin main`).
**Solution:**
Check your current branch name:
```bash
git branch
```
Push that specific branch name:
```bash
git push -u origin <YOUR_CURRENT_BRANCH_NAME>
```
