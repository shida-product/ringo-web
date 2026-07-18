# Claude 作成デザイン試作の構成メモ

> 作成者：Claude
> 作成日：2026-07-18
> 根拠：`docs/foundation/design-refresh-implementation-guide.md`

Codex等ほかの実装者の成果物と区別できるよう、Claudeが作成したファイルはすべて
`claude` の名前空間（ディレクトリ／ファイル名）に分離している。

## 作成したパターン（4案）

| URL | パターン名 | 位置づけ | テーマの要点 |
| --- | --- | --- | --- |
| `/design-preview/claude/` | 一覧ページ | 入口 | 4案の比較・切替 |
| `/design-preview/claude/trust-first-pharmacy` | Trust First Pharmacy | 本番採用候補 | 深緑×白、大きな文字、Noto Sans JP維持 |
| `/design-preview/claude/community-care` | Community Care | 本番採用候補 | 暖色×丸ゴシック（Zen Maru Gothic）、かかりつけ感 |
| `/design-preview/claude/local-editorial` | Local Editorial | 表現検証 | 雑誌風、生成り×明朝（Shippori Mincho）×罫線 |
| `/design-preview/claude/wellness-brand` | Wellness Brand | 表現検証 | セージグリーン×余白×英字ラベル（Zen Kaku Gothic New） |

手順書 §5 の必須セクション（Hero / First Action / Services / Products /
Access・Hours / CTA）は全パターンで維持している。商品はサンプル3件を
`src/data/products.ts` から表示し、microCMS差し替え予定の注記を入れている。

## Claude が追加したファイル一覧

- レイアウト
  - `ringo-web/src/layouts/ClaudePreviewLayout.astro`（noindex付き・テーマ切替・Claude作の明記フッター）
- スタイル
  - `ringo-web/src/styles/claude/preview-tokens.css`（`--cp-*` 変数で本番トークンと分離）
  - `ringo-web/src/styles/claude/themes/trust-first-pharmacy.css`
  - `ringo-web/src/styles/claude/themes/community-care.css`
  - `ringo-web/src/styles/claude/themes/local-editorial.css`
  - `ringo-web/src/styles/claude/themes/wellness-brand.css`
- コンポーネント（`ringo-web/src/components/claude/`）
  - `PreviewPatternNav.astro` / `SectionHeader.astro` / `ActionLinks.astro`
  - `ServiceCards.astro` / `HoursPanel.astro` / `AccessPanel.astro` / `CtaBand.astro`
- ページ（`ringo-web/src/pages/design-preview/claude/`）
  - `index.astro` / `trust-first-pharmacy.astro` / `community-care.astro`
  - `local-editorial.astro` / `wellness-brand.astro`

既存ファイルの変更は無し（本番ページ・共通CSS・`Layout.astro` には手を入れていない）。
共通の `ProductCard.astro` と `src/data/*` は読み取りのみで再利用。

## 手順書との対応

- Step 1（PreviewLayout）：`ClaudePreviewLayout.astro` として作成。
  試作ページはSEO対象外のため `noindex` を付与し、OGP等は本番Layoutに残した。
- Step 2（トークン分離）：`global.css` は動かさず、`--cp-*` 名前空間で
  試作専用トークンを新設（手順書の「最初は無理に全移動しない」方針）。
- Step 3（必須モジュール）：優先度順（ActionLinks → HoursPanel → ServiceCards →
  AccessPanel → SectionHeader → CtaBand）で全て作成。
- Step 4〜6：堅実2案＋表現2案の計4案。`ringo-pop` / `pharmacy-magazine` /
  `neo-corporate` / `experimental-typography` は未着手（次バッチ候補）。

## 確認チェックリスト（手順書 §8.2）

- [x] `npm run build` が通る
- [x] 電話・LINE・地図リンクは全パターンでファーストビュー直下に配置
- [x] 営業時間はヒーロー近く（Hero直後のアクション → Hours）から辿れる
- [x] `prefers-reduced-motion` でアニメーション無効化
- [x] 生成画像は未使用（既存写真のみ）
- [ ] 実機でのPC/スマホ幅の目視確認（レビュー時にお願いします）

## 未確認事項（手順書 §10 より）

- Google Fonts は Zen Maru Gothic / Shippori Mincho / Zen Kaku Gothic New /
  Cormorant Garamond を提案として使用した。差し替え可。
- デザインプレビューを本番デプロイに含めるか（現状 `noindex` は付与済み）。
- 採用案の `index.astro` への反映時期。
