import { init } from '@instantdb/react';

export const db = init({
  appId: import.meta.env.VITE_INSTANTDB_APP_ID || 'd804383e-841f-4f5e-884d-2b5bc76a6de5',
  devtool: false
});
