export default function getQuery(q: any) {
  const searchParams = q.nextUrl.searchParams;
  return searchParams.get("api_key");
}
