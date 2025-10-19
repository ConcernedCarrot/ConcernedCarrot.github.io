---
layout: page
title: Head
permalink: /
---

個人ブログです。主にゲームの雑記を書きます

- **Blog**: ゲームの雑記の一覧  
- **Note**: メモ 
- **About**: このサイトと運営者について

> ※記載内容は個人の感想です。

<div class="two-col">
  <main class="main-col">
    <ul id="postList" class="post-list">
      {%- for post in site.posts -%}
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
