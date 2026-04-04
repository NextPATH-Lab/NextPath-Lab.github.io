---
layout: default
title: SPARC AI Wiki
permalink: /wiki/
nav-order: 3
nav-include: true
---


<h1>Welcome to SPARC AI Wiki!</h1>
<p style='text-align:justify;'>
SPARC, or the SPatial biology And Research in Cancer group is a series of meetings led by Dr. Katey Enfield to discuss modern literature in spatial biology for cancer research and projects within our labs to facilitate collaboration.
<br><br>
This wiki specifically posts meetings from our journal club meetings, such as skill-building workshops and sharing interesting papers with the goal of promoting an interdisciplinary skill set - supporting our biology/pathology focused peers to develop computing skills, and our computing-focused peers to develop a deeper understanding of the biology which underpins our research questions.

<br><br>
<b>IMPORTANT:</b> Please send all errata/suggestions to <code>finaba@bccrc.ca</code>
</p>
{% assign sorted_wiki = site.wiki | sort: "date" | reverse %}
{% assign wiki_by_year = sorted_wiki | group_by_exp: "item", "item.date | date: '%Y'" | sort: "name" | reverse %}

{% for year in wiki_by_year %}
  <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 40px;">
    {{ year.name }}
  </h2>

  <div class="publications-list">
    {% for item in year.items %}
      <div class="pub-item" style="display: flex; gap: 20px; margin-bottom: 1.5rem;">
        
        <div style="flex: 0 0 100px; color: #666; font-style: italic; margin-top: 2px;">
          {{ item.date | date: "%b %d" }}
        </div>

        {% if item.image %}
        <div style="flex: 0 0 150px;">
          <img src="{{ item.image | relative_url }}" alt="Thumbnail" style="width: 100%; border-radius: 4px; border: 1px solid #eee; object-fit: cover;">
        </div>
        {% endif %}

        <div style="flex: 1;">
          <h3 style="margin-top: 0; margin-bottom: 5px; font-size: 1.1rem;">
            <a href="{{ item.url | relative_url }}" style="text-decoration: none;">{{ item.title }}</a>
          </h3>
          
          <div class="post-excerpt" style="color: #444; font-size: 0.95rem;">
            {{ item.excerpt | strip_html | truncatewords: 25 }}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}