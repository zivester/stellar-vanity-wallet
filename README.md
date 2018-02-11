# stellar-vanity-wallet

Generate vanity public [Stellar](https://www.stellar.org/) (XLM) wallets from a keyword.

Generate Public, Secret and BIP39 mnemonic seed.


## Install

```bash
$ npm install -g stellar-vanity-wallet
```

## Usage

```bash
$ stellar-vanity-wallet [-p] [-m] [-s] term
```

 * `-p` prefix - Match only at the beginning of the Public Key. (please see limitations below)
 * `-m` middle - Match anywhere within the Public Key.
 * `-s` suffix (default) - Match only at the end of the Public Key.

### Note about prefixes

Stellar public keys always being with the letter `G`.  The second letter can only be an `A`, `B`, `C` or `D`.  The prefix match for this tool looks for the prefix *after* the beginning `G`.

So if you would like to look for the prefix `GAME`, run the tool looking for `AME`, and you will end up with a public key that starts with `GAME`.

Another example, if you look for a prefix `DOG`, your public key will start with `GDOG`.

## Run

```bash
$ stellar-vanity-wallet stel
Looking for STEL as a suffix
... this may take a while ...
Public Key: GBH5DN2WVXKQ4LMSSJDD75OYF5MLD6BJT7D2GUIRBZPIFAAESIPCSTEL
Secret Key: SAL46LQXUOQ3RN3VTHNZ43RVCTFK3R5AVK4ICWTB7ZYYNIWBQFFSH6ZF
Mnemonic:   galaxy tuna illness method sword seminar orchard soft moral wild scissors civil ride quarter love length flash dance enjoy brother differ fish desert canvas
```


## Q/A



**Why?**

Create a prefix/suffix to easily identify your wallet.  Easier to remember, harder to mess up.  Don't lose your lumens.

**How long does this take?**

It varies per machine, but single threaded performance is roughly:

* 1 character, instant
* 2 characters, ~15 seconds
* 3 characters, 5~10 minutes
* 4 characters, 1-2 hours
* 5+ characters, ... coming soon

**Why are you giving me a mnemonic seed?**

I wanted to be able to generate a Ledger Nano S compatible seed (BIP39 24-word mnemonic).  So I used this to generate a vanity wallet (offline), to load into my Ledger.

**Only single threaded, what is this crap?**

Use other tools for that.

```bash
# Run on 4 threads
$ seq 4 | parallel -j 4 -n 0 --lb "stellar-vanity-wallet stel"
```
