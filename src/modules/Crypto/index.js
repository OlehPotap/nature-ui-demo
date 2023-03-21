const bip39 = require("bip39");
const tweetnacl = require("tweetnacl");
const slip10 = require("ed25519-hd-key");
// const { sha256 } = require("js-sha256");

class Crypto {
  static generateMnemonic() {
    return bip39.generateMnemonic(256);
  }

  /**
   * Returns keypair (Private Key, Public key)
   * @param {string} mnemonic - Mnemonic in string format from bip39
   * @param {string} bip32Path - BIP32Path in string format. Default: "m/0'"
   * @returns {[string, string]} - keypair as a tuple of two strings (private key, public key)
   */
  static generateKeypair(mnemonic, bip32Path = "m/0'") {
    if (!bip39.validateMnemonic(mnemonic)) {
      return false;
    }
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const derivedKey = slip10.derivePath(bip32Path, seed.toString("hex"));
    const keypair = tweetnacl.sign.keyPair.fromSeed(
      Buffer.from(derivedKey.key, "hex")
    );
    let publicKey = `NATURE${Buffer.from(keypair.publicKey).toString("hex")}`;
    let privateKey = Buffer.from(keypair.secretKey)
      .subarray(0, 32)
      .toString("hex");

    return { privateKey, publicKey };
  }

  /**
   * Returns the signature of a given message using a given private key.
   * @param {string} message - The message to sign
   * @param {string} privateKey - The private key as a hex-encoded string
   * @returns {string} - The signature as a hex-encoded string
   */
  static sign(message, privateKey) {
    const secretKey = Buffer.from(privateKey, "hex");
    const keypair = tweetnacl.sign.keyPair.fromSeed(secretKey);
    const signature = tweetnacl.sign(
      Buffer.from(message, "utf8"),
      keypair.secretKey
    );
    return Buffer.from(signature).subarray(0, 64).toString("hex");
  }

  /**
   * Returns true if a given signature is valid for a given message and public key.
   * @param {string} expectedMessage - The expected message
   * @param {string} signature - The signature as a hex-encoded string
   * @param {string} publicKey - The public key as a hex-encoded string (with "NATURE" prefix)
   * @returns {boolean} - True if the signature is valid, false otherwise
   */
  static isValid(expectedMessage, signature, publicKey) {
    const publicKeyBytes = Buffer.from(publicKey.slice(6), "hex"); // remove "NATURE" prefix
    const signatureBytes = Buffer.from(signature, "hex");
    return tweetnacl.sign.detached.verify(
      Buffer.from(expectedMessage, "utf8"),
      signatureBytes,
      publicKeyBytes
    );
  }
}

let mnem = Crypto.generateMnemonic();
mnem = mnem + "acab";
console.log("MNEM: ", mnem);
let keypair = Crypto.generateKeypair(mnem);
console.log("KP: ", keypair);
let message = "Hello world!";
let sign = Crypto.sign(message, keypair.privateKey);
console.log("S: ", sign);
let is_valid = Crypto.isValid(message, sign, keypair.publicKey);
console.log(`VALID?: ${is_valid}`);
