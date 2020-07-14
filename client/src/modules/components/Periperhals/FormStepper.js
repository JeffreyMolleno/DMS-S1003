import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormFields from "../Cores/FormFields";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
  ConsolidateBatchDynamicData,
} from "../../Server/FieldsQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useDispatch, connect } from "react-redux";
import {
  ConvertToDataFields,
  NormalizeParentFieldValueFormat,
} from "../../Normalizer/ObjectNormalizer";
import { deleteAllFieldValue } from "../../Redux/Reducers/Slice/FieldsSlice";

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export function FormStepper({
  master,
  fields_of_type,
  FieldsState,
  handleClose,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [steps, setSteps] = useState([]);
  const [consolidateBatchData] = useMutation(addBatchData);
  const [addBatchDynamicData] = useMutation(ConsolidateBatchDynamicData);
  const dispatch = useDispatch();

  const { loading, error1, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: "FORM_DIALOG_FIELDS", master },
    }
  );

  useEffect(() => {
    let steps_proccess = [];
    !loading &&
      data.getReferencedFieldsOfAlbumType.result.map((steps) => {
        return steps_proccess.push(steps.main_subject);
      });

    setSteps([...steps_proccess, "Confirm Consolidations"]);
  }, [data]);

  const isStepOptional = (step) => {
    return step == !0 && step !== steps.length;
  };

  const isStepFailed = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(skipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = async ({ album }) => {
    let album_id = null;

    if (Object.values(FieldsState.input).length > 0 && album) {
      const consolidate_result = await consolidateBatchData({
        variables: {
          data_album_type: album,
          input: ConvertToDataFields(FieldsState.input),
        },
      });

      album_id =
        consolidate_result.data.consolidateBatchData.result[0].data_album_id ??
        null;
    }

    console.log(album_id);
    if (
      FieldsState.new_dynamic_data !== [] ||
      FieldsState.hold_dynamic_data !== []
    ) {
      const consolidate_dbatch = await addBatchDynamicData({
        variables: {
          album_type: album,
          album_id: album_id ?? null,
          input: NormalizeParentFieldValueFormat([
            ...FieldsState.new_dynamic_data,
            ...FieldsState.hold_dynamic_data,
          ]),
        },
      });

      console.log({ consolidate_dbatch });
    }

    handleReset();
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    dispatch(deleteAllFieldValue());
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.length >= 1 &&
          steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepFailed(index)) {
              labelProps.error = true;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
      </Stepper>

      <div className={classes.form_fields_container}>
        {steps[activeStep] && (
          <FormFields
            fields_of_type={"FORM_DIALOG_FIELDS"}
            master={steps[activeStep]}
            showChild={true}
          />
        )}
      </div>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                aligItems: "center",
                flexDirection: "row",
              }}
            >
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1
                      ? () =>
                          handleSubmit({ album: FieldsState.data_album_type })
                      : handleNext
                  }
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
              <div>
                <Button
                  // disabled={FieldsState.input === {}}
                  onClick={handleReset}
                  className={classes.button}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form_fields_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "45px",
    marginTop: "30px",
  },
}));

const mapStateToProps = (state) => {
  return {
    ...state,
    FieldsState: state.Fields,
  };
};

const mapDispatch = { deleteAllFieldValue };

export default connect(mapStateToProps, mapDispatch)(FormStepper);
