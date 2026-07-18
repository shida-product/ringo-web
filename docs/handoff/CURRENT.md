# 現在の注力タスク・ブロッカー

## 現在のフェーズ
- **デザイン刷新プレビュー実装準備フェーズ**
- 技術方針・アーキテクチャは確定済み（下記）。詳細は `docs/foundation/architecture.md`。
- **▶ 実装着手時はまず `docs/foundation/products-page-plan.md`（実装計画書）を読むこと。** サンプルデータで静的にUIを先行作成し、後日microCMS連携へ差し替える方針。
- microCMSの管理画面は自作しない（SaaS提供の編集UIを使う）。本リポジトリは公開側の表示ページのみ。

## 確定済みの技術方針
- 商品ページ：microCMS＋Astro（静的生成）
- ホスティング／DNS：Cloudflare Pages（無料・500ビルド/月・帯域無制限・停止リスクなし）／DNSもCloudflare
- 画像：ビルド時に自社ホスト取り込み配信
- URL：slug＝ローマ字／表示＝正式名称（日本語）
- 独自ドメイン：自分名義で取得
- コスト：月額実質0円（ドメイン年額のみ）

## 次のアクション（次セッションで実装）
`docs/foundation/design-refresh-implementation-guide.md` の順番に従う。
1. `ringo-web/src/layouts/PreviewLayout.astro` を追加する。
2. `ringo-web/src/styles/tokens.css` と必要なテーマCSSを追加する。
3. `ActionLinks` / `HoursPanel` / `ServiceCards` / `AccessPanel` / `SectionHeader` / `CtaBand` を優先して部品化する。
4. `/design-preview/trust-first-pharmacy` と `/design-preview/community-care` の2案から試作する。
5. `npm run build` とPC/スマホ幅の表示確認を行う。

## 後日（ドメイン取得後）
- microCMS連携への差し替え、Cloudflare Pages自動デプロイ（Deploy Hook）、sitemap／Search Console／Googleビジネスプロフィール（計画書 §11）。


## デザイン刷新検討（2026-07-18 追加）
- 参考サイトをもとに、前衛的で印象に残る薬局コーポレートサイトのブラッシュアップ案を検討開始。
- 実装前に `docs/foundation/design-refresh-plan.md` を読み、コンポーネント化 → `/design-preview/` で複数案試作 → 採用案反映の順で進める。
- PHARMA STUDIO 掲載の薬局制作事例を参考に、堅実な薬局サイト要件と Trust First Pharmacy / Community Care の2案を `docs/foundation/design-refresh-plan.md` へ追記済み。
- 未確定だった前衛度・写真素材・動き・Google Fonts 方針は確定し、同計画書の §7 に反映済み。
- 実装者向け手順書 `docs/foundation/design-refresh-implementation-guide.md` を追加。次回実装は同手順書の順番に従う。

## ブロッカー
- デザインプレビュー実装のブロッカーはなし。
- microCMS実連携は独自ドメイン取得後。
