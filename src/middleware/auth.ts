export default function Auth(key: String) {
  return key !== process.env.API_KEY;
}
