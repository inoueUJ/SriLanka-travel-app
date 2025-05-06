import MainLayout from '@/components/layouts/main-layout';

export default function CurrencyPage() {
  return (
    <MainLayout title="通貨情報" subtitle="スリランカ・ルピーの使い方">
      <div className="p-4">
        <div className="sri-card">
          <h2 className="text-lg font-bold mb-2">通貨情報ページ</h2>
          <p>このページにはスリランカの通貨情報が表示されます。</p>
        </div>
      </div>
    </MainLayout>
  );
}