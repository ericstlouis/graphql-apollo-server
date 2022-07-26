import React, { useState } from "react"
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';

interface MovieType {
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
    favoriteMovies?: [MovieType];
}
 
interface UserType {
    newName: string;
    newUserName: string;
    age: number;
}


//graphql Query Calls
const QUERY_ALL_USERS = gql`
query getAllUsers {
  users {
    id
    name
    username
    age
  }
}`

const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            name 
            yearOfPublication
            isInTheaters
        }
    }
`

const QUERY_BY_MOVIE = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name 
            yearOfPublication
        }
    }`;

//graphql Mutation calls
const CREATE_USERS = gql`
    mutation CreateUser($input: createUserInput!) {
        createUser(input: $input) {
            name
            username
            age
            nationality
        }
    }
`


export default function DisplayData() {
    const  [movieSearched, setMovieSearched] = useState("")
    const [name, setName] = useState("")
    const [username, setusername] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("")


    const {data: userData, refetch} = useQuery(QUERY_ALL_USERS);
    const {data: movieData} = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, 
        {data: movieSearchedData, error: movieError}] = useLazyQuery(QUERY_BY_MOVIE);
    const [mutationCreateUser, 
            {data: createUserData, loading, error: createUserError}] = useMutation(CREATE_USERS);

            if(createUserError) {
                console.log(createUserError.message)
            }
    return(
        <div>
            <div>
                <input type='text' 
                placeholder="Name" 
                onChange={(e) => setName(e.target.value)}></input>
                
                <input type='text' 
                placeholder="username"                 
                onChange={(e) => setusername(e.target.value)}></input>

                <input type='number' 
                placeholder="age"

                onChange={(e) => setAge(Number(e.target.value))}></input>

                <input type='text' 
                placeholder="nationality"
                onChange={(e) => setNationality(e.target.value.toUpperCase())}></input>

                <button 
                onClick={(e) => {
                    e.preventDefault();
                    mutationCreateUser({variables: { input: {
                        name,
                        username,
                        age,
                        nationality
                    }}}); 
                    refetch()
                        }}>Create User</button>

            </div>
            <h3>List of Users</h3>
            {
                userData && userData.users.map((user: UserType) => {
                    return (
                        <div> 
                            <h1>Name: {user.name}</h1>
                            <h1>Age: {user.age}</h1>
                            <h1>UserName: {user.username}</h1>
                            <h1>Nationaliy: {user.nationality}</h1>
                            <hr />
                        </div>
                    )
                })
            }

        <hr />
        <hr />
        <hr />
        <hr />

        <h3>List of Movie</h3>
        {
            movieData && movieData.movies.map((movie: MovieType) => {
                return (
                    <div> 
                        <h1>Movie Name: {movie.name}</h1>
                        <h1>yearOfPublication: {movie.yearOfPublication}</h1>
                        <hr />
                    </div>
                )
            })
        }

        <div>
        <input type="text" 
        placeholder="Interstellar" 
        onChange={(e) => {setMovieSearched(e.target.value)}} />
        <button onClick={() => fetchMovie({
            variables: {
                name: movieSearched
            },
        })}> Fetch Data</button>

            <div>
                {movieSearchedData && <div>
                    <h1>Movie NAME: {movieSearchedData.movie.name}</h1>
                    <h1>Movie Year: {movieSearchedData.movie.yearOfPublication}</h1>
                </div>}
                {movieError && <h1>there was an error getting data</h1>}
            </div>
    </div>    
    </div>
    )
}

