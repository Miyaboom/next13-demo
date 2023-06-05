# Next.js 13調査
Next.js 13の新機能や、Next.js 11と比較して大きく変わった点をかいつまんでまとめる。
参考 : https://nextjs.org/blog/next-13-4

## Appルーター(Stable)
AppルーターはNext.js 13の新機能です。
- **ディレクトリの変更**
参考 : https://nextjs.org/docs/app/building-your-application/routing
`/pages`ディレクトリではなく`/app`ディレクトリでページの作成およびルーティングを行うようになった。
例 : `/app/<ディレクトリ名＝パス名>/index.tsx`→`/pages/<ディレクトリ名＝パス名>/page.tsx`

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


