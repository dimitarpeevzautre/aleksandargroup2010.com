---
layout: page
title: Проекти
permalink: /projects/
---

<div class="projects-page">
  <div class="projects-grid">
    {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
    {% for project in sorted_projects %}
    <div class="project-card">
      <a href="{{ project.url | relative_url }}">
        <div class="project-thumbnail">
          <img src="{{ project.thumbnail | relative_url }}" alt="{{ project.title }}">
        </div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.excerpt }}</p>
      </a>
    </div>
    {% endfor %}
  </div>
</div>