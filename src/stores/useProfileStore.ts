import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AdminType {
  name: string;
  email: string;
  profilePhoto?: string;
  initialPasswordChangeAt: string | null;
  profilePhotoThumbnail?: { url: string };
}

interface State {
  admin: AdminType | null;
  clearProfile: () => void;
}

interface Actions {
  setProfile: (admin: AdminType) => void;
}

export const useProfileStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        admin: null,
        setProfile: (admin) => set({ admin }),
        clearProfile: () => set({ admin: null }),
      }),
      {
        name: 'profile',
      }
    )
  )
);
