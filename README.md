# Next.js 13調査
Next.js 13の新機能や、Next.js 11と比較して大きく変わった点をかいつまんでまとめる。
参考 : https://nextjs.org/blog/next-13-4

## Appルーター(Stable)
AppルーターはNext.js 13の新機能です。
- **ルーティング**
参考 : https://nextjs.org/docs/app/building-your-application/routing
参考 : https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
`/pages`ディレクトリではなく`/app`ディレクトリでページの作成およびルーティングを行う。
	- `/post`の場合 `/pages/post/index.tsx`→`/app/post/page.tsx`
	-  `/post/[slug]`の場合  `/pages/post/[slug].tsx`→`/app/post/[slug]/page.tsx`

- **レイアウト**
参考 : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
レイアウトは、複数のページで使用する共通UIを提供する。レイアウトを作成した階層内のページに適用される。

	- 以下のように`(ディレクトリ名)`とした場合、ルーティングに影響しない。また、この場合は`(default)`直下に`page.tsx`があるため、`(auth)`直下に`page.tsx`を置くとエラーになる。
		````
		app
		├── (auth)
		│ 	├── layout.tsx
		│ 	├── signup
		│ 	│   ├── layout.tsx
		│ 	│   └── page.tsx　#URLは'/signup'となり(auth)直下とsignup直下のレイアウトが適用される
		│   ...
		└── (default)
		    ├── layout.tsx
		    ├── page.tsx　#URLは'/'となり(default)直下のレイアウトが適用される
		    ...
		````



- **Reactサーバーコンポーネント**
参考 : https://nextjs.org/docs/getting-started/react-essentials
Reactコンポーネントがサーバーサイドでレンダリングされるようなった。これによって最初のページロードが速くなり、クライアントサイドのJavaScriptバンドルサイズが小さくなることが期待される。
hooksなど、クライアントサイドでインタラクティブに動作するコンポーネントを使用する場合は、ファイルの先頭に`use client`と記述する必要がある。

- **簡略化されたデータ取得**
参考 : https://nextjs.org/blog/next-13-4#only-javascript-everything-is-a-function
これまでSSGやSSRでは`getStaticProps`や`getServerSideProps`内でデータ取得を行なっていたが、Next.js 13では以下のようにサーバーコンポーネント内でそのまま`fetch`APIが使用できる。
	````jsx
	export default async function Page() {
	  const res = await fetch('https://api.example.com/...');
	  const data = res.json();
	  return '...';
	}
	````

- **リンクとナビゲーション**
参考 : https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
	- Linkコンポーネント内にaタグを記述する必要がなくなった。
		````jsx
		<Link href={`/post/${post.slug}`}>{post.title}</Link>
		````
	- useRouterは`next/router`ではなく`next/navigation`から読み込むようになった。新しいuseRouterでは`router.events`が廃止されている。関連 : https://github.com/vercel/next.js/discussions/41934

# Next.jsでGA4・GTM対応
`next/link`を使用する場合、ブラウザによるページ遷移を行わないため計測に影響がある。GA4およびGTMの設定変更が必要。

## GA4 計測設定の変更
GA4のダッシュボードで以下のように設定することで、URLが変化した時に`page_view`イベントが発火し、ページ遷移時にPV計測できる。
```
「管理」　>　「データストリーム」　>　「拡張計測機能」をON
```

## GTM Datalayer
ページ遷移時にDatalayerにページのカスタム情報を送りたい場合、`next/navigation`の`usePathname`を使用し、`useEffect`でパスの変更をトリガーする。
※Next 13以前は`next/router`の`router.events`でトリガーしていた。
````jsx
export default function usePageView() {
 const pathName = usePathname();
  useEffect(() => {
   if (pathName) {
    window.dataLayer.push({
     event: 'event_name',
     custom_param: 'custom_value'
    });
   }
 }, [pathName]);
}
````


