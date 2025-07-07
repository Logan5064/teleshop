'use client';

import Link from 'next/link';
import { useUser } from '@/lib/contexts/UserContext';

export default function UserCard() {
  const { user, profile, loading } = useUser();

  if (loading) {
    return (
      <div className="p-6 border-t border-gray-300/60">
        <div className="animate-pulse flex items-center p-4 rounded-xl bg-gray-100/60 border border-gray-300/50">
          <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Определяем отображаемое имя
  const displayName = profile?.username || profile?.first_name || user?.username || user?.first_name || 'Max';
  
  // Определяем первую букву для аватара
  const avatarLetter = (profile?.username || profile?.first_name || user?.username || user?.first_name || 'M').charAt(0).toUpperCase();

  return (
    <div className="p-6 border-t border-gray-300/60">
      <Link
        href="/profile"
        className="flex items-center p-4 rounded-xl bg-gray-100/60 border border-gray-300/50 shadow-sm hover:bg-gray-200/60 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div className="flex-shrink-0">
          {profile?.photo_url ? (
            <img 
              src={profile.photo_url} 
              alt={displayName}
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">
                {avatarLetter}
              </span>
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-semibold text-gray-900 tracking-wide">
            {displayName}
          </p>
          <p className="text-xs text-gray-600 font-medium">
            ID: {user?.telegram_id || '422752975'}
          </p>
        </div>
        <div className="ml-2">
          <div className={`w-2 h-2 rounded-full ${user?.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        </div>
      </Link>
    </div>
  );
} 
