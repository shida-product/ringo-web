# デザイン刷新 実装手順書

> 目的：Codex以外の実装者でも、この手順書を読み込めばデザイン刷新の試作を開始できる状態にする。
> 対象：りんごちゃん薬局サイトの `/design-preview/` 試作、共通コンポーネント拡張、本番反映前の確認。
> 作成日：2026-07-18

---

## 0. 最初に読むファイル

作業開始時は、必ず次の順で読む。

1. `docs/handoff/CURRENT.md`
2. `docs/handoff/PROGRESS.md`
3. `docs/foundation/design-refresh-plan.md`
4. `docs/foundation/architecture.md`
5. `docs/foundation/products-page-plan.md`（商品ページやmicroCMSに触る場合）

---

## 1. 実装のゴール

- 既存本番ページを壊さず、`/design-preview/` 配下に複数のデザイン試作ページを作る。
- どの試作でも、薬局サイトとして必須の情報を落とさない。
  - 営業時間
  - 住所・地図
  - 電話
  - LINE受付
  - 処方箋受付
  - 市販薬・健康相談
  - アクセス
- 最終的に採用する案を選び、本番の `index.astro` と下層ページへ段階的に反映する。
- 技術スタックは **Astro + Vanilla CSS** のまま維持する。

---

## 2. 確定方針

### 2.1 前衛度

- 本番採用候補は、高齢者にも分かりやすい範囲に留める。
- 完全な実験案は別枠で作る。
  - 例：`/design-preview/experimental-typography`
  - 実験案でも営業時間・電話・LINE・アクセスは削らない。

### 2.2 写真・素材

- 初期試作では既存写真を使う。
  - `ringo-web/src/assets/images/Exterior_01.jpg`
  - `ringo-web/src/assets/images/Exterior_02.jpg`
  - `ringo-web/src/assets/images/Introspection.jpg`
  - `ringo-web/src/assets/images/Products.jpg`
  - `ringo-web/src/assets/images/Support.jpg`
  - `ringo-web/src/assets/images/Representative.jpg`
- 生成画像・抽象図形は必要に応じて使ってよい。
- 生成画像を使う場合、実在のスタッフ・実在の店内写真と誤認される見せ方は避ける。

### 2.3 動き

- CSSアニメーションと軽量JSの両方を使用可。
- CSS向き：フェード、スライド、ホバー、背景の軽い動き。
- 軽量JS向き：タブ、アコーディオン、モバイルドロワー、必要最小限のスクロール連動。
- 避けること：激しい点滅、過度なパララックス、長いローディング演出。
- `prefers-reduced-motion` を考慮する。

### 2.4 フォント

- Google Fonts 使用可。
- 本文は可読性優先。装飾的なフォントは見出し・英字ラベル中心に限定する。
- 既存の `Noto Sans JP` は堅実案の基準フォントとして扱う。

---

## 3. 既存コードの把握

### 3.1 ルート

- Astroプロジェクト本体：`ringo-web/`
- ページ：`ringo-web/src/pages/`
- レイアウト：`ringo-web/src/layouts/Layout.astro`
- 共通CSS：`ringo-web/src/styles/global.css`
- 画像：`ringo-web/src/assets/`
- 共通データ：`ringo-web/src/data/`
- 共通コンポーネント：`ringo-web/src/components/`

### 3.2 既に分離済みのコンポーネント

- `SiteHeader.astro`：ヘッダー、PCナビ、LINEボタン、モバイルドロワー呼び出し
- `SiteFooter.astro`：住所、電話、SNS、コピーライト
- `MobileDrawer.astro`：モバイル用メニュー
- `FloatingLineCta.astro`：モバイル下部LINE固定CTA
- `InstagramFeed.astro`：Instagramプレースホルダ
- `ProductCard.astro`：商品一覧カード
- `ProductBadge.astro`：商品カテゴリ・区分バッジ
- `LegalNotice.astro`：薬機法向け注記

### 3.3 既存データ

- `SITE`：`ringo-web/src/data/site.ts`
- ナビ：`ringo-web/src/data/navigation.ts`
- 商品サンプル：`ringo-web/src/data/products.ts`

---

## 4. 実装順序

