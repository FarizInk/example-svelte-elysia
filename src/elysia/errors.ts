
import { AuthenticationError } from '@/exceptions/AuthenticationError';
import { AuthorizationError } from '@/exceptions/AuthorizationError';
import { InvariantError } from '@/exceptions/InvariantError';
import Elysia from 'elysia';
import { basicErrorHandler } from '@/handlers/ErrorHandler'

export default new Elysia()
    .error('AUTHENTICATION_ERROR', AuthenticationError)
    .error('AUTHORIZATION_ERROR', AuthorizationError)
    .error('INVARIANT_ERROR', InvariantError)
    .onError(({ code, error, set }) => {
        switch (code) {
            case 'AUTHENTICATION_ERROR':
                set.status = 401;
                return basicErrorHandler(error);
            case 'AUTHORIZATION_ERROR':
                set.status = 403;
                return basicErrorHandler(error);
            case 'INVARIANT_ERROR':
                set.status = 400;
                return basicErrorHandler(error);
            case 'NOT_FOUND':
                set.status = 404;
                return basicErrorHandler(error);
            case 'INTERNAL_SERVER_ERROR':
                set.status = 500;
                return basicErrorHandler(error);
            case 'VALIDATION':
                return error.validator.Errors(error.value).First().message;
            default:
                set.status = 500;
                return basicErrorHandler(error);
        }
    })