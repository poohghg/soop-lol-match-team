import { SocketManager } from '@/src/shared/lib/webSocket/model/SocketManager';
import { KeyExtractor } from '@/src/shared/lib/webSocket/model/type';

const socketManagerStore = new Map<string, SocketManager>();

export function getSocketManager(url: string, keyExtractor: KeyExtractor): SocketManager {
  if (!socketManagerStore.has(url)) {
    socketManagerStore.set(
      url,
      new SocketManager({ url, keyExtractor, debug: process.env.NODE_ENV === 'development' })
    );
  }
  return socketManagerStore.get(url)!;
}

export function removeManagerFromCache(url: string) {
  if (socketManagerStore.has(url)) {
    socketManagerStore.delete(url);
  }
}
