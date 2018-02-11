#!/usr/bin/env node

import StellarHDWallet from 'stellar-hd-wallet';

const PUBLIC_KEY_LENGTH = 56;



const args = process.argv.slice(2);

// Only alphanumeric seeds are valid
const words = args.filter(arg => /^[a-z0-9]+$/i.test(arg));

// We need exactly one word to search for
if (words.length != 1) {
	console.error(`Usage:\n\tstellar-vanity-wallet [-p] [-m] [-s] term`);
	process.exit(1);
}

const word = words[0].toUpperCase();
const suffixIndexMatch = PUBLIC_KEY_LENGTH - word.length;


// -s suffix (default)
let isMatch = (key) => (key.indexOf(word) === suffixIndexMatch);
let where = 'as a suffix';

// -p prefix
if (args.find(arg => arg === '-p')) {
	isMatch = (key) => (key.indexOf(word) === 1);
	where = 'as a prefix';
// -m middle
} else if (args.find(arg => arg === '-m')) {
	isMatch = (key) => (key.indexOf(word) !== -1);
	where = 'anywhere';
}


console.log(`Looking for ${word} ${where}`);
console.log(`... this may take a while ...`);

let found = false;
let mnemonic;
let wallet;
let publicKey;

while(!found) {
	mnemonic = StellarHDWallet.generateMnemonic();
	wallet = StellarHDWallet.fromMnemonic(mnemonic);
	publicKey = wallet.getPublicKey(0);
	// console.log('checking', publicKey);
	if (isMatch(publicKey)) {
		found = true;
	}
}


const secretKey = wallet.getSecret(0);

console.log(`Public Key: ${publicKey}`);
console.log(`Secret Key: ${secretKey}`);
console.log(`Mnemonic:   ${mnemonic}`);
