---
layout: default
title: News
permalink: /news/
nav-order: 3
nav-include: true
---

<h1>{{ page.title }}</h1>

<ul>
  {% for post in site.posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a></li>
  {% endfor %}
</ul>

<!-- Pagination -->
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}">Previous</a>
  {% endif %}
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}">Next</a>
  {% endif %}
</div>
