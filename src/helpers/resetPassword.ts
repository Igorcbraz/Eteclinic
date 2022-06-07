export function generatedPassword(){
  const blockedLetters   = ['a', 'c', 'e', 'g', 'i', 'k', 'n', 'p', 'r', 't', 'x'];
  const whiteList        = ['!', '@', '#', '$', '%', '&', '*', '?', '/', '_', '-'];

  let key = (Math.random() + 1).toString(36).substring(2).substring(0, 10);
  
  const newPassword = blockedLetters.map((blockLetter, index) => {
    if( key.search(blockLetter) !== -1 ){
      const letter = key[key.search(blockLetter)];
      key = key.replace(letter, whiteList[index]);

      return key.trim()
    } else {
      return key.trim()
    }
  });

  return newPassword[newPassword.length - 1];
}