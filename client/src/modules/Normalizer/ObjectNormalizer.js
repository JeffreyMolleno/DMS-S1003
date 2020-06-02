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
