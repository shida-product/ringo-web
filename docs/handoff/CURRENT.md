# 現在の注力タスク・ブロッカー

## 現在のフェーズ
- **商品ページのHTML/CSS先行作成フェーズ（実装は別セッションで行う）**
- 技術方針・アーキテクチャは確定済み（下記）。詳細は `docs/foundation/architecture.md`。
- **▶ 実装着手時はまず `docs/foundation/products-page-plan.md`（実装計画書）を読むこと。** サンプルデータで静的にUIを先行作成し、後日microCMS連携へ差し替える方針。
- microCMSの管理画面は自作しない（SaaS提供の編集UIを使う）。本リポジトリは公開側の表示ページのみ。

## 確定済みの技術方針
- 商品ページ：microCMS＋Astro（静的生成）
- ホスティング／DNS：Netlify（無料）
- 画像：ビルド時に自社ホスト取り込み配信
- URL：slug＝ローマ字／表示＝正式名称（日本語）
- 独自ドメイン：自分名義で取得
- コスト：月額実質0円（ドメイン年額のみ）

## 次のアクション（別セッションで実装）
`docs/foundation/products-page-plan.md` の「10. 実装チェックリスト」に従う。
1. `src/data/products.ts`（型＋サンプルデータ）
2. `src/pages/products/index.astro`（一覧）・`products/[slug].astro`（個別）
3. `src/components/InstagramFeed.astro`（投稿タイルのプレースホルダ）
4. `src/layouts/Layout.astro` ナビに「取扱い商品」追加（＋lucideアイコン登録）
5. `npm run build` 確認・スマホ実機確認

## 後日（ドメイン取得後）
- microCMS連携への差し替え、Netlify自動デプロイ、sitemap／Search Console／Googleビジネスプロフィール（計画書 §11）。

## ブロッカー
- なし（サンプルデータで先行作成可能）。microCMS実連携は独自ドメイン取得後。
