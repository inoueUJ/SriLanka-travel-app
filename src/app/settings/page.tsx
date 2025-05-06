import MainLayout from '@/components/layouts/main-layout';

export default function SettingsPage() {
  return (
    <MainLayout title="設定" subtitle="アプリの設定">
      <div className="p-4">
        <div className="sri-card">
          <h2 className="text-lg font-bold mb-2">設定ページ</h2>
          <p>このページにはアプリの設定が表示されます。</p>
        </div>
      </div>
    </MainLayout>
  );
}