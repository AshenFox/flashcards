import { type RefObject, useSyncExternalStore } from "react";

export type PullOptions = {
  elementRef: RefObject<HTMLElement | null>;
  tippingPoint: boolean;
  enabled: boolean;
  blendDistancePx: number;
};

export type OwnerId = number;

let nextId = 0;
const owners = new Map<OwnerId, PullOptions>();
const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach(l => l());
};

export const registerOwner = (opts: PullOptions): OwnerId => {
  const id = ++nextId;
  owners.set(id, opts);
  emit();
  return id;
};

export const updateOwner = (id: OwnerId, opts: PullOptions) => {
  // Re-insert so the caller remains the most recent entry in iteration order.
  owners.delete(id);
  owners.set(id, opts);
  emit();
};

export const unregisterOwner = (id: OwnerId) => {
  if (owners.delete(id)) emit();
};

const getActiveOptions = (): PullOptions | null => {
  if (owners.size === 0) return null;
  let last: PullOptions | null = null;
  for (const opts of owners.values()) last = opts;
  return last;
};

const getHasActiveOwner = (): boolean => owners.size > 0;

const subscribeOwners = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const getActiveOptionsServer = (): PullOptions | null => null;
const getHasActiveOwnerServer = (): boolean => false;

export const useActiveOwnerOptions = (): PullOptions | null =>
  useSyncExternalStore(
    subscribeOwners,
    getActiveOptions,
    getActiveOptionsServer,
  );

export const useHasActiveOwner = (): boolean =>
  useSyncExternalStore(
    subscribeOwners,
    getHasActiveOwner,
    getHasActiveOwnerServer,
  );
