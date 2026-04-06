# 開発環境のセットアップ

## 必須要件
- Node.js (バージョン20以上推奨)

## ローカルサーバーの起動手順

1. Astroプロジェクトのディレクトリに移動します。
   ```bash
   cd ringo-web
   ```
2. 依存パッケージをインストールします。（初回のみ）
   ```bash
   npm install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
4. ブラウザで `http://localhost:4321` にアクセスし、画面を確認してください。

## 本番用ビルド成果物の生成
```bash
cd ringo-web
npm run build
```
コマンド実行後、`ringo-web/dist` に静的ファイルが出力されるため、これをFTP等でホスティングサーバーにアップロードします。
