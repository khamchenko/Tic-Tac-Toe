import app from './app';
import { PORT } from '../config';

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});
