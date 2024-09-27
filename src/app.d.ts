// See https://kit.svelte.dev/docs/types#app

import { SupabaseClient, type Session, type User } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import type { Entity, UserProfile } from '$types/database';
import type { ColocioImplementation } from '$lib/services/ColocioService';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      // supabase: SupabaseClient<Database>;
      // currentUser: UserProfile | null;
      // activeEntity: Entity | null;
      colocio: ColocioImplementation;
      // getSession(): Promise<Session | null>;
      // safeGetSession(): Promise<Session | null, UserResponse | null>;
      // safeGetSession(): Promise<{ session: Session | null; user: User | null }>
    }
    interface PageData {
      // session: Session | null
      // user: User | null
    }
    // interface Platform {}
  }

  declare type Item = import('svelte-dnd-action').Item;
  declare type DndEvent<ItemType = Item> =
    import('svelte-dnd-action').DndEvent<ItemType>;
  declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:consider'?: (
        event: CustomEvent<DndEvent<ItemType>> & {
          target: EventTarget & T;
        }
      ) => void;
      'on:finalize'?: (
        event: CustomEvent<DndEvent<ItemType>> & {
          target: EventTarget & T;
        }
      ) => void;
    }
  }
}

export {};
