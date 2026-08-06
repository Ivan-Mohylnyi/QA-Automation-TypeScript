import { UserDto } from './user.dto';

export class UserSummary {
    public readonly shortBio: string;
    public readonly location: string;
    public readonly geoCoordinatesSum: number;
    public readonly companyTagline: string;

    public constructor(user: UserDto) {
        this.shortBio = `${user.name} (@${user.username}) - ${user.email}`;
        this.location = `${user.address.city}, ${user.address.zipcode}`;
        this.geoCoordinatesSum = Number.parseFloat(user.address.geo.lat) + Number.parseFloat(user.address.geo.lng);
        this.companyTagline = `${user.company.name}: "${user.company.catchPhrase}"`;
    }

    public describe(): string {
        return `${this.shortBio}\nLocation: ${this.location}\nGeo coordinates sum: ${this.geoCoordinatesSum.toFixed(4)}\nWorks at ${this.companyTagline}`;
    }
}
