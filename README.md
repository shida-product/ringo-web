# りんごちゃん薬局 公式ホームページ

月額維持費0円で運用可能かつ、モダンで高品質なデザイン（Astro + Vanilla CSS）を提供する「りんごちゃん薬局」の静的コーポレートサイトプロジェクトです。

---

## 📚 ドキュメント正本（正典）

本プロジェクトの仕様・コンセプト・設計は以下のドキュメントに集約されています。

| 役割 | パス | 内容 |
|---|---|---|
| **コンセプト正本** | [docs/foundation/concept.md](docs/foundation/concept.md) | ブランドコンセプト、キャッチコピー、Web制作イメージ、ブランドガイドライン（カラー・フォント）、SNS方針、店舗基本情報（完全集約マスター版） |
| **技術構造の正本** | [docs/foundation/architecture.md](docs/foundation/architecture.md) | 採用技術（Astro + Vanilla CSS）、レイヤ構造、コンポーネント設計 |
| **プロジェクト憲章** | [docs/foundation/charter.md](docs/foundation/charter.md) | ビジョン、対象ユーザー、体験原則 |
| **現在の開発状況** | [docs/handoff/CURRENT.md](docs/handoff/CURRENT.md) | 最新のタスク状況・引き継ぎ事項 |

---

## 🚀 開発・起動方法

### ローカル開発サーバー起動
```bash
cd ringo-web
npm run dev
```
ブラウザで `http://localhost:4321` にアクセスして動作を確認できます。

### プロダクションビルド
```bash
cd ringo-web
npm run build
```

---

## 📂 プロジェクト構造

```text
ringo-web/
├── docs/                      # ドキュメント類
│   ├── foundation/            # 正本（concept.md, architecture.md, charter.md）
│   ├── handoff/               # 引き継ぎメモ（CURRENT.md, PROGRESS.md）
│   └── setup/                 # 開発・デプロイ手順
└── ringo-web/                 # Astro サイト実装本体
    ├── src/
    │   ├── components/        # UIコンポーネント
    │   ├── layouts/           # ページレイアウト
    │   ├── pages/             # ページ構成
    │   └── styles/            # CSS設計（tokens.css, global.css, themes/）
    └── public/                # 静的アセット
```
