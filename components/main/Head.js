import Next_head from 'next/head';

export default function Head() {
  return (
    <Next_head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width initial-scale=1' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='../img/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='../img/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='../img/favicon-16x16.png'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alata&display=swap'
        rel='stylesheet'
      />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap'
        rel='stylesheet'
      />
      <title>Flash Cards</title>
    </Next_head>
  );
}
