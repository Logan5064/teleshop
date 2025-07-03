import React from 'react';

// Импорт блоков (исправленные импорты)
import HeaderBlock from '@/blocks/HeaderBlock';
import BannerBlock from '@/blocks/BannerBlock';
import ProductsBlock from '@/blocks/ProductsBlock';
import TextBlock from '@/blocks/TextBlock';

// Импорт данных
import {
  headerData,
  mainBannerData,
  categoriesData,
  featuredProductsData,
  subscriptionBannerData,
  recommendedProductsData,
  footerData
} from './data/generalEcommerceData';

const GeneralEcommerceTemplate: React.FC = () => {
  return (
    <div className="w-full max-w-[480px] mx-auto bg-gray-50 min-h-screen md:max-w-[768px]">
      {/* Заголовок с навигацией */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <HeaderBlock
          id="header"
          title={headerData.logo.text}
          subtitle=""
          showSearch={true}
          showCart={true}
          backgroundColor={headerData.styles.backgroundColor}
          textColor={headerData.styles.textColor}
        />
      </div>

      {/* Главный промо-баннер */}
      <div className="p-0">
        <BannerBlock
          id="main-banner"
          title={mainBannerData.title}
          subtitle={mainBannerData.subtitle}
          backgroundColor={mainBannerData.styles.backgroundColor}
          textColor={mainBannerData.styles.textColor}
          buttonText={mainBannerData.ctaButton.text}
        />
      </div>

      {/* Популярные категории */}
      <div className="bg-white mx-3 mt-3 rounded-2xl p-4 shadow-sm animate-fade-in">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Популярные категории
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoriesData.categories.map((category, index) => (
            <div
              key={category.id}
              className="relative rounded-xl overflow-hidden aspect-square cursor-pointer active:scale-95 transition-transform duration-150"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3">
                <h3 className="text-white text-sm font-bold mb-1">
                  {category.name}
                </h3>
                <span className="text-white/80 text-xs">
                  {category.productCount} товаров
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Новинки */}
      <div className="bg-white mx-3 mt-3 rounded-2xl p-4 shadow-sm animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Новинки
          </h2>
          <button className="text-blue-600 text-sm font-medium active:text-blue-800 transition-colors">
            Все →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featuredProductsData.products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden active:scale-95 transition-transform duration-150"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse ${
                    product.badge.includes('%') ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-base font-bold text-gray-900">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="text-yellow-400">★</span>
                    <span>{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount})</span>
                  </div>
                  <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full active:bg-blue-700 transition-colors animate-pulse">
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Баннер подписки */}
      <div className="px-3 py-3">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-center animate-fade-in">
          <h3 className="text-white text-lg font-bold mb-2">
            {subscriptionBannerData.title}
          </h3>
          <p className="text-white/90 text-sm mb-4">
            {subscriptionBannerData.subtitle}
          </p>
          <button className="bg-white text-pink-600 font-semibold px-6 py-2 rounded-full active:bg-gray-100 transition-colors animate-bounce">
            {subscriptionBannerData.ctaButton.text}
          </button>
        </div>
      </div>

      {/* Рекомендуемые товары */}
      <div className="bg-white mx-3 rounded-2xl p-4 shadow-sm animate-fade-in">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Рекомендуем
        </h2>
        <div className="space-y-3">
          {recommendedProductsData.products.map((product, index) => (
            <div
              key={product.id}
              className="flex bg-gray-50 rounded-xl p-3 active:bg-gray-100 transition-colors"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="ml-3 flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-gray-900">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
              </div>
              <button className="ml-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full active:bg-blue-700 transition-colors animate-pulse self-center">
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Футер */}
      <div className="bg-gray-900 text-gray-100 mt-6 rounded-t-3xl animate-fade-in">
        <div className="p-6 text-center">
          <h3 className="text-white text-lg font-bold mb-3">
            {footerData.logo.text}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            {footerData.contacts.phone}
          </p>
          <p className="text-gray-300 text-sm mb-4">
            {footerData.contacts.email}
          </p>
          <p className="text-gray-500 text-xs">
            {footerData.copyright}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GeneralEcommerceTemplate; 