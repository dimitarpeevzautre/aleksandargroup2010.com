---
layout: page
title: Блог
permalink: /blog/
---

<div class="blog-page">
  <div class="post-grid">
    {% for post in site.posts %}
    <div class="post-card">
      <div class="post-date">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d.%m.%Y" }}</time>
      </div>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Прочетете повече &raquo;</a>
    </div>
    {% endfor %}
  </div>
</div>