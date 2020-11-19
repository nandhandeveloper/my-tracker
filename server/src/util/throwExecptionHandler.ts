import { NotFoundException, UnprocessableEntityException, InternalServerErrorException } from "@nestjs/common";

export interface ExemptionType {
    message: string;
    statusCode: number;
}

export const ThrowExeptionHandler = ({ message = 'Something went wrong please try again', statusCode }: ExemptionType) => {
    switch (statusCode) {
        case 404:
            throw new NotFoundException(message);
        case 422:
            throw new UnprocessableEntityException(message);
        default:
            throw new InternalServerErrorException(message);
    }
}