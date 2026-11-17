# 黄果短剧 - 官方最新地址发布页 (GitHub Pages 部署包)

本项目是专为 **黄果短剧** 定制的官方地址发布导航页，参考自高可用发布页结构（如 `fqaidj01.github.io/fqaidj/`），结合官方声明页（`https://huangguoai.com/official/`）的真实域名与防骗安全指南。

---

## 📁 项目文件结构

```text
huangguo-publish-page/
├── index.html        # 发布页主结构入口
├── publish.css       # 响应式移动端与桌面端暗色科技风样式
├── publish.js        # 动态线路测速、一键复制、书签收藏、节点渲染脚本
├── logo.png          # 黄果短剧官方高清透明 Logo
├── favicon.ico       # 官方网站 Favicon 图标
└── README.md         # 部署说明文档
```

---

## 🚀 如何部署到 GitHub Pages？

### 步骤 1：创建 GitHub 仓库
1. 登录您的 GitHub 账号，点击右上角 `+` -> **New repository**。
2. 仓库名可以起例如：`huangguo`、`hg` 或 `nav`（若想起为个人主页，可命名为 `<你的Github用户名>.github.io`）。
3. 仓库属性选择 **Public**（公开），点击 **Create repository**。

### 步骤 2：上传本项目文件
在新建的仓库页面，选择 **uploading an existing file**，将本项目目录下的所有文件上传：
- `index.html`
- `publish.css`
- `publish.js`
- `logo.png`
- `favicon.ico`

提交（Commit changes）。

### 步骤 3：开启 GitHub Pages
1. 在仓库顶部菜单中点击 **Settings**（设置）。
2. 在左侧菜单点击 **Pages**。
3. 在 **Build and deployment** 下的 **Branch**：
   - 选择 `main` 分支（或 `master`），目录选择 `/ (root)`。
   - 点击 **Save**（保存）。
4. 等待约 1~2 分钟，GitHub 会为您生成访问地址，格式一般为：
   `https://<你的用户名>.github.io/<仓库名>/`

---

## 🛡️ 官方数据与配置说明

- **内容主站**：`https://huangguoai.com`
- **中转入口**：`https://huangguoai.ai`
- **备用主干**：`https://hgai17.com`
- **商务合作**：`https://huangguoai.me`
- **实时直连专线**：`https://2a52.bmikbxhi.cc`
- **官方邮箱**：`huangguoaiai@gmail.com`
- **官方 Telegram**：`t.me/huangguofans`
- **官方 X**：`@huangguoai`
- **官方 YouTube**：`@huangguoaiai`

如需更换或新增最新线路，只需在 `publish.js` 中的 `SPEED_LINES` 数组内修改即可，即改即生效！
