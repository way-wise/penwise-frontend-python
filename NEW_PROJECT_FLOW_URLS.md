# New Project Flow - URL Testing Guide

Since this is a static HTML project, you can test the entire new project creation process by visiting these URLs directly in your browser.

## Base URL
```
http://127.0.0.1:8000
```

## Complete New Project Flow

### Step 1: Create New Project (Idea)
**URL:** `http://127.0.0.1:8000/new-project/`

This is the initial project configuration page where users:
- Enter project title
- Select literary genre
- Choose vocabulary type
- Set emotional tonality
- Select narration style
- Define writing style
- Provide idea description
- Add literary influences
- Set advanced criteria (target length, audience, tone, etc.)

---

### Step 2: Review Idea
**URL:** `http://127.0.0.1:8000/review-idea/`

After submitting the new project form, users review their idea:
- View the submitted project details
- Review and confirm the idea
- Proceed to story draft creation

---

### Step 3: Story Draft (Narrative Development)
**URL:** `http://127.0.0.1:8000/narrative-development/`

Users develop the full narrative:
- Create story arcs
- Develop characters
- Build plot structure
- Refine the narrative

---

### Step 4: Detailed Plan
**URL:** `http://127.0.0.1:8000/detailed-plan/`

Users create a detailed plan:
- Chapter breakdown
- Scene planning
- Character development
- Plot progression

---

### Step 5: Create Chapter
**URL:** `http://127.0.0.1:8000/chapter-view/`

Users create and edit chapters:
- Write chapter content
- Edit and refine text
- Manage chapter structure

---

## Related Dashboard Pages

### Dashboard Home
**URL:** `http://127.0.0.1:8000/dashboard/`

Main dashboard showing:
- Project overview
- Recent activity
- Quick actions

---

### Project List
**URL:** `http://127.0.0.1:8000/project-list/`

View all projects:
- List of all created projects
- Project status
- Quick actions for each project

---

### Your Plan
**URL:** `http://127.0.0.1:8000/your-plan/`

Subscription and plan management:
- Current plan details
- Available features
- Upgrade options

---

## Quick Test Flow

To test the complete flow, visit these URLs in order:

1. **Start:** `http://127.0.0.1:8000/dashboard/`
2. **Create Project:** `http://127.0.0.1:8000/new-project/`
3. **Review:** `http://127.0.0.1:8000/review-idea/`
4. **Story Draft:** `http://127.0.0.1:8000/narrative-development/`
5. **Plan:** `http://127.0.0.1:8000/detailed-plan/`
6. **Chapter:** `http://127.0.0.1:8000/chapter-view/`
7. **Projects:** `http://127.0.0.1:8000/project-list/`

---

## Notes

- All URLs use the Django URL pattern: `<str:page_name>/`
- The page name matches the template filename (without `.html`)
- Make sure your Django server is running: `python manage.py runserver`
- The sidebar navigation will highlight the active page automatically

---

## Testing Checklist

- [ ] Dashboard loads correctly
- [ ] New Project form displays all fields
- [ ] Review Idea page shows submitted data
- [ ] Narrative Development page is accessible
- [ ] Detailed Plan page loads
- [ ] Chapter View page works
- [ ] Project List shows all projects
- [ ] Sidebar navigation highlights active page
- [ ] Mobile responsive layout works on all pages
- [ ] All buttons and links are functional

