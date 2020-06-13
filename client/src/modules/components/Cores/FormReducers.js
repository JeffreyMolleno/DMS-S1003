import React, { useState, useEffect, useMemo } from "react";
import FormDialog from "../Periperhals/FormDialog";
import InputFields from "../Cores/InputFields";
import { setFieldAlbumProperty } from "../../Redux/Reducers/Slice/FieldsSlice";
import ArrayArrange from "../Cores/ArrayArrange";
export default function FormReducers({ fields, styleFunc }) {
  let gridTemplateAreaDefinition = {};
  let gridAreaName = [];

  const styleDefinition = ({ styledata, data, forElement }) => {
    if (forElement === "parent") {
      gridAreaName =
        styledata.grid && styledata.grid.family
          ? arrangeArrayToPosition({
              name: styledata.grid.family,
              array: gridAreaName,
              orderOfAppearance:
                (styledata.grid && styledata.grid.order_of_appearance) ??
                "none",
            })
          : arrangeArrayToPosition({
              name: data.main_subject,
              array: gridAreaName,
              orderOfAppearance:
                (styledata.grid && styledata.grid.order_of_appearance) ??
                "none",
            });

      arrayCheck({
        position: styledata.grid && styledata.grid.position,
        family: styledata.grid && styledata.grid.family,
        fieldName: data.main_subject,
      });
    }
  };

  let positional_array = new ArrayArrange();

  const arrangeArrayToPosition = ({ name, array, orderOfAppearance }) => {
    positional_array.addArrayPair({
      child: name,
      parent: orderOfAppearance.after ?? null,
    });

    return positional_array.arrangePairs({
      pairs: positional_array.getArrayPairs(),
    });
  };

  const arrayCheck = ({ position, family, fieldName }) => {
    let definition = gridTemplateAreaDefinition[family] ?? "";

    if (position) {
      gridTemplateAreaDefinition = {
        ...gridTemplateAreaDefinition,
        [family ?? fieldName.split(" ").join("_")]: arrayRePosition({
          position,
          array: gridTemplateAreaDefinition[family] ?? [],
          fieldName,
        }),
      };
    }
  };

  const arrayRePosition = ({ position, array, fieldName }) => {
    switch (position) {
      case "left":
        array[0] = fieldName.split(" ").join("_");
        array[1] = fieldName.split(" ").join("_");
        break;
      case "middle":
        array[2] = fieldName.split(" ").join("_");
        array[3] = fieldName.split(" ").join("_");
        break;
      case "right":
        array[4] = fieldName.split(" ").join("_");
        array[5] = fieldName.split(" ").join("_");
        break;
      case "full_width":
        array[0] = fieldName.split(" ").join("_");
        array[1] = fieldName.split(" ").join("_");
        array[2] = fieldName.split(" ").join("_");
        array[3] = fieldName.split(" ").join("_");
        array[4] = fieldName.split(" ").join("_");
        array[5] = fieldName.split(" ").join("_");
        break;
      default:
        break;
    }
    return array;
  };

  const styleNormalizer = ({ styleDefinition, gridAreaNames }) => {
    let finalGridAreaTemplate = "";

    gridAreaName.map((name) => {
      if (styleDefinition[name]) {
        finalGridAreaTemplate = finalGridAreaTemplate.concat(
          "'" + styleDefinition[name].join(" ").concat("'")
        );
      }
    });
    return finalGridAreaTemplate;
  };

  const styleBase = ({ data, fieldSubject }) => {
    if (data.grid) {
      return {
        ...data.base,
        gridArea: fieldSubject.split(" ").join("_"),
        justifySelf: "center",
      };
    }

    return { ...data.base };
  };

  const fieldOrganizer = ({ fields }) => {
    let StructuredFields = [];

    fields.map((data) => {
      const considerations = data.considerations
        ? JSON.parse(data.considerations)
        : null;

      if (considerations && considerations.Styling) {
        styleDefinition({
          styledata: considerations.Styling,
          data,
          forElement: "parent",
        });
      }

      switch (data.field_type) {
        case "INPUT_FIELD_STRING":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={styleBase({
                data: considerations.Styling,
                fieldSubject: data.main_subject,
              })}
            >
              <InputFields
                label_subject={data.main_subject}
                field_id={data.field_id}
                field_subject={data.main_subject}
                input_type={"text"}
                considerations={considerations}
              />
            </div>
          );
          break;
        case "INPUT_FIELD_PASSWORD":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={styleBase({
                data: considerations.Styling,
                fieldSubject: data.main_subject,
              })}
            >
              <InputFields
                label_subject={data.main_subject}
                field_id={data.field_id}
                field_subject={data.main_subject}
                // value={}
                input_type={"password"}
                considerations={considerations}
              />
            </div>
          );
          break;
        case "BUTTON_SUBMIT_REGISTER":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={styleBase({
                data: considerations.Styling,
                fieldSubject: data.main_subject,
              })}
            >
              <InputFields
                field_id={data.field_id}
                field_subject={data.main_subject}
                value={data.main_subject}
                input_type={"button"}
                considerations={considerations}
              />
            </div>
          );
          break;
        case "BUTTON_SUBMIT_LOGIN":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={styleBase({
                data: considerations.Styling,
                fieldSubject: data.main_subject,
              })}
            >
              <InputFields
                field_id={data.field_id}
                field_subject={data.main_subject}
                value={data.main_subject}
                input_type={"button"}
                considerations={considerations}
              />
            </div>
          );
          break;
        case "COMPONENT_FORM_DIALOG":
          StructuredFields.push(
            <div>
              <FormDialog
                title={data.main_subject}
                album_master={data.master_subject}
              />
            </div>
          );
          break;
        case "FORM_HEADER":
          StructuredFields.push(
            <div
              style={{
                color: "white",
                backgroundColor: "blue",
                fontSize: "0.8em",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                ...styleBase({
                  data: considerations.Styling,
                  fieldSubject: data.main_subject,
                }),
              }}
            >
              <h3>{data.main_subject}</h3>
            </div>
          );
          break;
        case "FIELD_FAMILY_HEADER":
          StructuredFields.push(
            <div
              style={styleBase({
                data: considerations.Styling,
                fieldSubject: data.main_subject,
              })}
            >
              <p>{data.main_subject}</p>
            </div>
          );
          break;
        default:
          return null;
      }
    });
    if (gridAreaName.length) {
      styleFunc(
        styleNormalizer({
          styleDefinition: gridTemplateAreaDefinition,
          gridAreaNames: gridAreaName,
        })
      );
    }
    return StructuredFields;
  };

  const fieldsProcesss = useMemo(() => fieldOrganizer({ fields }), [fields]);

  return <>{fieldsProcesss}</>;
}
