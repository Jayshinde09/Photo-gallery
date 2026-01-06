import { db } from '../lib/instantdb';
import { id } from '@instantdb/react';

export const addComment = async (imageId, text, userId, username) => {
  try {
    const commentId = id();
    const feedId = id();
    
    await db.transact([
      db.tx.comments[commentId].update({
        imageId,
        text,
        userId,
        username,
        createdAt: Date.now()
      }),
      db.tx.feed_events[feedId].update({
        type: 'comment',
        imageId,
        userId,
        username,
        content: text,
        createdAt: Date.now()
      })
    ]);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
