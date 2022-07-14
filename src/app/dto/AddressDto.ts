import { IsString } from "class-validator";

export class AddressDto {
    @IsString()
    public House: string;
    @IsString()
    public District: string;
    @IsString()
    public State: string;
    @IsString()
    public Zipcode: string;
}