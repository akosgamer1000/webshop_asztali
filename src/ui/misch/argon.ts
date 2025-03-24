
//

//import * as argon2 from 'argon2';

//const DEFAULT_OPTIONS = {
 // type: argon2.argon2id,
  ////memoryCost: 65536,
 // timeCost: 3,
  //parallelism: 4,
  //hashLength: 32
//};


//let isArgon2Ready = false;

//try {

 // argon2.hash('test', DEFAULT_OPTIONS).then(() => {
 //   isArgon2Ready = true;
 // });
//} catch (error) {
 // console.error('Argon2 initialization failed:', error);
//}

//export const verifyArgon2Hash = async (password: string, hashString: string): Promise<boolean> => {
 // if (!isArgon2Ready) {
 //   throw new Error('Argon2 is not properly initialized');
 // }
 // try {
  //  if (!password || !hashString) return false;
  //  return await argon2.verify(hashString, password);
  //} catch (error) {
  //  console.error('Hash verification failed:', error);
  //  return false;
  //}
//};

//export const generateArgon2Hash = async (password: string): Promise<string> => {
 //// if (!isArgon2Ready) {
   // throw new Error('Argon2 is not properly initialized');
 // }
 // try {
 //   if (!password) throw new Error('Password is required');
 //   return await argon2.hash(password, DEFAULT_OPTIONS);
  //} catch (error) {
  //  console.error('Hash generation failed:', error);
  //  throw new Error('Failed to generate password hash');
  ////}
//};