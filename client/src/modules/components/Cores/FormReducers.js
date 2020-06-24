import React, { useState, useEffect, useMemo } from "react";
import FormDialog from "../Periperhals/FormDialog";
import InputFields from "../Cores/InputFields";
import ArrayArrange from "../Cores/ArrayArrange";
import FormFields from "../Cores/FormFields";
import DynamicFields from "../Periperhals/DynamicFields";
export default function FormReducers({ fields, styleFunc, fields_of_type }) {
  let gridTemplateAreaDefinition = {};
  let gridAreaName = [];

  const styleDefinition = ({ styledata, data, forElement }) => {
    if (forElement === "parent") {
      gridAreaName = arrangeArrayToPosition({
        name: styledata.grid.family ?? data.main_subject,
        array: gridAreaName,
        orderOfAppearance:
          (styledata.grid && styledata.grid.order_of_appearance) ?? "none",
        is_dynamic: data.is_dynamic,
        parent: data.master_subject,
      });

      arrayCheck({
        position: styledata.grid && styledata.grid.position,
        family: styledata.grid && styledata.grid.family,
        fieldName: data.main_subject,
      });
    }
  };

  let positional_array = new ArrayArrange();

  const arrangeArrayToPosition = ({
    name,
    array,
    orderOfAppearance,
    is_dynamic = false,
    parent = null,
  }) => {
    if (parent) {
      positional_array.add_parent_to_collection({ parent });
    }

    if (is_dynamic) {
      positional_array.item_to_add_for_dynamic({
        item_to_add: "DYNAMIC_FIELD_ADD",
        parent: name.split(" ").join("_"),
      });

      arrayCheck({
        position: "full_width",
        family: null,
        fieldName: "DYNAMIC_FIELD_ADD",
      });
    }

    // console.log(name, array, orderOfAppearance);
    positional_array.addArrayPair({
      child: name.split(" ").join("_"),
      parent:
        orderOfAppearance.after &&
        (orderOfAppearance.after.split(" ").join("_") ?? null),
    });

    let rework = positional_array.reworkArray({
      array: positional_array.arrangePairs({
        pairs: positional_array.getArrayPairs(),
      }),
      additionals: positional_array.getAdditionals(),
      parents: positional_array.getParentCollection(),
    });

    console.log({ rework });
    return rework;
  };

  const arrayCheck = ({ position, family, fieldName }) => {
    // let definition = gridTemplateAreaDefinition[family] ?? "";
    if (position) {
      gridTemplateAreaDefinition = {
        ...gridTemplateAreaDefinition,
        [family ?? fieldName.split(" ").join("_")]: arrayRePosition({
          position,
          array: gridTemplateAreaDefinition[family] ?? [],
          fieldName,
        }),
      };

      console.log({ gridTemplateAreaDefinition });
    }
  };

  const arrayRePosition = ({ position, array, fieldName }) => {
    const field_subject = fieldName
      .replace(/[{()},%]/g, "")
      .split(" ")
      .join("_");

    switch (position) {
      case "left":
        array[0] = field_subject;
        array[1] = field_subject;
        array[2] = array[2] ?? "x";
        array[3] = array[3] ?? "x";
        array[4] = array[4] ?? "x";
        array[5] = array[5] ?? "x";
        break;
      case "middle":
        array[0] = array[0] ?? "x";
        array[1] = array[1] ?? "x";
        array[2] = field_subject;
        array[3] = field_subject;
        array[4] = array[4] ?? "x";
        array[5] = array[5] ?? "x";
        break;
      case "right":
        array[0] = array[0] ?? "x";
        array[1] = array[1] ?? "x";
        array[2] = array[2] ?? "x";
        array[3] = array[3] ?? "x";
        array[4] = field_subject;
        array[5] = field_subject;
        break;
      case "full_width":
        array[0] = field_subject;
        array[1] = field_subject;
        array[2] = field_subject;
        array[3] = field_subject;
        array[4] = field_subject;
        array[5] = field_subject;
        break;
      case "left_to_mid":
        array[0] = field_subject;
        array[1] = field_subject;
        array[2] = field_subject;
        array[3] = field_subject;
        array[4] = array[4] ?? "x";
        array[5] = array[5] ?? "x";
        break;
      case "left_half":
        array[0] = field_subject;
        array[1] = field_subject;
        array[2] = field_subject;
        array[3] = array[3] ?? "x";
        array[4] = array[4] ?? "x";
        array[5] = array[5] ?? "x";
        break;
      case "right_half":
        array[0] = array[0] ?? "x";
        array[1] = array[1] ?? "x";
        array[2] = array[2] ?? "x";
        array[3] = field_subject;
        array[4] = field_subject;
        array[5] = field_subject;
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
        gridArea: fieldSubject
          .replace(/[{()},%]/g, "")
          .split(" ")
          .join("_"),
        width:
          data.base.width ?? width_determinant(data.grid && data.grid.position),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      };
    }

    return { ...data.base };
  };

  const width_determinant = (position) => {
    if (position === "left" || position === "middle" || position === "right") {
      return "90%";
    }
    if (position === "full_width") {
      return "96.5%";
    }
    if (position === "left_to_mid") {
      return "95%";
    }

    if (position === "left_half" || position === "right_half") {
      return "93%";
    }
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

      if (data.is_dynamic) {
        StructuredFields.push(
          <div
            style={{
              ...styleBase({
                data: {
                  grid: { position: "full_width" },
                  base: {},
                },
                fieldSubject: "DYNAMIC_FIELD_ADD",
              }),
            }}
          >
            <DynamicFields
              parent_field={data.main_subject}
              fields_of_type={fields_of_type}
            />
          </div>
        );
      }

      switch (data.field_type) {
        case "INPUT_FIELD_STRING":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={{
                ...styleBase({
                  data: considerations.Styling,
                  fieldSubject: data.main_subject,
                }),
              }}
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
        case "INPUT_FIELD_INTEGER":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={{
                ...styleBase({
                  data: considerations.Styling,
                  fieldSubject: data.main_subject,
                }),
              }}
            >
              <InputFields
                label_subject={data.main_subject}
                field_id={data.field_id}
                field_subject={data.main_subject}
                input_type={"number"}
                considerations={considerations}
              />
            </div>
          );
          break;
        case "INPUT_FIELD_PASSWORD":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={{
                ...styleBase({
                  data: considerations.Styling,
                  fieldSubject: data.main_subject,
                }),
              }}
            >
              <InputFields
                label_subject={data.main_subject}
                field_id={data.field_id}
                field_subject={data.main_subject}
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
        case "DATE_PICKER":
          StructuredFields.push(
            <div
              key={data.field_id}
              style={{
                ...styleBase({
                  data: considerations.Styling,
                  fieldSubject: data.main_subject,
                }),
              }}
            >
              <InputFields
                label_subject={data.main_subject}
                field_id={data.field_id}
                field_subject={data.main_subject}
                input_type={"date_picker"}
                considerations={considerations}
              />
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
