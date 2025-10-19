---
layout: page
title: Blog
permalink: /blog/
---

ゲームの感想や雑記を置く場所

<div class="two-col">
  <main class="main-col">
    <ul id="postList" class="post-list">
      {%- assign pinned = site.posts | where_exp: 'p','p.pinned == true'  | sort: 'date' | reverse -%}
      {%- assign others = site.posts | where_exp: 'p','p.pinned != true' | sort: 'date' | reverse -%}

      {%- for post in pinned -%}
        <li class="post-item pinned"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-tags="{{ post.tags | join: ',' | downcase | escape }}">
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <div class="meta">
            <span class="pin-badge">PINNED</span>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
            {%- if post.tags -%}
              <span class="tags">
                {%- for t in post.tags -%}<span class="tag-chip">{{ t }}</span>{%- endfor -%}
              </span>
            {%- endif -%}
          </div>
          {%- if post.excerpt -%}
            <p class="excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
          {%- endif -%}
        </li>
      {%- endfor -%}

      {%- for post in others -%}
        <li class="post-item"
            data-date="{{ post.date | date: '%Y-%m-%d' }}"
            data-tags="{{ post.tags | join: ',' | downcase | escape }}">
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <div class="meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
            {%- if post.tags -%}
              <span class="tags">
                {%- for t in post.tags -%}<span class="tag-chip">{{ t }}</span>{%- endfor -%}
              </span>
            {%- endif -%}
          </div>
          {%- if post.excerpt -%}
            <p class="excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
          {%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </main>

  {% include sidebar-taxonomy.html %}
</div>

