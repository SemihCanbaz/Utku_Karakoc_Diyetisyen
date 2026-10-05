import assert from 'node:assert/strict';
import { legacyAuthTokens } from '../lib/portal/auth-links.ts';
for (const type of ['invite','recovery']) {
 assert.deepEqual(legacyAuthTokens(`#access_token=access&refresh_token=refresh&type=${type}`),{access_token:'access',refresh_token:'refresh'});
}
for (const fragment of ['', '#overview', '#access_token=x&type=invite', '#access_token=x&refresh_token=y&type=signup', '#error=expired', `#access_token=${'x'.repeat(12001)}&refresh_token=y&type=recovery`]) assert.equal(legacyAuthTokens(fragment), null);
console.log('PASS: invitation/recovery fragments accepted; unrelated, incomplete and oversized fragments rejected.');
