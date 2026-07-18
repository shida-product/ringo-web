// サイト内ナビゲーション定義。ヘッダー／モバイルメニューで共通利用する。

export const NAV_ITEMS = [
  { href: '', label: 'ホーム' },
  { href: 'prescription', label: '処方箋の受付' },
  { href: 'generic', label: 'ジェネリック薬' },
  { href: 'products', label: '取扱い商品' },
  { href: 'access', label: '交通案内' },
  { href: 'company', label: '会社案内' },
] as const;

export const withBaseUrl = (baseUrl: string, href: string) => (href ? `${baseUrl}${href}` : baseUrl);
