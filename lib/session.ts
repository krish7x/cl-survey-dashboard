import { IGoogleUser } from '@/types';
import { TokenSet, getServerSession } from 'next-auth';

export const session = async ({
  session,
  token,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  token: TokenSet;
}) => {
  if (session.user) {
    session.user.id = token.id;
  }
  return session;
};

export const getUserSession = async (): Promise<IGoogleUser> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};
