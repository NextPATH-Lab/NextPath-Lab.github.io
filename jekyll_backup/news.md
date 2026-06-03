---
layout: default
title: News
permalink: /news/
nav-order: 3
nav-include: true
---

{% assign sorted_posts = site.posts | sort: "date" | reverse %}
{% assign posts_by_year = sorted_posts | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}

{% for year in posts_by_year %}
  <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 40px;">
    {{ year.name }}
  </h2>

  <div class="publications-list">
    {% for post in year.items %}
      <div class="pub-item" style="display: flex; gap: 20px; margin-bottom: 1.5rem;">
        
        <div style="flex: 0 0 100px; color: #666; font-style: italic; margin-top: 2px;">
          {{ post.date | date: "%b %d" }}
        </div>

        {% if post.image %}
        <div style="flex: 0 0 150px;">
          <img src="{{ post.image | relative_url }}" alt="Thumbnail" style="width: 100%; border-radius: 4px; border: 1px solid #eee; object-fit: cover;">
        </div>
        {% endif %}

        <div style="flex: 1;">
          <h3 style="margin-top: 0; margin-bottom: 5px; font-size: 1.1rem;">
            <a href="{{ post.url | relative_url }}" style="text-decoration: none;">{{ post.title }}</a>
          </h3>
          
          <div class="post-excerpt" style="color: #444; font-size: 0.95rem;">
            {{ post.excerpt | strip_html | truncatewords: 25 }}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}