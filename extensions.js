// Create your own JSBot extensions! Write functions in the format below, and they
// can be used in bot commands! They are still beholdent to the 1 second
// evaluation rule. Write functions and sign them with your Kerberos. Enjoy!

// Meme text generator by Cameron Kleiman (ckleiman@mit.edu)
exports.memeText = (str) => {
  return str.split("").map((x,i) => {if(i % 2 === 0) return x.toUpperCase(); else return x.toLowerCase();}).join("");
};
