export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { edit }: any = await params;
  return <div className="p-5">Product ID: {edit}</div>;
}
