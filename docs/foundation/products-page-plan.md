# 商品ページ（microCMS連携）実装計画

> 目的：取扱い商品を表示するページ群を、既存サイトのデザイン・実装規則に準拠して作る。
> **実装は別セッションで行う。本書はその着手用の設計・手順書。**
> 現段階（ドメイン取得前）は **サンプルデータで静的にUIを先行作成**し、後日microCMS連携へ差し替える。
> 作成日：2026-07-18

---

## 1. 前提：microCMSの管理画面は自作しない

- microCMSは**管理画面（編集UI）をSaaSとして提供**する。商品の登録・編集・公開はすべてmicroCMS側の画面（`xxx.microcms.io`）で完結。
- **本リポジトリで作るのは「公開側の表示ページ」だけ**。管理画面を自作する必要はない（WordPressの `/wp-admin` のような自前管理ページは不要）。
- 来訪者は表示ページ（静的HTML）だけを見る。管理画面・APIには触れない。

---

## 2. 既存実装への準拠方針（必ず踏襲する規則）

`src/pages/generic.astro` `src/pages/index.astro` `src/styles/global.css` `src/layouts/Layout.astro` を参照し、以下を踏襲する。

- **レイアウト**：`Layout.astro` を使用（`title` / `description` props を渡す。`description` は各商品のsummaryを渡してSEOに使う）。
- **デザイントークン**：`global.css` のCSS変数を使用（`--color-primary:#2A9D8F` / `--color-accent:#E63946` / `--color-text` / `--color-text-light` / `--color-background` / `--color-surface`）。ハードコード色は使わない。
- **共通クラス**：`.container` / `.page-header` / `.glass-panel` / `.section-title` / `.sub-title` / `.text-pretty` / `.button-accent` を再利用。
- **内部リンク**：`const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, '/');` を各ページで定義し、`${baseUrl}products/${slug}` の形で組む（GitHub Pagesのbaseパス対応。独自ドメイン移行時も安全）。
- **画像**：`astro:assets` の `<Image>` を使用（`widths` / `sizes` 指定でレスポンシブ最適化）。
- **アイコン**：lucideは `Layout.astro` の `<script>` 内 `createIcons({ icons: {...} })` で**使うアイコンだけをtree-shake登録**している。⚠️**新規アイコンを使う場合はLayoutのimportとiconsオブジェクトへ追記が必須**（未登録だとレンダリングされない）。
- **レスポンシブ**：ブレイクポイントは `768px`（モバイル）/ `1024px`（タブレット）。基準18px・タップターゲット最低44px（高齢者配慮）。
- **スタイル記述**：各ページ/コンポーネント末尾の scoped `<style>` に記述（Vanilla CSS、Tailwind不可）。
- **本文改行**：`<br>` 直書き禁止。`.br-pc-only` / `.br-sp-only` ユーティリティを使う。

---

## 3. 追加・変更するファイル

### 新規
| ファイル | 役割 |
|---|---|
| `src/data/products.ts` | 商品の型定義＋サンプルデータ＋ヘルパ（microCMSレスポンス形に寄せる。後日fetchに差し替え） |
| `src/pages/products/index.astro` | 取扱い商品の一覧（カードグリッド） |
| `src/pages/products/[slug].astro` | 商品個別ページ（`getStaticPaths`で動的生成） |
| `src/components/InstagramFeed.astro` | Instagram投稿タイルのグリッド（現段階はプレースホルダ） |

### 変更
| ファイル | 変更内容 |
|---|---|
| `src/layouts/Layout.astro` | desktop-nav・mobile-drawer に「取扱い商品」(`${baseUrl}products`) リンクを追加。新規lucideアイコンを `createIcons` に追記 |
| `src/pages/index.astro` | （任意）ホーム下部に `InstagramFeed` セクションを追加 |

---

## 4. microCMS コンテンツ型（フィールド設計）

商品用API（例：エンドポイント `products`）のフィールド定義。`src/data/products.ts` の型もこれに揃える。

