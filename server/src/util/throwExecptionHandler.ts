import { NotFoundException, UnprocessableEntityException, InternalServerErrorException } from "@nestjs/common";

export interface ExemptionType {
    message: string;
    status: number;
}
export const FALLBACK_MESSAGE  = 'Something went wrong. Please try again';
export const ThrowExeptionHandler = ({ message = FALLBACK_MESSAGE, status }: ExemptionType) => {
    switch (status) {
        case 404:
            throw new NotFoundException(message);
        case 422:
            throw new UnprocessableEntityException(message);
        default:
            throw new InternalServerErrorException(FALLBACK_MESSAGE);
    }
}