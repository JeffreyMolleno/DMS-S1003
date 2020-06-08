import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const uri = "http://localhost:4000/graphql";
const link = new HttpLink({ uri });

const operation = {
  query: gql`
    query {
      getFields {
        field_id
        field_type
        main_subject
        sub_definition
        is_dynamic
        master_subject
        show
        calculation
        considerations
        album_definition
      }
    }
  `,
  variables: {}, //optional
  operationName: {}, //optional
  context: {}, //optional
  extensions: {}, //optional
};

// For single execution operations, a Promise can be used
// makePromise(execute(link, operation))
//   .then((data) => console.log(`received data ${JSON.stringify(data, null, 2)}`))
//   .catch((error) => console.log(`received error ${error}`));

export const PromiseTest = async () => {
  makePromise(execute(link, operation))
    .then((data) =>
      console.log(`received data ${JSON.stringify(data, null, 2)}`)
    )
    .catch((error) => console.log(`received error ${error}`));
};
