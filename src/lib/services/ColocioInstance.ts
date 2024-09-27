import { ColocioImplementation } from '$lib/services/ColocioService';
import type { RequestEvent } from '@sveltejs/kit';

let colocioInstance: ColocioImplementation | null = null;

export function getColocioInstance(event: RequestEvent): ColocioImplementation {
  if (!colocioInstance) {
    colocioInstance = new ColocioImplementation(event);
  }
  return colocioInstance;
}
