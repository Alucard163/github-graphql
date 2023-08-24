import { gql } from "@apollo/client/core";

export const GET_USER = gql`
    query GetUser {
        viewer {
            name
            login
            avatarUrl
            createdAt
        }
    }
`;