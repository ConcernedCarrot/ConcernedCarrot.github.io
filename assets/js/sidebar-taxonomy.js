// assets/js/sidebar-taxonomy.js
document.addEventListener('DOMContentLoaded', function () {
  // 投稿一覧（必須）
  var list = document.getElementById('postList');
  if (!list) return;

  // サイドバー
  var monthsBox = document.getElementById('sb-months');
  var tagsBox   = document.getElementById('sb-tags');

  // 既存のLIを取得
  var all = Array.prototype.slice.call(list.querySelectorAll('.post-item'));
  if (!all.length) return;

  var pinnedEls = all.filter(function (li) { return li.classList.contains('pinned'); });
  var otherEls  = all.filter(function (li) { return !li.classList.contains('pinned'); });

  // 並べ替え & フィルタ
  function sortDesc(arr) {
    return arr.slice().sort(function (a, b) {
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    });
  }
  function filter(arr, ymKey, tag) {
    var ymk = (ymKey || '').trim();
    var tg  = (tag   || '').trim().toLowerCase();
    return arr.filter(function (li) {
      var okYM  = !ymk || (li.dataset.date || '').slice(0, 7) === ymk;
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
  }

  // 状態とイベント
  var state = { ymKey: '', tag: '' };

  // 月別クリック
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

  // タグクリック
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

  // 初期描画（ピン→その他の新着順）
  render(state);
});

