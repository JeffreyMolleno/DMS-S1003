import React, { useState, useEffect, useMemo } from "react";
import FormDialog from "../Periperhals/FormDialog";
import InputFields from "../Cores/InputFields";

export default function FormReducers({ fields, styleFunc }) {
  // const [style, setStyle] = useState({
  //   gridTemplateAreaDefinition: `'initial'`,
  // });

  let styleArray = [];
  let gridTemplateAreaDefinition = {};
  let gridAreaName = [];

  const styleDefinition = ({ styledata, data, forElement }) => {
    if (forElement === "parent") {
      gridAreaName =
        styledata.grid && styledata.grid.family
          ? setGridAreaName({
              name: styledata.grid.family,
              array: gridAreaName,
              orderOfAppearance: styledata.grid.order_of_appearance ?? "none",
            })
          : setGridAreaName({
              name: data.main_subject,
              array: gridAreaName,
              orderOfAppearance: styledata.grid.order_of_appearance ?? "none",
            });

      arrayCheck({
        position: styledata.grid && styledata.grid.position,
        family: styledata.grid && styledata.grid.family,
        fieldName: data.main_subject,
      });
    }
  };

  const setGridAreaName = ({ name, array, orderOfAppearance }) => {
    let unique = true;

    array.map((data) => {
      if (name === data) {
        return (unique = false);
      }
    });

    if (unique) {
      if (orderOfAppearance !== "none" && orderOfAppearance.after) {
        let after_index = array.indexOf(orderOfAppearance.after);

        if (after_index >= 0) {
          array.splice(after_index + 1, 0, name);
        } else {
          array.push(orderOfAppearance.after);
        }
        return array;
      }

      if (orderOfAppearance !== "none" && orderOfAppearance.before) {
        let before_index = array.indexOf(orderOfAppearance.before);
        if (before_index >= 0) {
          array.splice(before_index - 1 > 0 ? before_index - 1 : 0, 0, name);
        } else {
          array.push(orderOfAppearance.before);
        }
        return array;
      }

      array.push(name);
    }

    return array;
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

    console.log(gridTemplateAreaDefinition);
  };

  const arrayRePosition = ({ position, array, fieldName }) => {
    console.log(position, fieldName);
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
      finalGridAreaTemplate = finalGridAreaTemplate.concat(
        "'" + styleDefinition[name].join(" ").concat("'")
      );
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
    // let FieldsStyle = [];

    fields.map((data) => {
      const considerations = data.considerations
        ? JSON.parse(data.considerations)
        : null;

      if (considerations && considerations.Styling) {
        // styleFunc(considerations.Styling.position);
        styleDefinition({
          styledata: considerations.Styling,
          data,
          forElement: "parent",
        });
      }

      switch (data.field_type) {
        case "INPUT_FIELD_STRING":
          console.log(
            styleBase({
              data: considerations.Styling,
              fieldSubject: data.main_subject,
            })
          );
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
              style={considerations && considerations.Styling.base}
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
              style={considerations && considerations.Styling.base}
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
              style={considerations && considerations.Styling.base}
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
              <FormDialog title={data.main_subject} />
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

    // console.log(StructuredFields);
    // console.log('objective 001',gridAreaName.length, fields.length)
    if (gridAreaName.length) {
      styleFunc(
        styleNormalizer({
          styleDefinition: gridTemplateAreaDefinition,
          gridAreaNames: gridAreaName,
        })
      );
      // styleFunc(gridTemplateAreaDefinition);
    }
    return StructuredFields;
  };

  const fieldsProcesss = useMemo(() => fieldOrganizer({ fields }), [fields]);

  return <>{fieldsProcesss}</>;
}
