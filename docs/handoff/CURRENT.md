# 現在の注力タスク・ブロッカー

## 現在のフェーズ
- **商品ページ（microCMS連携）＋SEO強化の設計フェーズ**
- 基本方針は確定（microCMS＋Astro／独自ドメイン取得／非エンジニア運用／月額0円維持）。
- 詳細は `docs/foundation/seo-product-strategy.md` を参照。

## 次のアクション
1. 未確定のアーキテクチャ論点をユーザーと確定（ホスティング/自動デプロイ基盤、画像配信方式、URL/slug設計、コンテンツ型フィールド、Instagram表示方式）。
2. 確定後、`docs/foundation/architecture.md` を更新（技術スタックにmicroCMS・CI/CDを追記）。
3. microCMSのコンテンツ型設計 → `src/pages/products/[slug].astro` 実装 → 自動デプロイ設定。
4. Googleビジネスプロフィール登録／`@astrojs/sitemap` 導入／Search Console登録。

## ブロッカー
- 未確定のアーキテクチャ論点（ホスティング/自動デプロイ基盤など）のユーザー判断待ち。
