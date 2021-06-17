import anvData from './common/config';
import app from './app';
import {tryDBConnect} from "./helpers/db"

tryDBConnect(() => {
  app.listen(anvData.PORT, () =>
  console.log(`App is running on http://localhost:${anvData.PORT}`)
);
})

