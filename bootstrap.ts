import dotenv from 'dotenv';
import { Server } from './src/server/server';

(() => {
  dotenv.load();
  new Server();
})();
