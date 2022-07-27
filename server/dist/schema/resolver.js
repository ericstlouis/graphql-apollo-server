"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const FakeData_1 = require("../FakeData");
const lodash_1 = __importDefault(require("lodash"));
exports.resolvers = {
    Query: {
        users: (_parent, _args, context) => {
            console.log(context);
            return FakeData_1.UserList;
        },
        user: (_parent, args) => {
            const inputId = args.id;
            const user = lodash_1.default.find(FakeData_1.UserList, { id: Number(inputId) });
            return user;
        },
        movies: (_parent, _args, _context, info) => {
            console.log(info);
            return FakeData_1.MovieList;
        },
        movie: (_parent, args) => {
            const movieName = args.name;
            const Movie = lodash_1.default.find(FakeData_1.MovieList, { name: String(movieName) });
            return Movie;
        },
    },
    User: {
        favoriteMovies: (_parent) => {
            console.log(_parent);
            return lodash_1.default.filter(FakeData_1.MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    },
    Mutation: {
        createUser: (_parents, args) => {
            const user = args.input;
            const lastId = FakeData_1.UserList[FakeData_1.UserList.length - 1].id;
            user.id = lastId + 1;
            FakeData_1.UserList.push(user);
            console.log(user);
            return user;
        },
        updateUserName: (_parents, args) => {
            const { id, newUserName } = args.input;
            let userUpdated;
            FakeData_1.UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUserName;
                    userUpdated = user;
                }
            });
            console.log(userUpdated);
            return userUpdated;
        },
        deleteUser: (_parents, args) => {
            const id = args.id;
            lodash_1.default.remove(FakeData_1.UserList, (user) => user.id === Number(id));
            return null;
        }
    }
};
//# sourceMappingURL=resolver.js.map