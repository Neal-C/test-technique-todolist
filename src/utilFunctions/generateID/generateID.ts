import { nanoid } from 'nanoid';

// export function generateID() : string | number {
// 	return self.crypto.randomUUID();
// }

export function generateID() : string | number {
	return nanoid()
}