### Step 1：デザイン試作用の共通レイアウトを作る

新規作成候補：

- `ringo-web/src/layouts/PreviewLayout.astro`

役割：

- 本番の `Layout.astro` と同じSEO基盤を使いつつ、試作ページ専用の余白・背景・テーマクラスを受け取る。
- `theme` prop を受け取り、ページ全体に `data-theme` またはクラスを付与する。

最低限のprops案：

```ts
interface Props {
  title: string;
  description?: string;
  theme?: string;
}
```

### Step 2：デザイントークンを分離する

新規作成候補：

- `ringo-web/src/styles/tokens.css`
- `ringo-web/src/styles/themes/local-editorial.css`
- `ringo-web/src/styles/themes/wellness-brand.css`
- `ringo-web/src/styles/themes/neo-corporate.css`
- `ringo-web/src/styles/themes/trust-first-pharmacy.css`
- `ringo-web/src/styles/themes/community-care.css`

実装方針：

- `global.css` にある基本トークンを `tokens.css` へ段階的に移す。
- 最初は無理に全移動せず、試作で必要な変数だけ追加してよい。
- 各テーマCSSは `--preview-*` 変数を中心に定義する。

例：

```css
:root {
  --preview-bg: #F8F9FA;
  --preview-surface: #FFFFFF;
  --preview-text: #2B2D42;
  --preview-accent: #E63946;
}
```

### Step 3：薬局サイト必須モジュールを作る

新規作成候補：

- `ringo-web/src/components/SectionHeader.astro`
- `ringo-web/src/components/ActionLinks.astro`
- `ringo-web/src/components/HoursPanel.astro`
- `ringo-web/src/components/AccessPanel.astro`
- `ringo-web/src/components/ServiceCards.astro`
- `ringo-web/src/components/PhotoPanel.astro`
- `ringo-web/src/components/CtaBand.astro`

優先度：

1. `ActionLinks.astro`：電話・LINE・地図への導線
2. `HoursPanel.astro`：営業時間
3. `ServiceCards.astro`：処方箋受付・市販薬相談など
4. `AccessPanel.astro`：住所・地図
5. `SectionHeader.astro`：英字ラベル + 日本語見出し + リード
6. `CtaBand.astro`：LINE相談・処方箋受付CTA

### Step 4：まず2パターンを作る

最初から8パターン全てを作らず、薬局サイトとして堅実な2案を先に作る。

1. `/design-preview/trust-first-pharmacy`
2. `/design-preview/community-care`

理由：

- PHARMA STUDIO 掲載事例のような薬局実務寄りの要件に近い。
- 高齢者にも分かりやすい。
- 本番採用候補にしやすい。

### Step 5：次に表現幅のある3案を作る

3. `/design-preview/local-editorial`
4. `/design-preview/ringo-pop`
5. `/design-preview/pharmacy-magazine`

目的：

- 親しみ、地域感、商品・健康情報の見せ方を比較する。

### Step 6：ブランド寄り・実験寄りを作る

6. `/design-preview/wellness-brand`
7. `/design-preview/neo-corporate`
8. `/design-preview/experimental-typography` など

目的：

- 採用前提ではなく、表現の上限を確認する。
- 良い要素だけ本番候補へ取り込む。

---

## 5. 各プレビューで必ず入れるセクション

どのパターンでも最低限、以下を入れる。

1. Hero
   - 薬局名
   - 町屋・荒川区の地域名
   - 土日営業またはLINE受付などの強い特徴
2. First Action
   - 電話
   - LINE
   - 地図
3. Services
   - 処方箋受付
   - ジェネリック相談
   - 市販薬・健康相談
   - 取扱い商品
4. Products
   - サンプル商品3件
   - microCMSへ差し替え予定であることが分かる構造
5. Access / Hours
   - 営業時間
   - 住所
   - 地図
6. CTA
   - LINE相談または処方箋受付

---

## 6. 実装時の命名規則

### 6.1 ページ

- `ringo-web/src/pages/design-preview/trust-first-pharmacy.astro`
- `ringo-web/src/pages/design-preview/community-care.astro`
- `ringo-web/src/pages/design-preview/local-editorial.astro`

