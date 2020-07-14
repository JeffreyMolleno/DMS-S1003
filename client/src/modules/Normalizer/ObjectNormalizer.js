export function ConvertToDataFields(data) {
  const ObjectPropertyNames = Object.getOwnPropertyNames(data);

  let converted = [];
  ObjectPropertyNames.map((property_name) => {
    converted.push({
      field_subject: property_name,
      value: data[property_name],
    });
  });

  return converted;
}

export function NormalizeParentFieldValueFormat(dynamic_fields_and_values) {
  let processed_data = [];

  dynamic_fields_and_values.map((data) => {
    processed_data.push({
      master_field: data.parent,
      field_value: ConvertToDataFields(data.field_values),
    });
  });
  return processed_data;
}
