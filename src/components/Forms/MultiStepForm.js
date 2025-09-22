import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const MultiStepForm = ({ 
  steps, 
  children, 
  onSubmit, 
  onStepChange,
  validationRules = {},
  submitButtonText = 'Submit',
  allowSkip = false 
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const validateStep = (stepIndex) => {
    const validation = validationRules[stepIndex];
    if (!validation) return true;
    
    const stepErrors = validation();
    setErrors(prev => ({ ...prev, [stepIndex]: stepErrors }));
    
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep);
      }
    }
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    if (onStepChange) {
      onStepChange(prevStep);
    }
  };

  const handleSubmit = () => {
    if (validateStep(activeStep) && onSubmit) {
      onSubmit();
    }
  };

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  return (
    <Box>
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={!isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel 
                error={errors[index] && Object.keys(errors[index]).length > 0}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box sx={{ mb: 3 }}>
        {children[activeStep]}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          disabled={isFirstStep}
          onClick={handleBack}
          startIcon={<ArrowBack />}
          sx={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {allowSkip && !isLastStep && (
            <Button
              color="inherit"
              onClick={handleNext}
            >
              Skip
            </Button>
          )}
          
          {isLastStep ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              size="large"
            >
              {submitButtonText}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MultiStepForm;
