import { auth } from 'firebase-functions'
import { getFirestore, serverTimestamp } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'
import type { UserRecord } from 'firebase-functions/v1/auth'

initializeApp()

export const onUserCreate = auth.user().onCreate(async (user: UserRecord) => {
  const db = getFirestore()
  const uid = user.uid
  const email = user.email ?? 'unknown@example.com'

  const defaultUserDoc = {
    uid,
    email,
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    providerId: user.providerData?.[0]?.providerId ?? user.providerId ?? 'password',
    phoneNumber: user.phoneNumber ?? null,
    emailVerified: user.emailVerified ?? false,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    plan: 'free',
    activeSuite: 'Tooling Hero',
    role: 'Viewer',
    teamId: null,
    modules: ['DANG'],
    onboardingComplete: false,
    disabled: false,
    metadata: {
      creationTime: user.metadata.creationTime ?? null,
      lastSignInTime: user.metadata.lastSignInTime ?? null,
    },
  }

  await db.collection('users').doc(uid).set(defaultUserDoc, { merge: true })
})