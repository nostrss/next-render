import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home({ dataList }) {
  const router = useRouter();
  const onClickItem = (id) => () => {
    router.push(`/${id}`);
  };

  return (
    <>
      {dataList === undefined ? (
        <div>loading...</div>
      ) : (
        <>
          <Head>
            <title>Next.js Rendering Test</title>
            <meta
              name='description'
              content='Next Server Sider Rendering Page'
            />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main>
            <h1>This page is implemented with SSR</h1>
            {dataList?.map((item) => (
              <fieldset
                key={item.id}
                onClick={onClickItem(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <legend>Artwork {item.id}</legend>
                <ul>
                  <li>title : {item.title}</li>
                </ul>
              </fieldset>
            ))}
          </main>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?limit=20`);
  const data = await res.json();
  return {
    props: {
      dataList: data.data,
    },
  };
}
