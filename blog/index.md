---
layout: page
title: Blog
permalink: /blog/
---

ゲームの感想や雑記を置く場所です。

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>— {{ post.date | date: site.minima.date_format }}</small>
      {% if post.excerpt %}<br><span>{{ post.excerpt | strip_html }}</span>{% endif %}
    </li>
  {% endfor %}
</ul>