### 6.2 コンポーネント

- 汎用部品：`SectionHeader.astro` / `CtaBand.astro`
- 薬局実務部品：`HoursPanel.astro` / `AccessPanel.astro` / `ActionLinks.astro`
- デザイン固有部品：`PreviewHero.astro` / `PreviewPatternNav.astro`

### 6.3 CSS

- 共通：`global.css` / `tokens.css`
- テーマ別：`themes/{pattern-name}.css`
- ページ固有：各 `.astro` ファイル末尾の scoped `<style>`

---

## 7. 実装テンプレート

### 7.1 プレビューページの基本形

```astro
---
import PreviewLayout from '../../layouts/PreviewLayout.astro';
import SectionHeader from '../../components/SectionHeader.astro';
import ActionLinks from '../../components/ActionLinks.astro';
import ServiceCards from '../../components/ServiceCards.astro';
import HoursPanel from '../../components/HoursPanel.astro';
import AccessPanel from '../../components/AccessPanel.astro';
import ProductCard from '../../components/ProductCard.astro';
import { getAllProducts } from '../../data/products';

const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const products = getAllProducts();
---

<PreviewLayout title="Trust First Pharmacy" theme="trust-first-pharmacy">
  <section class="preview-hero">
    <p class="eyebrow">MACHIYA / ARAKAWA</p>
    <h1>町屋で、迷わず相談できる薬局。</h1>
    <p>処方箋受付、市販薬相談、LINE受付に対応しています。</p>
    <ActionLinks />
  </section>

  <ServiceCards />

  <section class="container">
    <SectionHeader label="PRODUCTS" title="取扱い商品" />
    <div class="preview-products">
      {products.map((product) => <ProductCard product={product} baseUrl={baseUrl} />)}
    </div>
  </section>

  <HoursPanel />
  <AccessPanel />
</PreviewLayout>
```

### 7.2 コンポーネントの基本方針

- props を小さく保つ。
- 色や余白はCSS変数を使う。
- 本文への `<br>` 直書きは避ける。
- 画像は `astro:assets` の `Image` を使う。
- 新しい lucide アイコンを使う場合は、`Layout.astro` の `createIcons` に登録する。

---

## 8. 確認チェックリスト

### 8.1 実装前

- [ ] `docs/foundation/design-refresh-plan.md` の §7 を読んだ。
- [ ] 本番候補か、完全実験案かを決めた。
- [ ] 既存写真で足りるか確認した。
- [ ] 追加フォントを使う場合、Google Fonts の候補を決めた。
- [ ] 新しいアイコンを使う場合、lucide登録が必要か確認した。

### 8.2 実装後

- [ ] `npm run build` が通る。
- [ ] PC幅で表示確認した。
- [ ] 768px以下のスマホ幅で表示確認した。
- [ ] 電話・LINE・地図リンクが押しやすい。
- [ ] 営業時間がファーストビューまたは近い位置から辿れる。
- [ ] 文字サイズが小さすぎない。
- [ ] `prefers-reduced-motion` に配慮している。
- [ ] 生成画像を使った場合、実在写真と誤認されない。
- [ ] Lighthouse またはブラウザ開発者ツールで大きな崩れがない。

---

## 9. 迷ったときの判断基準

1. おしゃれさより、来局者が迷わないことを優先する。
2. 高齢者が読めない表現は本番候補にしない。
3. 実験案は作ってよいが、本番候補とURL・見出しで明確に分ける。
4. 薬局の実在感を出す場面では既存写真を優先する。
5. 抽象図形や生成画像は、情報を補助するために使う。
6. 新しいコンポーネントを作るときは、別パターンでも再利用できる名前・propsにする。

---

## 10. 追加確認が必要な事項

実装者は、作業前または初回レビュー時に以下を確認する。

- まず作るプレビューは `Trust First Pharmacy` と `Community Care` の2つでよいか。
- Google Fonts の具体候補を実装者側で提案してよいか。
- 生成画像・抽象図形を使う場合、どの範囲まで許容するか。
- 本番採用候補ページをいつ `index.astro` へ反映するか。
- デザインプレビューを本番デプロイ時に公開してよいか、または確認用ブランチのみで扱うか。
