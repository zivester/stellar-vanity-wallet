# stellar-vanity-wallet

Generate vanity public [Stellar](https://www.stellar.org/) (XLM) wallets from a keyword.

Generate Public, Secret and BIP39 mnemonic seed.


## Install

```bash
$ git clone https://github.com/zivester/stellar-vanity-wallet.git
$ cd stellar-vanity-wallet
$ npm install
```

## Usage

```
node . [-p] [-m] [-s] term
```

 * `-p` prefix - Match only at the beginning of the Public Key.
 * `-m` middle - Match anywhere within the Public Key.
 * `-s` suffix (default) - Match only at the end of the Public Key.


## Run

```bash
$ node . stel
Looking for STEL as a suffix
... this may take a while ...
Public Key: GBH5DN2WVXKQ4LMSSJDD75OYF5MLD6BJT7D2GUIRBZPIFAAESIPCSTEL
Secret Key: SAL46LQXUOQ3RN3VTHNZ43RVCTFK3R5AVK4ICWTB7ZYYNIWBQFFSH6ZF
Mnemonic:   galaxy tuna illness method sword seminar orchard soft moral wild scissors civil ride quarter love length flash dance enjoy brother differ fish desert canvas
```


## Q/A



**Why?**

Create a prefix/suffix to easily identify your wallet.  Easier to remember, harder to mess up.  Don't lose your lumens.

**How Long does this take?**

It varies per machine, but single threaded performance is roughly:

* 1 character, instant
* 2 characters, ~15 seconds
* 3 chracters, 5~10 minutes
* 4 characters, 1-2 hours
* 5+ characters, ... coming soon

**Why are you giving me a mnemonic seed?**

I wanted to be able to generate a Ledger Nano S compatible seed (BIP39 24-word mnemonic).  So I used this to generate a vanity wallet (offline), to load into my Ledger.  **~ This is not recommended if you don't know what you are doing. ~**

**Only single threaded, what is this crap?**

Use `parallel` yo.
