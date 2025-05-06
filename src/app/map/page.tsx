import MainLayout from '@/components/layouts/main-layout';

export default function MapPage() {
  return (
    <MainLayout title="観光情報" subtitle="スリランカの見どころ">
      <div className="p-4">
        <div className="sri-card">
          <h2 className="text-lg font-bold mb-2">観光情報ページ</h2>
          <p>このページにはスリランカの観光情報が表示されます。</p>
        </div>
      </div>
    </MainLayout>
  );
}