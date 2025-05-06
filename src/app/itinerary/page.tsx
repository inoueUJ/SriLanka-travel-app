import MainLayout from '@/components/layouts/main-layout';

export default function ItineraryPage() {
  return (
    <MainLayout title="旅程管理" subtitle="スリランカ旅行の予定">
      <div className="p-4">
        <div className="sri-card">
          <h2 className="text-lg font-bold mb-2">旅程管理ページ</h2>
          <p>このページにはスリランカ旅行の旅程が表示されます。</p>
        </div>
      </div>
    </MainLayout>
  );
}