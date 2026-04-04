---
layout: default
title: Research
permalink: /research/
nav-order: 6
nav-include: true
---

<img src = "/assets/nextpath-logo.png" width = "100%" />

# Scope of Research
<p style = "text-align: justify;">
NextPath Lab advances next-generation pathomics by combining cancer biology, digital pathology, and spatial data science. We develop computational methods that transform cell- and tissue-level imaging into quantitative biomarkers, enabling earlier detection of aggressive lesions and deeper understanding of tumor micro-environments. Our work spans machine learning, graph-based modeling, and high-dimensional spatial biology, with a focus on building interpretable tools that bridge histopathology and molecular phenotype. Through collaborative, data-driven research, we aim to push the boundaries of precision oncology and create scalable technologies that improve patient prognostication and clinical decision-making.<br><br>

Specific scopes and interests are listed below:
</p>


<!-- 1. Group by year & sort groups descending (newest year first) -->
{% assign grouped_pubs = site.data.research_scopes | group_by: "type" | sort: "name" | reverse %}

{% for group in grouped_pubs %}
  <!-- Year Header -->
  <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 40px;">
    {{ group.name }}
  </h2>

  <!-- List of papers for this year -->
  <div class="publications-list">
    {% for pub in group.items %}
      <div class="pub-item" style="display: flex; gap: 20px; margin-bottom: 2rem;">
        
        <!-- Optional Image Column -->
        {% if pub.image %}
        <div style="flex: 0 0 150px;">
          <img src="{{ pub.image | relative_url }}" alt="Teaser" style="width: 100%; border-radius: 4px; border: 1px solid #eee;">
        </div>
        {% endif %}

        <!-- Content Column -->
        <div style="flex: 1;">
          <h3 style="margin-top: 0; margin-bottom: 5px;">
            <a href="{{ pub.pdf }}" style="text-decoration: none;">{{ pub.title }}</a>
          </h3>
          
          <div class="pub-authors" style="color: #666; font-size: 0.95rem;">
            By: {{ pub.authors | markdownify | remove: '<p>' | remove: '</p>' }}
          </div>

          <div class="pub-venue" style="font-style: italic; color: #444;">
            {{ pub.venue }}
          </div>

          <div class="pub-links" style="margin-top: 8px;">
            {% if pub.pdf %}    <a href="{{ pub.pdf }}" class="btn-sm">PDF</a> {% endif %}
            {% if pub.code %}   <a href="{{ pub.code }}" class="btn-sm">Code</a> {% endif %}
            {% if pub.project %}<a href="{{ pub.project }}" class="btn-sm">Project</a> {% endif %}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}

<style>
.btn-sm {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #555;
  text-decoration: none;
}
.btn-sm:hover {
  background-color: #f5f5f5;
  text-decoration: none;
}
</style>


Otherwise not much to say here at the moment but will be updated soon!  
For now, please refer to the BC Cancer lab websites.