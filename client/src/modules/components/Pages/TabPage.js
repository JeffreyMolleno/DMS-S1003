import React from "react";
import { useDispatch, connect } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getReferencedFieldsOfAlbumType } from "../../Server/FieldsQueries";
import FormFields from "../Cores/FormFields";

export function TabPage({ ComponentAlbumType, PageState }) {
  // const dispatch = useDispatch();

  // const { loading, error, data = [] } = useQuery(
  //   getReferencedFieldsOfAlbumType,
  //   {
  //     variables: {
  //       type_subject: "TAB_PAGE_COMPONENTS",
  //       master: PageState.Page,
  //     },
  //   }
  // );

  return (
    <div>
      {/* {data.getReferencedFieldsOfAlbumType &&
        data.getReferencedFieldsOfAlbumType.result.map((data) => {
          return <div>{data.main_subject}</div>;
        })} */}
      <FormFields
        fields_of_type={"TAB_PAGE_COMPONENTS"}
        master={PageState.Page}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
    PageState: state.Page,
  };
};

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(TabPage);
