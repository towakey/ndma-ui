# ndma-ui CSSフレームワーク

国家防災管理機構（NDMA）の業務UIを模したCSSフレームワークです。

## 概要

**ndma-ui** は、架空の行政組織「国家防災管理機構（NDMA）」の業務UIを模したCSSフレームワークです。行政的で堅実なデザイン、災害対応向けのダークデザイン、さらに特務部隊向けの「夜間視認最適化テーマ（SOPHEX モード）」を含む複数テーマを提供します。

特徴：
- 軽量で依存ライブラリなし
- CSS変数中心のテーマ切替設計
- WCAG AA 準拠のアクセシビリティ
- 完全レスポンシブ対応
- BEM準拠の命名規則

## テーマ

### Default（行政・文書系）
- 背景：白
- NDMAブルー: `#102B4C`
- アクセント：防災オレンジ `#E67A00`
- 公的機関をイメージした控えめなUI

### Dark（災害対策室向け）
- 黒/紺ベース
- 透過感の少ないカード
- 青と白でコントラストを確保

### Night Ops（SOPHEX UI）
- 完全ダークテーマ
- NERVライクな発光オレンジ: `#FF8A1C`
- 線的UI、HUDパネル、アニメーション有
- 「夜間最適化テーマ」として表向き自然に見えるデザイン

## インストール

### HTMLでの使用
```html
<link rel="stylesheet" href="dist/ndma.css">
```

### Minified版
```html
<link rel="stylesheet" href="dist/ndma.min.css">
```

## 使い方

### テーマの適用
HTML要素にクラスを追加してテーマを切り替えます：

```html
<html class="ndma-theme-default">  <!-- デフォルトテーマ -->
<html class="ndma-theme-dark">     <!-- ダークテーマ -->
<html class="ndma-theme-ops">      <!-- Night Opsテーマ -->
```

### 基本的なコンポーネント

#### ボタン
```html
<button class="ndma-btn ndma-btn--primary">Primary</button>
<button class="ndma-btn ndma-btn--secondary">Secondary</button>
<button class="ndma-btn ndma-btn--danger">Danger</button>
```

#### カード
```html
<div class="ndma-card">
  <div class="ndma-card__header">
    <h3 class="ndma-card__title">カードタイトル</h3>
  </div>
  <div class="ndma-card__body">
    <p>カードのコンテンツ</p>
  </div>
</div>
```

#### テーブル
```html
<table class="ndma-table ndma-table--disaster">
  <thead>
    <tr>
      <th>見出し1</th>
      <th>見出し2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>データ1</td>
      <td>データ2</td>
    </tr>
  </tbody>
</table>
```

#### フォーム
```html
<div class="ndma-form-group">
  <label class="ndma-form-label">ラベル</label>
  <input type="text" class="ndma-form-control" placeholder="入力してください">
</div>
```

## NDMA固有コンポーネント

### ステータスタグ
```html
<span class="ndma-status-tag ndma-status-tag--level-1">レベル1</span>
<span class="ndma-status-tag ndma-status-tag--level-5">レベル5</span>
```

### ミッション優先度バッジ
```html
<span class="ndma-mission-priority">中</span>
<span class="ndma-mission-priority ndma-mission-priority--critical">緊急</span>
```

### モニターパネル
```html
<div class="ndma-monitor-panel">
  <div class="ndma-monitor-panel__header">
    <h3 class="ndma-monitor-panel__title">監視システム</h3>
  </div>
  <div class="ndma-monitor-panel__content">
    <!-- コンテンツ -->
  </div>
</div>
```

## SOPHEX専用コンポーネント（Night Opsテーマ）

### HUDパネル
```html
<div class="ndma-card ndma-card-hud">
  <div class="ndma-card__body">
    <div class="ndma-grid-hud">
      <!-- HUDコンテンツ -->
    </div>
  </div>
</div>
```

### タクティカルボタン
```html
<button class="ndma-btn ndma-btn--tactical">Tactical</button>
```

### ライブフィードウィンドウ
```html
<div class="ndma-live-feed">
  <!-- フィードコンテンツ -->
</div>
```

### コードエントリーパッド
```html
<div class="ndma-code-pad">
  <div class="ndma-code-pad__display">_ _ _ _</div>
  <div class="ndma-code-pad__grid">
    <button class="ndma-code-pad__btn">1</button>
    <!-- 他のボタン -->
  </div>
</div>
```

## カスタマイズ

### CSS変数
各テーマはCSS変数で定義されています。独自のテーマを作成するには：

```css
.ndma-theme-custom {
  --ndma-blue: #your-blue;
  --ndma-orange: #your-orange;
  --bg-primary: #your-bg-color;
  /* 他の変数 */
}
```

### 主要なCSS変数
- `--ndma-blue`: メインブルー
- `--ndma-orange`: アクセントオレンジ
- `--ndma-gray`: グレー
- `--ndma-light`: ライトグレー
- `--bg-primary`: 背景色
- `--text-primary`: テキスト色
- `--border-color`: 枠線色
- `--shadow`: 影

## ブラウザサポート

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## ライセンス

MIT License

## デモ

`demo/index.html` をブラウザで開いて、すべてのコンポーネントとテーマを確認できます。

## ファイル構成

```
ndma-ui/
├─ dist/
│  ├─ ndma.css       # 完全版CSS
│  └─ ndma.min.css   # Minified版
├─ demo/
│  └─ index.html     # デモページ
├─ src/
│  ├─ base.css       # ベーススタイル
│  ├─ layout.css     # レイアウト
│  ├─ themes/        # テーマCSS
│  └─ components/    # コンポーネントCSS
└─ README.md
```

## 開発

### ビルド
src/ディレクトリのCSSファイルを結合してdist/ndma.cssを生成します：

```bash
# PowerShell
Get-Content src\*.css src\themes\*.css src\components\*.css | Set-Content dist\ndma.css
```

### Minified版の生成
```bash
# PowerShell
Get-Content dist\ndma.css | ForEach-Object { $_ -replace "`r`n", "" -replace "/\*.*?\*/", "" -replace "\s+", " " } | Set-Content dist\ndma.min.css
```

## コントリビューション

1. Forkする
2. 機能ブランチを作成
3. 変更をコミット
4. プルリクエストを作成

## 更新履歴

### v1.0.0 (2025-12-11)
- 初回リリース
- 3つのテーマ（Default/Dark/Night Ops）を実装
- 基本コンポーネントとNDMA固有コンポーネントを実装
- SOPHEX専用HUDコンポーネントを実装
- 完全レスポンシブ対応
