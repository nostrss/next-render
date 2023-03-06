import Head from 'next/head';

export default function Detail({ detailData }) {
  return (
    <>
      <h1>This page is implemented with SSG.</h1>
      {detailData === undefined ? (
        <div>loading...</div>
      ) : (
        <>
          <Head>
            <title>{detailData?.title}</title>
            <meta name='description' content={detailData?.title} />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main>
            {detailData && (
              <fieldset>
                <legend>{detailData?.title}</legend>
                <img
                  src={`https://www.artic.edu/iiif/2/${detailData.image_id}/full/400,/0/default.jpg`}
                  alt={detailData.title}
                />
                <li>history : {detailData.publication_history}</li>
              </fieldset>
            )}
          </main>
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '14556' } },
      { params: { id: '11434' } },
      { params: { id: '16487' } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `https://api.artic.edu/api/v1/artworks/${id}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return {
    props: {
      detailData: data.data,
    },
  };
}
