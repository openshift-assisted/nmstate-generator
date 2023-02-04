import { Button, ButtonVariant, Form, ModalBoxBody, ModalBoxFooter } from '@patternfly/react-core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import {
  InterfaceState,
  NMStateInterface,
  NMStateInterfaceType,
  BondInterface,
  BondMode,
} from '../../types';
import IPv4Fields from '../formInputs/IPv4Fields';
import TextInputField from '../formInputs/TextInputField';
import BondPortsMultiSelectField from '../formInputs/BondPortsMultiSelectField';
import { NMStateInterfaceDialogProps } from '../NMStateInterfaceDialog';
import { buildInterfaceIPv4Config, getIPv4InitialValues } from '../utils';
import SelectField from '../formInputs/SelectField';

export type BondInterfaceFormValues = Omit<BondInterface, 'mode'> & { mode: BondMode | '' };

type BondInterfaceFormProps = Omit<
  NMStateInterfaceDialogProps,
  'newInterfaceType' | 'nmstateInterface'
> & {
  nmstateInterface?: BondInterface;
  interfaces?: NMStateInterface[];
};

function BondInterfaceForm({
  nmstateInterface,
  interfaces,
  updateInterface,
  addInterface,
  onClose,
}: BondInterfaceFormProps) {
  const handleSubmit: FormikConfig<BondInterfaceFormValues>['onSubmit'] = (values) => {
    const updatedInterface: BondInterface = {
      ...values,
      mode: values.mode || BondMode.ROUND_ROBIN,
      ipv4: buildInterfaceIPv4Config(values.ipv4),
    };

    if (nmstateInterface) {
      updateInterface(updatedInterface);
    } else {
      addInterface(updatedInterface);
    }
    onClose();
  };

  return (
    <Formik<BondInterfaceFormValues>
      initialValues={{
        type: NMStateInterfaceType.BOND,
        name: nmstateInterface?.name || '',
        state: InterfaceState.UP,
        ipv4: getIPv4InitialValues(nmstateInterface?.ipv4),
        mode: nmstateInterface?.mode || BondMode.ROUND_ROBIN,
        options: nmstateInterface?.options || {},
        ports: nmstateInterface?.ports || [],
      }}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isSubmitting, isValid, submitForm }: FormikProps<BondInterfaceFormValues>) => (
        <>
          <ModalBoxBody>
            <Form>
              <SelectField
                name="mode"
                label="Bond mode"
                options={Object.values(BondMode).map((value) => ({ value, label: value }))}
              />
              <BondPortsMultiSelectField interfaces={interfaces} />
              <TextInputField name="name" label="Name" isRequired />
              <IPv4Fields />
            </Form>
          </ModalBoxBody>
          <ModalBoxFooter>
            <Button onClick={submitForm} isDisabled={isSubmitting || !isValid}>
              Save
            </Button>
            <Button onClick={onClose} variant={ButtonVariant.secondary}>
              Cancel
            </Button>
          </ModalBoxFooter>
        </>
      )}
    </Formik>
  );
}

export default BondInterfaceForm;
