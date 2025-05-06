import MainLayout from '@/components/layouts/main-layout';

export default function LanguagePage() {
  return (
    <MainLayout title="言語フレーズ" subtitle="シンハラ語の便利な表現">
      <div className="p-4">
        <div className="sri-card">
          <h2 className="text-lg font-bold mb-2">言語フレーズページ</h2>
          <p>このページにはスリランカの言語フレーズが表示されます。</p>
        </div>
      </div>
    </MainLayout>
  );
}