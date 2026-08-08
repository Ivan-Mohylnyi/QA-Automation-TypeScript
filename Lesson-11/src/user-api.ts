import { UserDto } from './user.dto';

export async function getUserById(id: number): Promise<UserDto> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch user ${id}: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<UserDto>;
}
