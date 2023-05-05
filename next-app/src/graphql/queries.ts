import { gql } from "urql";

export const GET_ALL_EPROCESS = gql`
query GetAllElectoralProcess {
  getAllElectoralProcess {
    id
    initialHour
    finalHour
    processDate
    isActive
    name
    period
    institution {
      id
      image
    }
  }
}`;