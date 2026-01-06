import { db } from '../lib/instantdb';
import { id } from '@instantdb/react';

export const addReaction = async (imageId, emoji, userId, username) => {
  try {
    const reactionId = id();
    const feedId = id();
    
    await db.transact([
      db.tx.reactions[reactionId].update({
        imageId,
        emoji,
        userId,
        username,
        createdAt: Date.now()
      }),
      db.tx.feed_events[feedId].update({
        type: 'reaction',
        imageId,
        userId,
        username,
        content: emoji,
        createdAt: Date.now()
      })
    ]);
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
};
