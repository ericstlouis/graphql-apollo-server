import {UserList, MovieList} from "../FakeData"
import _ from "lodash"

interface Movie {
    id: number;
    name: string;
    yearOfPublication: number;
    isInTheaters: boolean;
}

interface UserType {
    id: number;
    name: string;
    username: string;
    age: number;
    nationality: string;
    friends?: [UserType];
    favoriteMovies?: [Movie];
}
 
interface UserType {
    newName: string;
    newUserName: string;
    age: number;
}

//resolvers are basically the way graphql access and handles data
export const resolvers = {

//Query resolvers
    Query: {
    //User Resolvers
        users:() => {
            return UserList
        },
        user: (_parent: any, args: { id: number} ) => {
            const inputId = args.id;
            const user = _.find(UserList, { id: Number(inputId) });
            return user
        },
    //Movie Resolvers
        movies: () => {
            return MovieList
        },

        movie: (_parent: any, args: { name: string } ) => {
            const movieName = args.name;
            const Movie = _.find(MovieList, {name: String(movieName)});
            return Movie
        },
    }, 

//Type Resolvers
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.yearOfPublication>=2000 && movie.yearOfPublication <=2010)
        }
    },

//Mutations
    Mutation: {
        createUser: (_parents: any, args: {input: UserType}) => {
            const user = args.input
            const lastId = UserList[UserList.length - 1 ].id
            user.id = lastId + 1
            UserList.push(user)
            console.log(user)
            return user
        },

        updateUserName: (_parents: any, args: {input: UserType}) => {
            const {id, newUserName} = args.input
            let userUpdated
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUserName
                    userUpdated = user
                }
            });
            console.log(userUpdated)
            return userUpdated
        },

        deleteUser: (_parents: any, args: {id: number}) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id))
            return null
        }
    }
}