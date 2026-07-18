# Claude 作成デザイン試作の構成メモ

> 作成者：Claude
> 最終更新：2026-07-18（v2：全パターンをレイアウト構造から再設計）
> 根拠：`docs/foundation/design-refresh-implementation-guide.md`

Codex等ほかの実装者の成果物と区別できるよう、Claudeが作成したファイルはすべて
`claude` の名前空間（ディレクトリ／ファイル名）に分離している。

## v2 での方針変更（レビューフィードバック反映）

初版は共通カードコンポーネントを全パターンで使い回したため
「配色だけ違う同じレイアウト」になっていた。v2では以下に変更：

- カード型の共通部品（ServiceCards / ActionLinks / HoursPanel 等）を廃止。
- 共通化するのは**データのみ**（`src/data/claude/preview.ts`：営業時間・サービス・パターン定義）。
- 各パターンは**レイアウト構造・情報設計・UI装置**から作り分ける。
  本番用の共通コンポーネント化は、採用案が決まってから行う。

## 作成したパターン（8案）

| # | URL | 位置づけ | レイアウトの要点 |
| --- | --- | --- | --- |
| - | `/design-preview/claude/` | 入口 | 番号付き目録スタイルの一覧 |
| 1 | `…/trust-first-pharmacy` | 本番採用候補 | 院内サインの情報設計。常時表示の営業ステータスバー、面で押せる受付カウンター導線、3ステップ、罫線ディレクトリ、時刻表（今日の列をJSでハイライト）、FAQアコーディオン、モバイル固定アクションバー |
| 2 | `…/community-care` | 本番採用候補 | 会話UI。吹き出しQ&A、文中ボタン、棚メタファーの商品横スクロール（scroll-snap）、道順ステップ、吹き出しCTA |
| 3 | `…/local-editorial` | 表現検証 | 誌面の文法。縦書き大見出し、段組本文＋ドロップキャップ、目次、番号付き「今月の常備薬」、奥付 |
| 4 | `…/ringo-pop` | 表現検証 | 店頭POP。マーキー、CSS描画のりんご、ステッカー、値札（傾き）、黒板風営業時間 |
| 5 | `…/pharmacy-magazine` | 表現検証 | 雑誌。表紙（カバーライン＋バーコード）、モザイク特集グリッド、引用、バイヤーズガイド、INFORMATION欄、裏表紙CTA |
| 6 | `…/wellness-brand` | 表現検証 | ブランド。フルスクリーン写真ヒーロー、50/50交互チャプター、ミニマル商品リスト、タイポグラフィ主体の営業時間 |
| 7 | `…/neo-corporate` | 表現検証 | 企業サイト。固定サイドバー2ペイン、統計数値、番号付きサービス行、商品仕様表、モノスペースラベル |
| 8 | `…/experimental-typography` | 完全実験 | 文字が主役。アウトライン文字、疑似縦書き、漢数字の章立て、巨大時刻表示。写真・カード不使用 |

手順書 §5 の必須セクション（Hero / First Action / Services / Products /
Access・Hours / CTA）は全パターンで維持。商品はサンプル3件を
`src/data/products.ts` から表示し、microCMS差し替え予定の注記を全案に入れている。

## Claude が追加したファイル一覧

- レイアウト
  - `ringo-web/src/layouts/ClaudePreviewLayout.astro`
    （noindex・テーマ切替・Claude作の明記フッター・data-reveal用の軽量IntersectionObserver）
- データ
  - `ringo-web/src/data/claude/preview.ts`（パターン定義・営業時間・サービス・地図URL）
- スタイル
  - `ringo-web/src/styles/claude/preview-tokens.css`（`--cp-*` 変数、reveal、reduced-motion対応）
  - `ringo-web/src/styles/claude/themes/`（8テーマ：trust-first-pharmacy / community-care /
    local-editorial / ringo-pop / pharmacy-magazine / wellness-brand / neo-corporate /
    experimental-typography）
- コンポーネント（`ringo-web/src/components/claude/`）
  - `PreviewPatternNav.astro`：試作間の切替ナビ
  - `TateText.astro`：疑似縦書き（1文字ずつ縦積み）。`writing-mode: vertical-rl` は
    環境により縦メトリクスが壊れて文字が重なる事故があるため、確実に描画される方式を採用
- ページ（`ringo-web/src/pages/design-preview/claude/`）
  - `index.astro` ＋ 8パターン各ページ

既存ファイルの変更は無し（本番ページ・共通CSS・`Layout.astro` には手を入れていない）。

## 使用フォント（Google Fonts・差し替え可）

- Community Care：Zen Maru Gothic
- Local Editorial：Shippori Mincho
- Ringo Pop：Mochiy Pop One ＋ M PLUS Rounded 1c
- Pharmacy Magazine：Noto Serif JP ＋ Oswald
- Wellness Brand：Zen Kaku Gothic New ＋ Cormorant Garamond
- Neo Corporate：IBM Plex Sans JP ＋ IBM Plex Mono
- Experimental Typography：Zen Old Mincho
- Trust First は既存の Noto Sans JP のみ（高齢者可読性の基準案）

## 確認チェックリスト（手順書 §8.2）

- [x] `npm run build` が通る（18ページ）
- [x] PC幅（1280px）・スマホ幅（390px）でスクリーンショット確認
- [x] 電話・LINE・地図リンクは全パターンでファーストビュー直下に配置
- [x] 営業時間はヒーロー近くから辿れる（Trust Firstは常時表示バー）
- [x] `prefers-reduced-motion` でマーキー・reveal等を無効化
- [x] 生成画像は未使用（既存写真＋CSS描画のみ）
- [ ] 実機での目視確認（レビュー時にお願いします）

## 未確認事項（手順書 §10 より）

- 採用案の `index.astro` への反映時期。
- デザインプレビューを本番デプロイに含めるか（現状 `noindex` は付与済み）。
- Community Care の道順表現（「大通り沿いに荒川方面へ」）は要事実確認。