| フィールドID | 表示名 | 型 | 必須 | 用途・備考 |
|---|---|---|---|---|
| `name` | 商品名（正式名称） | テキスト | ✅ | 例「ミラグレーン」。H1・title・構造化データに使用 |
| `slug` | URL用スラッグ | テキスト | ✅ | ローマ字。例 `miragreen`。URLは `/products/{slug}` |
| `category` | カテゴリ | セレクト | ✅ | 胃腸薬／かぜ薬／鎮痛薬／目薬／皮膚の薬／ビタミン・栄養／衛生・日用品／健康食品 等 |
| `medClass` | 医薬品区分 | セレクト | ✅ | 第1類/指定第2類/第2類/第3類 医薬品／医薬部外品／健康食品／日用品（薬機法表示・下記9参照） |
| `maker` | メーカー | テキスト | 任意 | 製造販売元 |
| `price` | 税込価格（円） | 数値 | 任意 | 未設定なら「店頭にてご確認ください」等を表示 |
| `image` | 商品画像 | 画像 | ✅ | 実装時はビルド時に自社ホストへ取り込み配信（転送量対策） |
| `imageAlt` | 画像の代替テキスト | テキスト | 任意 | 未設定時は「荒川区の薬局 {name}」を自動生成 |
| `summary` | 概要（短い説明） | テキスト | ✅ | 一覧カード＋metaディスクリプション用（〜120字目安） |
| `description` | 特徴・説明 | リッチ/テキストエリア | 任意 | 本文。承認された効能効果の範囲で記載 |
| `ingredients` | 成分・分量 | テキストエリア | 任意 | 医薬品で記載推奨 |
| `usage` | 用法・用量 | テキストエリア | 任意 | 医薬品で記載推奨 |
| `caution` | 使用上の注意 | テキストエリア | 任意 | 医薬品で記載推奨（薬機法） |
| `order` | 表示順 | 数値 | 任意 | 一覧の並び替え用（小さい順） |

- **公開/非公開**：microCMS標準の「公開・下書き」ステータスで制御 → **独自の公開フラグは不要**。
- **カテゴリを増減する予定が強い場合**：`category` を別APIの参照（リファレンス）にする案もあるが、初期はセレクトで十分。

---

## 5. サンプルデータ方針（ドメイン取得前の静的段階）

- `src/data/products.ts` に**仮データ**を置き、microCMSのレスポンス構造に寄せる（後で `getStaticPaths` の取得元をfetchへ差し替えるだけにする）。
- **画像は未取得**のため、カテゴリ別のlucideアイコン＋グラデ背景の**プレースホルダ**で表示（実写真がある体裁を装わない）。`image`項目は将来用に型に残す。
- **価格・説明文はサンプル**。公開前に正式情報へ差し替える旨をコメントで明記。
- 例（5〜6件）：ミラグレーン（胃腸薬・第2類）／総合かぜ薬（指定第2類）／解熱鎮痛薬（第2類）／ビタミンC（第3類）／冷却シート（医薬部外品）／乳酸菌サプリ（健康食品）。一部は`price`未設定にして任意項目の表示を確認。

---

## 6. ページUI構成

### 一覧 `products/index.astro`
- `.page-header`「取扱い商品」
- リード文（例：「荒川区・町屋の当薬局で取り扱う市販薬・衛生用品をご紹介します」＝地域キーワードを自然な可視文で入れる）
- （任意）カテゴリでの絞り込みチップ
- 商品カードの**レスポンシブグリッド**（PC3列 → タブレット2列 → モバイル1〜2列）。カード内：画像（プレースホルダ）／カテゴリ・区分バッジ／商品名／summary／価格／詳細リンク。既存 `gallery-grid`・`.glass-panel` の質感を流用。

### 個別 `products/[slug].astro`
- パンくず（取扱い商品 › 商品名）
- 上部2カラム：画像 ｜ 基本情報（商品名・区分バッジ・メーカー・価格・summary）。モバイルは縦積み。
- 本文：特徴（description）／成分・分量／用法・用量／使用上の注意（存在する項目のみ表示）
- **薬機法の注記**（下記9）
- 下部CTA：「お薬のご相談はLINEで」＝`SITE.lineUrl`（`.button-accent`）＋ 一覧へ戻るリンク
- `getStaticPaths` でサンプルデータから全slugを生成。

---

## 7. Instagram表示（投稿タイル）

- `src/components/InstagramFeed.astro`：正方形タイルの**レスポンシブグリッド**（PC3〜4列 → モバイル2列）。`.section-title`「Instagram」。
- **現段階はプレースホルダ**（タイル＋Instagramアイコン）＋「Instagramで見る」CTA（`SITE.instagramUrl`）。
- **将来の実装差し替え**：無料ウィジェット（SnapWidget / Behold 等）の埋め込み、または Instagram Graph API のビルド時取得。※要Instagramビジネス/クリエイターアカウント連携。
- **SEO非寄与**（装飾・信頼演出の位置づけ）。スクリプト埋め込み時は遅延読み込みで表示速度に配慮。

---

## 8. SEO実装（個別ページ）

- `Layout` の `description` に商品 `summary` を渡す。
- 商品の構造化データ（JSON-LD `Product` ／医薬品は `Drug`）を追加（`Layout` の `Pharmacy` とは別に各商品ページで出力）。
- 画像alt＝「荒川区の薬局 {商品名}」等、地域＋商品名を自然に。
- URLは `slug`＝ローマ字、画面表示は正式名称（日本語）。SEOキーワードは可視の正式名称・title・構造化データで効かせる。
- サイト全体：`@astrojs/sitemap` 導入で商品ページもsitemapに含める。

