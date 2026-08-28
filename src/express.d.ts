import { RequestMetadata } from '@app-types/metadata.ts'

declare global {
    namespace Express {
        interface Request {
            metadata?: RequestMetadata;
        }
    }
}
