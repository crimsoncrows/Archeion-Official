# Archeion — How to Contribute (Beginner Guide)
> Hi! This guide will walk you through everything step by step. You don't need to know Git — just follow along. When in doubt, message the group chat.

---

## 🔧 One-Time Setup (do this once)

### 1. Install Git
Go to https://git-scm.com/downloads and download Git for your OS. Just click Next on everything during installation.

### 2. Install VS Code
Go to https://code.visualstudio.com/ and download VS Code.

### 3. Open VS Code and set up your name
Press **Ctrl + `** (the key beside 1) to open the terminal at the bottom of VS Code. Then type these one at a time and press Enter:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```
Use your real name and the email you used to sign up on GitHub.

### 4. Download the project
In the same terminal, type:
```bash
git clone https://github.com/crimsoncrows/Archeion-Official.git
```
This will download the project folder onto your computer.

### 5. Open the project folder
In VS Code: click **File → Open Folder** → find and select the **Archeion-Official** folder.

### 6. Switch to the right branch
In the terminal type:
```bash
git checkout uiUpdate2
```

### 7. Create your own branch
Think of a branch as your own personal workspace. Name it after what you're working on:
```bash
git checkout -b ui/your-name-task
```
Example:
```bash
git checkout -b ui/anjela-navbar
git checkout -b ui/juliana-dashboard
```
You'll see your branch name appear in the **bottom-left corner** of VS Code.

---

## ✏️ Every Time You Work

### Step 1 — Get the latest version first
Before editing anything, always run this so you have the latest files:
```bash
git fetch origin
git merge origin/uiUpdate2
```

### Step 2 — Edit your files
Make your changes in VS Code normally — open the HTML/CSS files and edit away.

### Step 3 — Save your changes to GitHub
Once you're done editing, run these three commands:
```bash
git add .
git commit -m "what you changed"
git push -u origin ui/your-branch-name
```
Replace `ui/your-branch-name` with your actual branch name (e.g. `ui/anjela-navbar`).

After the first time, future pushes only need:
```bash
git push
```

---

## 🔁 Open a Pull Request (so I can review)
After pushing, go to **github.com/crimsoncrows/Archeion-Official** in your browser.

You'll see a yellow banner that says **"Compare & pull request"** — click it.
1. Make sure the base branch is set to `uiUpdate2`
2. Write a short description of what you changed
3. Click **"Create pull request"**

I will check it and merge it in. You'll get a notification when it's done.

---

## 🔄 After Your PR Gets Merged
Sync your branch so you have the latest:
```bash
git fetch origin
git merge origin/uiUpdate2
```
Do this every time you start a new work session.

---

## ❌ Things NOT to Do
- Don't push directly to `uiUpdate2` or `main`
- Don't write vague commit messages like "update" or "fixed stuff"
- Don't edit files outside your assigned task

---

## 🆘 Something went wrong?
Message the group chat. Don't try to fix it yourself — you might overwrite someone else's work.
