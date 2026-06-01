import { getPostWithPromises } from './promises.js';
import { getPostWithAsyncAwait } from './async-await.js';
import { getDataWithFallback } from './try-catch.js';

console.log('=== PROMISES ===');
getPostWithPromises();

setTimeout(() => {
    console.log('\n=== ASYNC / AWAIT ===');
    getPostWithAsyncAwait();
}, 2000);

setTimeout(() => {
    console.log('\n=== TRY / CATCH ===');
    getDataWithFallback();
}, 4000);
