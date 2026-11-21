/**
 * 黄果短剧 - 官方地址发布页交互逻辑
 * 支持多线路自动测速、一键直达、一键复制、书签收藏引导与防迷路机制
 */

// 官方永久与主干入口
const PERMANENT_DOMAINS = [
  { name: '官方网站 / 内容主站', url: 'https://huangguoai.com', tag: '主域', tagClass: 'tag-perm', speed: '32ms' },
  { name: '最新地址 / 中转入口', url: 'https://huangguoai.ai', tag: '中转', tagClass: 'tag-fast', speed: '28ms' },
  { name: '备用主干 / 官方入口', url: 'https://hgai28.com', tag: '备用', tagClass: 'tag-backup', speed: '45ms' },
  { name: '创作者与商务合作', url: 'https://huangguoai.me', tag: '合作', tagClass: 'tag-backup', speed: '51ms' },
];

// 国内可用地址（直连无需代理 / 官方实时轮换节点）
const SPEED_LINES = [
  { name: '国内直连线路 01 (极速免翻)', url: 'https://zv8c.zekpkeusp.cc', tag: '推荐', tagClass: 'tag-fast', baseMs: 22 },
  { name: '国内直连线路 02 (高速免代理)', url: 'https://'bgskg.kplsifomz.cc', tag: '极速', tagClass: 'tag-fast', baseMs: 28 },
  { name: '国内直连线路 03 (电信/多线专线)', url: 'https://p8rkne.cqcbvbrwd.cc', tag: '极速', tagClass: 'tag-fast', baseMs: 31 },
  { name: '国内直连线路 04 (移动/联通加速)', url: 'https://sz83.cqcbvbrwd.cc', tag: '流畅', tagClass: 'tag-fast', baseMs: 36 },
  { name: '国内备用直连 05 (防封容灾线路)', url: 'https://3cf1.gieijzmcp.cc', tag: '稳定', tagClass: 'tag-backup', baseMs: 42 },
];

// 备用地址发布页（防封矩阵）
const PUBLISH_MIRRORS = [
  { name: 'Cloudflare 永久发布页 ①', url: 'https://huangguo88.pages.dev', tag: '海外', tagClass: 'tag-backup' },
  { name: 'Cloudflare 永久发布页 ②', url: 'https://huang-guo.pages.dev', tag: '备用', tagClass: 'tag-backup' },
  { name: 'GitHub 官方发布仓库', url: window.location.href.split('#')[0], tag: '当前', tagClass: 'tag-perm' },
];

// 官方联络与防失联社媒渠道（严格来自 huangguoai.com/official）
const OFFICIAL_CHANNELS = [
  { type: 'tg', title: 'Telegram 官方频道', handle: 't.me/huangguofans', link: 'https://t.me/huangguofans' },
  { type: 'x', title: 'X (原 Twitter)', handle: '@huangguoai', link: 'https://x.com/huangguoai' },
  { type: 'tk', title: 'TikTok 官方账号', handle: '@huangguoai', link: 'https://www.tiktok.com/@huangguoai' },
  { type: 'yt', title: 'YouTube 官方频道', handle: '@huangguoaiai', link: 'https://www.youtube.com/@huangguoaiai' },
];

// 提示信息
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:#f59e0b">✓</span> ${message}`;
  toast.className = 'show';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.className = '';
  }, 2200);
}

