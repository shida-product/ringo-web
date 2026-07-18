# システムアーキテクチャ

## 1. 技術スタック
- **フロントエンド・フレームワーク**: Astro (静的サイトジェネレーター)
- **スタイリング**: Vanilla CSS (CSSカスタムプロパティを用いたモダンデザインシステム構築、Tailwind不可)
- **コンテンツ管理（CMS）**: microCMS（Headless CMS・日本製）※商品ページのデータ管理に採用。無料（Hobby）プランで運用。
- **ホスティング／自動デプロイ**: **Netlify（無料 Starterプラン）に確定**。商用利用可・独自ドメイン/HTTPS無料・microCMS Webhookで自動ビルド〜デプロイ。
  - Vercel不採用理由：無料(Hobby)プランは非商用限定のため、事業サイトである本サイトでは規約違反となる。
  - 無料枠：帯域100GB/月、ビルド300分/月（≒月100回前後のデプロイ相当）。薬局の更新頻度では十分。
- **ドメイン**: 自分名義でレジストラ取得（独自ドメイン）。DNSでホストに接続。将来の複数プロジェクトはCloudflare等でDNSを一元管理する運用も可。ドメインとホスティングを分離することで、ホスト移行はDNS付け替えのみで容易。

## 2. デザインシステム規則
- **ベースカラー**: クリーンホワイト (`#FFFFFF`)、アッシュホワイト (`#F8F9FA`)
- **メインカラー**: 医療系ブルー/グリーン (`#2A9D8F`)
- **アクセントカラー**: アップルレッド (`#E63946`)
- **エフェクト**: Glassmorphism、Drop-shadow効果の活用

## 3. サイトマップ（ページ構成）
以下を `ringo-web/src/pages/` 直下に `.astro` として配置する。
1. `index.astro` (ホーム画面)
2. `prescription.astro` (処方箋の受付)
3. `generic.astro` (ジェネリック薬について)
4. `access.astro` (交通案内)
5. `company.astro` (会社案内)
6. `products/index.astro`（取扱い商品 一覧）※新規
7. `products/[slug].astro`（商品個別ページ・microCMSから動的生成）※新規

## 4. 商品ページ（microCMS連携）アーキテクチャ
- **データ管理**: 商品情報はmicroCMSの管理画面で登録・編集・公開（非エンジニアが操作）。
- **データ取得**: Astroの `getStaticPaths` がビルド時にmicroCMS APIを呼び、商品ごとの静的HTMLを生成。
  - APIキーはビルド環境の環境変数に保持し、ブラウザには露出させない。
- **公開フロー**: microCMSで公開 → Webhookでビルド起動 → 数分後に本番反映（自動デプロイ）。
- **アクセス分離**: 管理画面（microCMS側・要ログイン）と公開サイト（自社ドメイン・静的HTML）は完全分離。来訪者は管理画面・APIに直接アクセスできない。

## 5. SEO 設計方針
- ゴール：「荒川区 ミラグレーン」等の "地域名＋商品名" 検索での自社サイト表示。
- 手段：構造化データ（JSON-LD `Pharmacy` 実装済み／商品に `Product`・`Drug` 追加予定）＋meta description＋画像alt＋自然な可視文への地域名記載。
- **禁止**：隠しテキスト・隠しキーワード・`meta keywords` 羅列（Google規約違反。薬局=YMYLで高リスク）。
- 補助施策：独自ドメイン、Googleビジネスプロフィール、`@astrojs/sitemap`＋Search Console。
- 詳細は `docs/foundation/seo-product-strategy.md` を参照。

## 6. 確定した設計判断（2026-07-18）
1. **ホスティング／自動デプロイ**：**Netlify（無料）に確定**（上記「1. 技術スタック」参照）。
   - ※現行 `astro.config.mjs` は GitHub Pages 前提（`base: '/ringo-web'`）。独自ドメイン＋Netlify化で `site`/`base` の再設定が必要。
2. **画像の配信方式**：**ビルド時に自社ホスト（Netlify CDN）へ取り込み配信に確定**。Astroの画像最適化（WebP/AVIF・リサイズ）で表示速度はむしろ向上。microCMSの転送量枠も消費しない。
3. **URL/slug 設計**：**slug＝ローマ字（例 `/products/miragreen`）／画面表示＝正式名称（日本語「ミラグレーン」）に確定**。SEOは可視の正式名称・title・構造化データで効かせる（URLキーワードは影響小）。

## 7. 後回し（着手時に確定）
1. **microCMSコンテンツ型（入力フィールド）**：商品名／slug／価格／画像／カテゴリ／説明／SEO用説明文／画像alt／公開フラグ 等（たたき台を別途作成）。
2. **Instagram表示方式**：無料ウィジェット案が最短（SEO非寄与・演出目的）。設置場所とあわせて確定。
