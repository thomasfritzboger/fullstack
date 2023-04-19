import {gql} from "@apollo/client";
const CREATE_PERSON = gql`
mutation CreatePerson($input: PersonInput!) {
  createPerson(input: $input) {
    id
    name
    age
    url
  }
}
`;

export default CREATE_PERSON;