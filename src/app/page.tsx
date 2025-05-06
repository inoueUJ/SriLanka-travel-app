import MainLayout from '@/components/layouts/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <div className="p-4">
        {/* ウェルカムカード */}
        <div className="sri-gradient rounded-lg p-4 mb-4 shadow">
          <h2 className="text-xl font-bold mb-2">アーユボーワン！</h2>
          <p>スリランカ旅行オフラインガイドへようこそ</p>
          <p className="text-sm mt-2 opacity-80">オフラインでも使える旅行情報アプリです</p>
        </div>
        
        {/* クイックアクセス */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {[
            { title: '通貨情報', icon: '💰', href: '/currency', color: 'border-l-4 border-[var(--spice-orange)]' },
            { title: '言語フレーズ', icon: '🗣️', href: '/language', color: 'border-l-4 border-[var(--ocean-blue)]' },
            { title: '観光スポット', icon: '🗺️', href: '/map', color: 'border-l-4 border-[var(--tea-green)]' },
            { title: '旅程チェック', icon: '✅', href: '/itinerary', color: 'border-l-4 border-[var(--lion-gold)]' },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-3 shadow flex flex-col items-center ${item.color}`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-center font-medium">{item.title}</div>
            </div>
          ))}
        </div>
        
        {/* 為替レート */}
        <div className="sri-card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">今日の為替レート</h3>
            <span className="text-[var(--spice-orange)]">更新済</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 p-2 rounded flex-1 text-center mr-2 border-l-4 border-[var(--tea-green)]">
              <div className="text-xs text-gray-600">日本円 → ルピー</div>
              <div className="font-bold">1 JPY = 2.11 LKR</div>
            </div>
            <div className="bg-gray-100 p-2 rounded flex-1 text-center border-l-4 border-[var(--spice-orange)]">
              <div className="text-xs text-gray-600">ルピー → 日本円</div>
              <div className="font-bold">1 LKR = 0.47 JPY</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}