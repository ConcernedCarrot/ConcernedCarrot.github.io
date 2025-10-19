// assets/js/sidebar-taxonomy.js
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('postList');
  if (!list) return;

  var monthsBox = document.getElementById('sb-months');
  var tagsBox   = document.getElementById('sb-tags');

  var all = Array.prototype.slice.call(list.querySelectorAll('.post-item'));
  if (!all.length) return;

  var pinnedEls = all.filter(function (li) { return li.classList.contains('pinned'); });
  var otherEls  = all.filter(function (li) { return !li.classList.contains('pinned'); });

  function sortDesc(arr) {
    return arr.slice().sort(function (a, b) {
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    });
  }
  function filter(arr, ymKey, tag) {
    var ymk = (ymKey || '').trim();
    var tg  = (tag   || '').trim().toLowerCase();
    return arr.filter(function (li) {
      var d = (li.dataset.date || '');
      // 年が 1000 未満のものは除外（不正日付対策）
      var year = parseInt(d.slice(0,4), 10);
      if (!isFinite(year) || year < 1000) return false;

      var okYM  = !ymk || d.slice(0, 7) === ymk;
      var okTag = !tg  || (li.dataset.tags || '').split(',').includes(tg);
      return okYM && okTag;
    });
  }
  function render(state) {
    var pf = filter(pinnedEls, state.ymKey, state.tag);
    var of = filter(otherEls,  state.ymKey, state.tag);
    var ordered = sortDesc(pf).concat(sortDesc(of)); // 常に「ピン → その他」
    list.innerHTML = '';
    ordered.forEach(function (li) { list.appendChild(li); });
    recalcSidebarCounts(); // 並べ替え後にカウントも同期
  }

  // ---- DOMから月/タグの件数を再計算して上書き ----
  function recalcSidebarCounts() {
    // 月別
    if (monthsBox) {
      // YM -> 件数
      var counts = {};
      all.forEach(function (li) {
        var d = (li.dataset.date || '');
        var y = parseInt(d.slice(0,4), 10);
        if (!isFinite(y) || y < 1000) return; // 不正日付を除外
        var ym = d.slice(0,7);
        counts[ym] = (counts[ym] || 0) + 1;
      });

      monthsBox.querySelectorAll('.sb-count').forEach(function (span) {
        var ym = span.getAttribute('data-ym');
        var c = counts[ym] || 0;
        span.textContent = c;
        // 0件の月はボタンごと非表示
        var btn = span.closest('li');
        if (btn) btn.style.display = (c === 0 ? 'none' : '');
      });
    }

    // タグ
    if (tagsBox) {
      // tag -> 件数
      var tcount = {};
      all.forEach(function (li) {
        var d = (li.dataset.date || '');
        var y = parseInt(d.slice(0,4), 10);
        if (!isFinite(y) || y < 1000) return; // 不正日付対策
        (li.dataset.tags || '').split(',').filter(Boolean).forEach(function (t) {
          tcount[t] = (tcount[t] || 0) + 1;
        });
      });
      tagsBox.querySelectorAll('[data-tag]').forEach(function (btn) {
        var name = (btn.getAttribute('data-tag') || '').toLowerCase();
        var chip = btn.querySelector('.sb-count');
        if (chip) chip.textContent = tcount[name] || 0;
      });
    }
  }
  // ------------------------------------------------------------

  var state = { ymKey: '', tag: '' };

  if (monthsBox) {
    monthsBox.addEventListener('click', function (e) {
      var btn = e.target.closest('.sb-link');
      if (!btn || !('ym' in btn.dataset)) return;
      state.ymKey = btn.dataset.ym || '';
      monthsBox.querySelectorAll('.sb-link').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(state);
    });
  }
  if (tagsBox) {
    tagsBox.addEventListener('click', function (e) {
      var btn = e.target.closest('.sb-link');
      if (!btn || !('tag' in btn.dataset)) return;
      state.tag = (btn.dataset.tag || '').toLowerCase();
      tagsBox.querySelectorAll('.sb-link').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(state);
    });
  }

  // 初期描画：DOMに合わせて件数をセットしておく
  recalcSidebarCounts();
  render(state);
});


