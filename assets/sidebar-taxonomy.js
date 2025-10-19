// assets/js/sidebar-taxonomy.js
(function(){
  // #postListが存在しないページでは何もしない
  var list = document.getElementById('postList');
  if (!list) return;

  // 既存のLIを取得（ピン留めとその他を分離）
  var all = Array.prototype.slice.call(list.querySelectorAll('.post-item'));
  var pinnedEls = all.filter(function(li){ return li.classList.contains('pinned'); });
  var otherEls  = all.filter(function(li){ return !li.classList.contains('pinned'); });

  // ==== 集計（月） ====
  var monthMap = new Map();
  all.forEach(function(li){
    var d = li.dataset.date || '';               // YYYY-MM-DD
    var ym = d.slice(0,7);                       // YYYY-MM
    if (!ym) return;
    var label = d.slice(0,4) + '年' + d.slice(5,7) + '月';
    var o = monthMap.get(ym) || {count:0, label: label};
    o.count += 1;
    monthMap.set(ym, o);
  });
  var months = Array.from(monthMap.entries()).sort(function(a,b){
    // キー(YYYY-MM)の降順＝新しい月が先
    return b[0].localeCompare(a[0]);
  });

  // ==== 集計（タグ：件数降順→名前昇順） ====
  var tagMap = new Map();
  all.forEach(function(li){
    (li.dataset.tags || '').split(',').filter(Boolean).forEach(function(t){
      var c = tagMap.get(t) || 0;
      tagMap.set(t, c + 1);
    });
  });
  var tags = Array.from(tagMap.entries()).sort(function(a,b){
    return (b[1]-a[1]) || a[0].localeCompare(b[0], 'ja');
  });

  // ==== DOMへ描画 ====
  var ulMonths = document.getElementById('sb-months');
  var ulTags   = document.getElementById('sb-tags');
  if (ulMonths) {
    months.forEach(function(entry){
      var key = entry[0], info = entry[1];
      var li = document.createElement('li');
      li.innerHTML = '<button class="sb-link" data-ym="'+ key +'">'+ info.label +' <span class="sb-count">'+ info.count +'</span></button>';
      ulMonths.appendChild(li);
    });
    var liAllM = document.createElement('li');
    liAllM.innerHTML = '<button class="sb-link sb-all" data-ym="">すべて</button>';
    ulMonths.appendChild(liAllM);
  }
  if (ulTags) {
    tags.forEach(function(entry){
      var name = entry[0], count = entry[1];
      var li = document.createElement('li');
      li.innerHTML = '<button class="sb-link" data-tag="'+ name +'">'+ name +' <span class="sb-count">'+ count +'</span></button>';
      ulTags.appendChild(li);
    });
    var liAllT = document.createElement('li');
    liAllT.innerHTML = '<button class="sb-link sb-all" data-tag="">すべて</button>';
    ulTags.appendChild(liAllT);
  }

  // ==== 並べ替え・絞り込み（ピン→その他を常に維持） ====
  function sortDesc(arr){ return arr.slice().sort(function(a,b){ return b.dataset.date.localeCompare(a.dataset.date); }); }
  function filter(arr, ymKey, tag){
    var ymk = (ymKey || '').trim();
    var tg  = (tag   || '').trim().toLowerCase();
    return arr.filter(function(li){
      var okYM  = !ymk || (li.dataset.date || '').startsWith(ymk);
      var okTag = !tg  || (li.dataset.tags || '').split(',').includes(tg);
      return okYM && okTag;
    });
  }
  function render(state){
    // 常に「ピン留め → その他」の順に出す
    var pf = filter(pinnedEls, state.ymKey, state.tag);
    var of = filter(otherEls,  state.ymKey, state.tag);
    var ordered = sortDesc(pf).concat( sortDesc(of) );
    list.innerHTML = '';
    ordered.forEach(function(li){ list.appendChild(li); });
  }

  var state = { ymKey:'', tag:'' };
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.sb-link');
    if (!btn) return;

    if (btn.dataset.ym !== undefined) {
      state.ymKey = btn.dataset.ym || '';
      if (ulMonths) ulMonths.querySelectorAll('.sb-link').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    }
    if (btn.dataset.tag !== undefined) {
      state.tag = (btn.dataset.tag || '').toLowerCase();
      if (ulTags) ulTags.querySelectorAll('.sb-link').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    }
    render(state);
  });

  // 初期表示（ピン→その他の新着順のまま）
  render(state);
})();
