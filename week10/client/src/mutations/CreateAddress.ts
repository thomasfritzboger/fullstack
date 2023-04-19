import {gql} from "@apollo/client"
const CREATE_ADDRESS = gql`
mutation CreateAddress($input: AddressInput!) {
  createAddress(input: $input) {
    id
    street
    zip
  }
}
`;

export default CREATE_ADDRESS;