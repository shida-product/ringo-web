# 現在の注力タスク・ブロッカー

## 現在のフェーズ
- **商品ページ（microCMS連携）＋SEO強化の実装準備フェーズ**
- 技術方針・アーキテクチャは確定済み（下記）。詳細は `docs/foundation/architecture.md`。

## 確定済みの技術方針
- 商品ページ：microCMS＋Astro（静的生成）
- ホスティング／DNS：Netlify（無料）
- 画像：ビルド時に自社ホスト取り込み配信
- URL：slug＝ローマ字／表示＝正式名称（日本語）
- 独自ドメイン：自分名義で取得
- コスト：月額実質0円（ドメイン年額のみ）

## 次のアクション（実装）
1. microCMSのコンテンツ型（入力フィールド）設計 ※着手時にたたき台作成
2. `src/pages/products/index.astro`（一覧）・`products/[slug].astro`（個別）の実装
3. `getStaticPaths` + microCMS API連携、商品構造化データ（Product/Drug）追加
4. Netlify自動デプロイ（microCMS Webhook）設定、`astro.config.mjs` の独自ドメイン向け再設定
5. `@astrojs/sitemap` 導入＋Google Search Console／Googleビジネスプロフィール登録
6. Instagram表示（無料ウィジェット）※後回し

## ブロッカー
- 独自ドメインの取得（取得後に着手が最も効率的）。
