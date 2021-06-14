import anvData from './common/config';
import app from './app';

app.listen(anvData.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`App is running on http://localhost:${anvData.PORT}`)
);
