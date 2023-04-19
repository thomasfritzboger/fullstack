import {gql} from "@apollo/client";

const ADD_PERSON_TO_ADDRESS = gql`
mutation AddPersonToAddress($input: PersonAndAddressInput!) {
  addPersonToAddress(input: $input) {
    street
    zip
    people {
      name
      age
    }
  }
}
`;
export default ADD_PERSON_TO_ADDRESS;