# システムアーキテクチャ

## 1. 技術スタック
- **フロントエンド・フレームワーク**: Astro (静的サイトジェネレーター)
- **スタイリング**: Vanilla CSS (CSSカスタムプロパティを用いたモダンデザインシステム構築、Tailwind不可)
- **コンテンツ管理（CMS）**: microCMS（Headless CMS・日本製）※商品ページのデータ管理に採用。無料（Hobby）プランで運用。
- **ホスティング**: ※**未確定**（下記「6. 未確定事項」参照）。非エンジニアによる自動公開を実現するため、microCMSのWebhookでビルド〜デプロイを自動化できる基盤を選定する。

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

## 6. 未確定事項（着手前にユーザーと確定する）
1. **ホスティング／自動デプロイ基盤**（最重要）
   - 候補A：Netlify / Vercel（無料・HTTPS自動・独自ドメイン可・Webhook自動ビルド。Headless CMSとの相性が最良／推奨）
   - 候補B：GitHub Pages＋GitHub Actions（現状維持・0円。Webhook→Actionsで自動ビルド可だが設定はやや手間）
   - 候補C：既存レンタルサーバーにFTP自動デプロイ（有料サーバー契約がある場合のみ。月額費用が発生し「0円運用」と相反）
   - ※現行 `astro.config.mjs` は GitHub Pages 前提（`base: '/ringo-web'`）。独自ドメイン化で `site`/`base` の再設定が必要。
2. **画像の配信方式**：microCMS画像を直リンクすると来訪者アクセスが転送量（無料枠20GB/月）を消費するため、ビルド時に自社ホスト側へ取り込み配信する方針を推奨。
3. **URL/slug 設計**：ローマ字slug（例 `/products/miragreen`）を推奨。
4. **microCMSコンテンツ型（入力フィールド）**の確定：商品名／slug／価格／画像／カテゴリ／説明／SEO用説明文／画像alt／公開フラグ 等。
5. **Instagram表示方式**：無料ウィジェット案が最短（SEO非寄与・演出目的）。設置場所とあわせて確定。
