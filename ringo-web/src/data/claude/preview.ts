// Claude デザイン試作の共通データ
// 営業時間・サービス・パターン一覧をここに集約し、
// 各試作ページはレイアウトだけを自由に変える（見た目の使い回しを防ぐ）

export const PATTERNS = [
  {
    slug: 'trust-first-pharmacy',
    name: 'Trust First Pharmacy',
    short: 'Trust First',
    tag: '本番採用候補',
    concept:
      '院内サインの情報設計。カードを使わず、受付カウンター式の導線・時刻表・番号ステップで「迷わない」を最優先。',
  },
  {
    slug: 'community-care',
    name: 'Community Care',
    short: 'Community Care',
    tag: '本番採用候補',
    concept:
      '会話（吹き出し）でつくるUI。相談のハードルを下げるQ&A構成と、棚メタファーの商品横スクロール。',
  },
  {
    slug: 'local-editorial',
    name: 'Local Editorial',
    short: 'Editorial',
    tag: '表現検証',
    concept: '町の健康情報誌。縦書き見出し・段組・ドロップキャップ・奥付など、誌面の文法で構成。',
  },
  {
    slug: 'ringo-pop',
    name: 'Ringo Pop',
    short: 'Ringo Pop',
    tag: '表現検証',
    concept: '「りんごちゃん」全開のポップ案。マーキー・ステッカー・値札・傾きで店頭POPの楽しさを再現。',
  },
  {
    slug: 'pharmacy-magazine',
    name: 'Pharmacy Magazine',
    short: 'Magazine',
    tag: '表現検証',
    concept: '雑誌の表紙とモザイク特集。コバーライン・特集グリッド・バイヤーズガイドで読ませる。',
  },
  {
    slug: 'wellness-brand',
    name: 'Wellness Brand',
    short: 'Wellness',
    tag: '表現検証',
    concept: 'フルブリード写真と50/50分割。索引番号と細罫、余白で見せるブランド案。',
  },
  {
    slug: 'neo-corporate',
    name: 'Neo Corporate',
    short: 'Neo Corp',
    tag: '表現検証',
    concept: '固定サイドバーの2ペイン構成。数値・仕様表・グリッド罫で「機能する企業サイト」の顔をつくる。',
  },
  {
    slug: 'experimental-typography',
    name: 'Experimental Typography',
    short: 'Typography',
    tag: '完全実験',
    concept: '文字が主役。縦書き・アウトライン文字・極端なスケール差。表現の上限を確認する実験枠。',
  },
] as const;

export type PatternSlug = (typeof PATTERNS)[number]['slug'];

export const HOURS = {
  days: ['月', '火', '水', '木', '金', '土', '日'],
  rows: [
    { time: '9:00〜12:30', open: [true, true, true, true, true, true, true] },
    { time: '12:30〜13:00', open: [true, true, true, true, true, true, false] },
    { time: '13:00〜18:30', open: [true, true, true, true, true, false, false] },
  ],
  summary: [
    { label: '平日', value: '9:00〜18:30' },
    { label: '土曜', value: '9:00〜13:00' },
    { label: '日曜', value: '9:00〜12:30' },
  ],
  holiday: '【定休日】無し',
  holidayNote: '※GW、お盆、年末年始はお休み',
} as const;

export const SERVICES = [
  {
    icon: 'hospital',
    title: '処方箋の受付',
    body: '医療機関で受け取った処方箋にもとづき、お薬をお渡しします。LINEでの事前送信で待ち時間を短縮できます。',
    href: 'prescription',
  },
  {
    icon: 'pill',
    title: 'ジェネリック薬の相談',
    body: 'お薬代を抑えたい方は、ジェネリック医薬品への変更を薬剤師にご相談ください。',
    href: 'generic',
  },
  {
    icon: 'heart-handshake',
    title: '市販薬・健康相談',
    body: 'かぜ薬やビタミン剤の選び方、日々の体調のお悩みなど、お気軽に店頭でご相談ください。',
    href: null,
  },
  {
    icon: 'shopping-bag',
    title: '取扱い商品',
    body: '市販薬やヘルスケア用品を取り扱っています。店頭にない商品もお取り寄せをご相談いただけます。',
    href: 'products',
  },
] as const;

export const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=%E3%82%8A%E3%82%93%E3%81%94%E3%81%A1%E3%82%83%E3%82%93%E8%96%AC%E5%B1%80%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%8D%92%E5%B7%9D%E5%8C%BA%E8%8D%92%E5%B7%9D5-11-18&t=&z=16&ie=UTF8&iwloc=&output=embed';
