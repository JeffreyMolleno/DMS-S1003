import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useQuery } from "@apollo/react-hooks";
import { getReferencedFieldsOfAlbumType } from "../../Server/FieldsQueries";
export default function InputSelect({
  FieldName = "Test",
  isRequired = false,
  HelperText = "",
  inputChange,
  value = "None",
}) {
  const { loading, error, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: "", master: FieldName, showChild: true },
    }
  );

  const classes = useStyles();
  const [selected, setSelected] = React.useState(value);
  const [menu, setMenu] = React.useState([]);

  useEffect(() => {
    let menu_item = [];
    !loading &&
      data.getReferencedFieldsOfAlbumType.result.map((item) => {
        return menu_item.push(item.main_subject);
      });
    setMenu(menu_item);

    // console.log(value);
    setSelected(value);
  }, [data, value]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    inputChange(event.target.value);
  };

  return (
    <>
      <FormControl
        required={isRequired}
        className={classes.formControl}
        style={{ width: "100%" }}
      >
        <InputLabel id="demo-simple-select-helper-label">
          {FieldName}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selected}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menu.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
        <FormHelperText>{HelperText}</FormHelperText>
      </FormControl>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
