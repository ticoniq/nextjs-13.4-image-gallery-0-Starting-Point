export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw Error("Bazinga");
  return <div>Hello. Next js 13</div>
}