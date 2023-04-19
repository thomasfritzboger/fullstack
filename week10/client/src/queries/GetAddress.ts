import { gql } from "@apollo/client";
const GET_ADDRESS = gql`
query GetAddress($id:ID){
  address(id:$id) {
    id
    street
    zip
    people {
      id
      name
      age
      url
    }
  }
}        
`;

export default GET_ADDRESS;