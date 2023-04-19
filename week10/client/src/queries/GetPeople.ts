import {gql} from "@apollo/client";

const GET_PEOPLE = gql`
query GetPeople {
  people {
    id
    name
    url
    age
    addresses {
      id
      street
      zip
    }
  }
}
`;

export default GET_PEOPLE;