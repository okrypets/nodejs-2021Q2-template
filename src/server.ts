import anvData from './common/config';
import app from './app';
import {tryDBConnect} from "./helpers/db"

tryDBConnect()
  .then(() => {
    app.listen(anvData.PORT, () =>
      console.log(`App is running on http://localhost:${anvData.PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(err)
  });

