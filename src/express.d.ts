import { RequestMetadata } from '@types/metadata.ts'

declare global {
    namespace Express {
        interface Request {
            metadata?: RequestMetadata;
        }
    }
}
