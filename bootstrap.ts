import dotenv from 'dotenv';
import { Server } from './src/server/server';

(function() {
  dotenv.load();
  new Server();
})();
