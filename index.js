const StellarHDWallet = require('stellar-hd-wallet');


const args = process.argv.slice(2);

// Only alphanumeric seeds are valid
const words = args.filter(arg => /^[a-z0-9]+$/i.test(arg));

if (words.length != 1) {
	console.error(`Usage: node . [-p] [-m] [-s] term`);
	process.exit(1);
}

const word = words[0].toUpperCase();


// -s suffix (default)
let regex = new RegExp(`${word}$`);
let where = 'as a suffix';

// -p prefix
if (args.find(arg => arg === '-p')) {
	regex = new RegExp(`^G${word}`);
	where = 'as a prefix';
// -m middle
} else if (args.find(arg => arg === '-m')) {
	regex = new RegExp(word);
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
	if (regex.test(publicKey)) {
		found = true;
	}
}


const secretKey = wallet.getSecret(0);

console.log(`Public Key: ${publicKey}`);
console.log(`Secret Key: ${secretKey}`);
console.log(`Mnemonic:   ${mnemonic}`);