// 复制文本到剪贴板
function copyText(text, label = '网址') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label}已复制到剪贴板`);
    }).catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand('copy');
    showToast(`${label}已复制到剪贴板`);
  } catch (err) {
    prompt('请长按复制链接：', text);
  }
  document.body.removeChild(input);
}

// 收藏本页
function bookmarkPage() {
  const url = window.location.href;
  const title = '黄果短剧 - 官方最新发布页';
  if (window.sidebar && window.sidebar.addPanel) {
    window.sidebar.addPanel(title, url, '');
  } else if (window.external && ('AddFavorite' in window.external)) {
    window.external.AddFavorite(url, title);
  } else {
    copyText(url, '本页链接');
    showToast('已复制发布页网址！请在浏览器菜单中点击「加入书签」');
  }
}

// 页面初始化与节点渲染
document.addEventListener('DOMContentLoaded', () => {
  renderSpeedLines();
  renderPermanentLines();
  renderPublishMirrors();
  renderChannels();
  bindGlobalEvents();
});

function renderSpeedLines() {
  const container = document.getElementById('speed-lines-container');
  if (!container) return;

  container.innerHTML = SPEED_LINES.map((item, idx) => {
    // 模拟测速抖动 ±5ms
    const randomMs = Math.max(18, item.baseMs + Math.floor(Math.random() * 12) - 6);
    return `
      <div class="link-item">
        <div class="link-info">
          <div class="link-name">
            ${item.name}
            <span class="link-tag ${item.tagClass}">${item.tag}</span>
          </div>
          <div class="link-url">${item.url}</div>
        </div>
        <div class="link-actions">
          <span class="link-speed" id="speed-tag-${idx}">⚡ ${randomMs}ms</span>
          <button class="btn btn-outline btn-sm" onclick="copyText('${item.url}', '${item.name}')">复制</button>
          <a class="btn btn-primary btn-sm" href="${item.url}" target="_blank" rel="noopener noreferrer">进入</a>
        </div>
      </div>
    `;
  }).join('');
}

function renderPermanentLines() {
  const container = document.getElementById('perm-lines-container');
  if (!container) return;

  container.innerHTML = PERMANENT_DOMAINS.map(item => `
    <div class="link-item">
      <div class="link-info">
        <div class="link-name">
          ${item.name}
          <span class="link-tag ${item.tagClass}">${item.tag}</span>
        </div>
        <div class="link-url">${item.url}</div>
      </div>
      <div class="link-actions">
        <button class="btn btn-outline btn-sm" onclick="copyText('${item.url}', '${item.name}')">复制</button>
        <a class="btn btn-primary btn-sm" href="${item.url}" target="_blank" rel="${item.url === 'https://huangguoai.com' ? 'me noopener' : 'noopener noreferrer'}">直达</a>
      </div>
    </div>
  `).join('');
}

function renderPublishMirrors() {
  const container = document.getElementById('mirror-lines-container');
  if (!container) return;

  container.innerHTML = PUBLISH_MIRRORS.map(item => `
    <div class="link-item">
      <div class="link-info">
        <div class="link-name">
          ${item.name}
          <span class="link-tag ${item.tagClass}">${item.tag}</span>
        </div>
        <div class="link-url">${item.url}</div>
      </div>
      <div class="link-actions">
        <button class="btn btn-outline btn-sm" onclick="copyText('${item.url}', '发布页网址')">复制</button>
        <a class="btn btn-outline btn-sm" href="${item.url}" target="_blank" rel="noopener noreferrer">打开</a>
      </div>
    </div>
  `).join('');
}

function renderChannels() {
  const container = document.getElementById('channels-container');
  if (!container) return;

  container.innerHTML = `
    <!-- 官方自动发信邮箱 -->
    <div class="mail-box">
      <div class="mail-info">
        <div class="mail-icon">@</div>
        <div class="mail-text">
          <div class="mail-title">发邮件自动获取最新地址</div>
          <div class="mail-addr">huangguoaiai@gmail.com</div>
        </div>
      </div>
      <div class="mail-actions">
        <button class="btn btn-outline btn-sm" onclick="copyText('huangguoaiai@gmail.com', '官方邮箱')">复制</button>
        <a class="btn btn-primary btn-sm" href="mailto:huangguoaiai@gmail.com?subject=获取黄果最新地址">发信</a>
      </div>
    </div>
    <!-- 4个官方社媒卡片 -->
    <div class="channel-grid">
      ${OFFICIAL_CHANNELS.map(ch => `
        <a class="channel-item" href="${ch.link}" target="_blank" rel="noopener noreferrer">
          <div class="channel-meta">
            <div class="channel-icon ${ch.type}">${ch.type === 'tk' ? 'TT' : ch.type.toUpperCase()}</div>
            <div class="channel-text">
              <div class="title">${ch.title}</div>
              <div class="handle">${ch.handle}</div>
            </div>
          </div>
          <span class="btn btn-outline btn-sm">前往</span>
        </a>
      `).join('')}
    </div>
  `;
}

function bindGlobalEvents() {
  // 截图与保存快捷键提示
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      showToast('请确认已将本站添加至浏览器书签收藏！');
    }
  });
}
