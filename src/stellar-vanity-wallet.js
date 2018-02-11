#!/usr/bin/env node

import StellarHDWallet from 'stellar-hd-wallet';

const PUBLIC_KEY_LENGTH = 56;


const args = process.argv.slice(2);

// If it's only one argument, default to suffix
if (args.length === 1) {
	args.unshift('-s');
}

const usage = () => {
	console.error(`Usage:\n\tstellar-vanity-wallet [-p] [-m] [-s] term`);
	process.exit(1);
};

// Only alphanumeric seeds are valid
const isValidTerm = (arg) => (/^[A-Z0-9]+$/.test(arg));

// Each argument must have a term to search for
if (args.length % 2 !== 0) {
	usage();
}


// Success must satisfy all match functions
const matchFunctions = [];
let matchWhere = [];


for (let i = 0; i < args.length; i += 2) {
	const flag = args[i];
	const word = args[i + 1].toUpperCase();

	if (!isValidTerm(word)) {
		usage();
	}

	switch(flag) {
		// prefix
		case '-p': {
			// Prefixes must begin with A,B,C,D. Anything else is impossible
			if (['A','B','C','D'].indexOf(word[0]) === -1) {
				console.error(`Prefix searches must begin with A, B, C or D.`);
				process.exit(1);
			}
			matchFunctions.push(((word) => (key) => (key.indexOf(word) === 1))(word));
			matchWhere.push(`${word} as a prefix`);
			break;
		}
		// anywhere
		case '-m': {
			matchFunctions.push(((word) => (key) => (key.indexOf(word) !== -1))(word));
			matchWhere.push(`${word} anywhere`);
			break;
		}
		// suffix
		case '-s': {
			matchFunctions.push(((word, suffixIndexMatch) => (key) => (key.indexOf(word) === suffixIndexMatch))(word, PUBLIC_KEY_LENGTH - word.length));
			matchWhere.push(`${word} as a suffix`);
			break;
		}
		default: {
			usage();
			break;
		}
	}
}



console.log(`Looking for ${matchWhere.join(', ')}`);
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

	if (matchFunctions.every(fn => fn(publicKey))) {
		found = true;
	}
}


const secretKey = wallet.getSecret(0);

console.log(`Public Key: ${publicKey}`);
console.log(`Secret Key: ${secretKey}`);
console.log(`Mnemonic:   ${mnemonic}`);