---

## 9. 薬機法（医薬品医療機器等法）コンプライアンス

- 掲載対象は **一般用医薬品（OTC）／医薬部外品／健康食品／日用品**。**医療用医薬品（処方薬）は一般向け広告が不可のため掲載しない。**
- 効能効果は**承認された範囲内**の記載に留め、**誇大表現・「必ず効く」等の効果保証・体験談での効能訴求は避ける**。
- 医薬品は**区分（第1類/第2類等）・使用上の注意**を明記。第1類・要指導は販売方法に規制があるため表示方針を別途確認。
- 個別ページに注記例：「※本ページは商品情報の紹介です。ご使用の際は添付文書をよく読み、用法・用量を守ってください。ご不明点は薬剤師にご相談ください。」

---

## 10. 実装チェックリスト（別セッション用）

1. `src/data/products.ts`：型（`Product`）＋サンプル配列＋`categoryIcon()`ヘルパ＋`getAllProducts()/getProductBySlug()`。
2. `src/pages/products/index.astro`：一覧グリッド。`baseUrl`・`<Image>`・共通クラス準拠。
3. `src/pages/products/[slug].astro`：`getStaticPaths`＋個別レイアウト＋薬機法注記＋Product構造化データ。
4. `src/components/InstagramFeed.astro`：タイルグリッド（プレースホルダ）。
5. `src/layouts/Layout.astro`：ナビ2箇所に「取扱い商品」追加。新規lucideアイコンを `createIcons` に登録。
6. （任意）`src/pages/index.astro`：`InstagramFeed` セクション追加。
7. `npm run build` で通ることを確認（`ringo-web/` 直下で実行）。
8. スマホ実機での表示確認。

---

## 11. 後日：microCMS連携への移行（ドメイン取得後）

1. microCMSでコンテンツ型（§4）を作成し、実データ登録。
2. `getStaticPaths` の取得元を `products.ts` の配列から **microCMS API fetch** に差し替え。
3. APIキー（読み取り用）を **Netlify環境変数**に設定（Gitに含めない）。
4. 商品画像をビルド時に自社ホストへ取り込み配信。
5. microCMS Webhook → **Netlify自動ビルド**を設定。
6. `astro.config.mjs` の `site` / `base` を独自ドメイン向けに再設定。
7. **画面プレビュー**（§12）を実装。
8. Google Search Console／Googleビジネスプロフィール登録。

---

## 12. 非エンジニア向け編集体験：画面プレビュー（重要要件）

**要件：非エンジニアが「実際の画面表示を見ながら」入力・確認・公開できるようにする。**

### 実現方式
- microCMSは「**フォーム入力 ＋ 画面プレビュー**」スタイル（ページ上に直接タイプするビジュアル編集ではない）。
  - 編集者はフォームに入力 →「画面プレビュー」ボタンで**下書き状態の実ページ**を確認 → 公開。
- microCMS管理画面の「API設定 →画面プレビュー」で**遷移先URL**を設定（`CONTENT_ID` と `draftKey` を含める。一度きりの設定）。

### Astro（静的サイト）での技術的ポイント
- Astroは既定でSSG（ビルド時にHTML固定）のため、**そのままでは下書きプレビュー不可**（URLの `draftKey` を実行時に読めない）。
- 対策：**プレビュー用ルートだけをSSR/ハイブリッドで動かす**（`@astrojs/netlify` アダプタ導入、該当ルートで `export const prerender = false`）。
  - **商品ページ本体は静的（SSG）のまま維持** → 表示速度・SEOは犠牲にしない。
  - プレビュー時は `draftKey` を使ってmicroCMSの下書きコンテンツを取得し、本番と同じテンプレートでレンダリング。
- 参考：microCMS公式「AstroとmicroCMSを使った画面プレビューを実装する」。

### 入力ガイド・プレースホルダー
- **フォーム側**：フィールドごとに「説明文・入力例」を設定（例：slug欄に「ローマ字で入力。例：miragreen」）。非エンジニアが迷わない。
- **表示側フォールバック**：画像未設定→仮画像、価格未設定→「店頭にてご確認ください」等をサイト側で表示（§5・§6に準拠）。

### 方針メモ
- 「ページに直接タイプする完全ビジュアル編集」はページビルダー系（STUDIO等）の領域で、SEO制御・デザイン自由度・0円静的運用を一部失うため**不採用**。今回の目的には microCMS「フォーム＋画面プレビュー」が最適。
