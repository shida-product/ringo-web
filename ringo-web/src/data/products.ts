// 商品情報の型定義とサンプルデータ
// 後日、microCMS の products API 取得結果へ差し替えやすい形に寄せています。
// 現在の価格・説明文は公開前のダミーです。正式掲載時は薬局側で確認した内容へ更新してください。

export type ProductCategory = '胃腸薬' | 'かぜ薬' | 'ビタミン・栄養';

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  medClass: string;
  maker?: string;
  price?: number;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  imageAlt?: string;
  summary: string;
  description?: string;
  ingredients?: string;
  usage?: string;
  caution?: string;
  order?: number;
  revisedAt: string;
};

export const products: Product[] = [
  {
    id: 'sample-miragreen',
    name: 'ミラグレーン（サンプル）',
    slug: 'miragreen',
    category: '胃腸薬',
    medClass: '第2類医薬品',
    maker: 'サンプル製薬',
    price: 1980,
    summary: '荒川区・町屋のりんごちゃん薬局で取扱い予定の商品サンプルです。胃腸の不調が気になる方向けの紹介枠です。',
    description: '商品の特徴やおすすめの相談シーンを掲載するためのサンプル本文です。実際に公開する際は、承認された効能効果の範囲内で正式な情報へ差し替えます。',
    ingredients: 'サンプル成分A、サンプル成分B（正式掲載時に確認）',
    usage: '添付文書をよく読み、用法・用量を守ってご使用ください。',
    caution: '服用中のお薬がある方、妊娠中・授乳中の方、持病のある方は薬剤師へご相談ください。',
    order: 1,
    revisedAt: '2026-07-18T00:00:00.000Z',
  },
  {
    id: 'sample-cold-medicine',
    name: '総合かぜ薬（サンプル）',
    slug: 'cold-medicine',
    category: 'かぜ薬',
    medClass: '指定第2類医薬品',
    maker: 'サンプルファーマ',
    summary: '発熱・のど・鼻など、かぜ症状の相談時にご案内する商品枠のダミーデータです。',
    description: 'かぜ薬は症状や体質、服用中のお薬によって選び方が変わります。店頭では薬剤師・登録販売者が状況を伺いながらご案内します。',
    usage: '年齢や症状に合わせ、添付文書の記載に従ってください。',
    caution: '眠気が出る成分を含む場合があります。運転前の服用可否などは店頭でご確認ください。',
    order: 2,
    revisedAt: '2026-07-18T00:00:00.000Z',
  },
  {
    id: 'sample-vitamin-c',
    name: 'ビタミンC錠（サンプル）',
    slug: 'vitamin-c',
    category: 'ビタミン・栄養',
    medClass: '第3類医薬品',
    maker: 'サンプルヘルスケア',
    price: 1280,
    summary: '毎日の栄養補給や体調管理を相談したい方向けの商品紹介サンプルです。',
    description: '生活習慣や食事内容に合わせた栄養補助の相談枠です。正式公開時は商品の表示内容に沿って説明を整えます。',
    ingredients: 'アスコルビン酸ほか（サンプル）',
    usage: '用法・用量を守ってご使用ください。',
    caution: '体質に合わない場合は使用を中止し、医師・薬剤師へご相談ください。',
    order: 3,
    revisedAt: '2026-07-18T00:00:00.000Z',
  },
];

export const getAllProducts = () => [...products].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const formatPrice = (price?: number) =>
  typeof price === 'number' ? `${price.toLocaleString('ja-JP')}円（税込）` : '店頭にてご確認ください';

export const productImageAlt = (product: Product) => product.imageAlt ?? `荒川区の薬局 ${product.name}`;
