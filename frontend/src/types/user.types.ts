export type TUser = {
  user_id: string;
  fullname: string;
  email: string;
  avatar: string | null;
  created_at: string;
  isOnline?: boolean;
  lastSeen?: string;
};
