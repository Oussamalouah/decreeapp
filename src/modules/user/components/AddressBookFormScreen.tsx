import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {isMobileOnly} from 'react-device-detect';
import {useFieldArray, useForm, UseFormReturn} from 'react-hook-form';
import {$Keys} from 'utility-types';
import * as Yup from 'yup';
import {AddCircleAlternate} from '../../../assets/svg';
import {useCustomerData} from '../../../utils/hooks/customer-hooks';
import {DecreeButton} from '../../core/DecreeButton';
import {DecreeFormItem} from '../../core/DecreeFormItem';
import {DecreeText} from '../../core/DecreeText';
import {AddressBookFormContainerProps} from '../containers/AddressBookFormContainer';
import {AddressBookDropdown} from './shared/AddressBookDropdown';
import {ProfilePageWrapper} from './shared/ProfilePageWrapper';
import {DecreeSpinner} from '../../core/DecreeSpinner';
import clsx from 'clsx';

export const AddressBookFormValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  firstName: Yup.string().required('First name is required.'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required.'),

  company: Yup.string(),

  address1: Yup.string().required('Address 1 is required.'),
  address2: Yup.string(),
  city: Yup.string().required('City is required.'),
  state: Yup.string().required('State is required.'),
  postal: Yup.string().required('ZIP Code is required.'),
  country: Yup.string().required('Country is required.'),

  emailAddress: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required.'),
  phone: Yup.string().required('Phone number is required.'),
});

type SpecialDate = {
  type: string;
  month: string;
  day: string;
  year: string;
};

export type AddressBookFormState = {
  id?: string;
  customerId: string;
  customerEmail: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;

  company: string;

  address1: string;
  address2: string;
  city: string;
  state: string;
  postal: string;
  country: string;

  phone: string;
  emailAddress: string;

  specialDates: SpecialDate[];

  familyMembers: {
    type: string;
    firstName: string;
    middleName: string;
    lastName: string;
    title: string;
    dates: SpecialDate[];
  }[];
};

type AddressBookFormValue = $Keys<AddressBookFormState>;

type FamilyMemberDatesProps = {
  form: UseFormReturn<AddressBookFormState>;
  nestIndex: number;
};

const dateTypes = [
  {
    name: 'Birthday',
    value: 'Birthday',
  },
  {
    name: 'Anniversary',
    value: 'Anniversary',
  },
  {
    name: 'Christening',
    value: 'Christening',
  },
];

export const AddressBookFormScreen = (props: AddressBookFormContainerProps) => {
  const customerData = useCustomerData();
  const form = useForm<AddressBookFormState>({
    defaultValues: {country: 'US'},
    mode: 'onTouched',
    resolver: yupResolver(AddressBookFormValidationSchema),
  });
  const specialDates = useFieldArray({
    name: 'specialDates',
    keyName: 'id',
    control: form.control,
  });
  const familyMembers = useFieldArray({
    name: 'familyMembers',
    keyName: 'id',
    control: form.control,
  });

  useEffect(() => {
    if (specialDates.fields.length === 0) {
      specialDates.append({});
    }
  }, [specialDates.fields]);

  useEffect(() => {
    form.reset(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <ProfilePageWrapper
      title={
        customerData?.customer?.firstName +
          ' ' +
          customerData?.customer?.lastName ||
        customerData?.customer?.firstName ||
        ''
      }
      userClickedClose={props.userClickedClose}
      hideHeaderTabs
    >
      <div className={clsx({hidden: !props.loading})}>
        <DecreeSpinner type="primary" />
      </div>
      <div
        className={clsx([
          'py-6 tablet:py-7 px-6 tablet:px-10 tablet:bg-white tablet:filter tablet:drop-shadow-card',
          {hidden: props.loading},
        ])}
      >
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(props.userClickedSavedButton)}
        >
          <input
            type="hidden"
            value={props.customerEmail}
            {...form.register('customerEmail')}
          />
          <div className="space-y-4 tablet:space-y-6">
            <div className="flex self-start">
              <DecreeText size={18} className="text-blue-dark">
                Name & Address
              </DecreeText>
            </div>

            <div className="tablet:flex w-full space-y-4 tablet:space-y-0 tablet:space-x-4">
              <AddressBookDropdown
                form={form}
                label={isMobileOnly ? '' : 'Title'}
                defaultValue={props.defaultValues?.title}
                formTitle="title"
                items={[
                  {name: 'Mr.', value: 'Mr'},
                  {name: 'Mrs.', value: 'Mrs'},
                  {name: 'Ms.', value: 'Ms'},
                ]}
                required={true}
              />
              <div className="w-full tablet:grid grid-cols-3 space-y-4 tablet:space-y-0 tablet:space-x-4">
                <DecreeFormItem
                  textSize={16}
                  label="First Name"
                  placeholder="First Name"
                  labelClassName="text-gray-medium"
                  required
                  errorText={form.formState.errors.firstName?.message}
                  {...form.register('firstName')}
                />
                <DecreeFormItem
                  textSize={16}
                  label="Middle Name"
                  placeholder="Middle Name"
                  labelClassName="text-gray-medium"
                  errorText={form.formState.errors.middleName?.message}
                  {...form.register('middleName')}
                />
                <DecreeFormItem
                  textSize={16}
                  label="Last Name"
                  placeholder="Last Name"
                  labelClassName="text-gray-medium"
                  required
                  errorText={form.formState.errors.lastName?.message}
                  {...form.register('lastName')}
                />
              </div>
            </div>

            <div className="w-full tablet:flex self-start">
              <DecreeFormItem
                textSize={16}
                label="Company/Organization"
                className="tablet:min-w-[239px]"
                labelClassName="text-gray-medium"
                placeholder="Company/Organization"
                errorText={form.formState.errors.company?.message}
                {...form.register('company')}
              />
            </div>

            {/*start :: address fields*/}
            <div className="w-full tablet:grid grid-cols-8 space-y-4 tablet:space-y-0 tablet:space-x-4">
              <div className="col-span-5">
                <DecreeFormItem
                  textSize={16}
                  label="Address 1"
                  placeholder="Address 1"
                  required
                  labelClassName="text-gray-medium"
                  errorText={form.formState.errors.address1?.message}
                  {...form.register('address1')}
                />
              </div>
              <div className="col-span-3">
                <DecreeFormItem
                  textSize={16}
                  label="Address 2 (optional)"
                  placeholder="Address 2"
                  labelClassName="text-gray-medium"
                  errorText={form.formState.errors.address2?.message}
                  {...form.register('address2')}
                />
              </div>
            </div>

            <div className="w-full tablet:grid grid-cols-4 space-y-4 tablet:space-y-0 tablet:space-x-4">
              <div className="grid grid-cols-2 tablet:grid-cols-none">
                <DecreeFormItem
                  textSize={16}
                  label="City"
                  labelClassName="text-gray-medium"
                  required
                  placeholder="City"
                  errorText={form.formState.errors.city?.message}
                  {...form.register('city')}
                />
              </div>
              <div className="grid grid-cols-2 tablet:col-span-2 gap-x-6 tablet:gap-x-4">
                <DecreeFormItem
                  textSize={16}
                  label="State"
                  labelClassName="text-gray-medium"
                  placeholder="State"
                  required
                  errorText={form.formState.errors.state?.message}
                  {...form.register('state')}
                />
                <DecreeFormItem
                  textSize={16}
                  label="Zipcode"
                  labelClassName="text-gray-medium"
                  placeholder="Zipcode"
                  required
                  errorText={form.formState.errors.postal?.message}
                  {...form.register('postal')}
                />
              </div>
              {/* <DecreeFormItem
                textSize={16}
                label="Country"
                labelClassName="text-gray-medium"
                placeholder="Country"
                required
                errorText={form.formState.errors.country?.message}
                {...form.register('country')}
              /> */}
            </div>
          </div>
          {/*end :: address fields*/}

          {/*start :: contact fields*/}
          <div className="space-y-4 tablet:space-y-6">
            <div className="flex self-start">
              <DecreeText size={18} className="text-blue-dark">
                Contact Information
              </DecreeText>
            </div>
            <div className="w-full tablet:flex self-start space-y-4 tablet:space-y-0 tablet:space-x-4">
              <div className="tablet:min-w-[279px]">
                <DecreeFormItem
                  textSize={16}
                  label="Phone number"
                  labelClassName="text-gray-medium"
                  placeholder="Phone Number"
                  required
                  errorText={form.formState.errors.phone?.message}
                  {...form.register('phone')}
                />
              </div>
              <div className="min-w-[279px]">
                <DecreeFormItem
                  textSize={16}
                  label="Email"
                  labelClassName="text-gray-medium"
                  placeholder="Email"
                  required
                  errorText={form.formState.errors.emailAddress?.message}
                  {...form.register('emailAddress')}
                />
              </div>
            </div>
          </div>
          {/*start :: special days*/}
          <div className="space-y-4 tablet:space-y-6">
            <div className="flex">
              <DecreeText size={18} className="text-blue-dark">
                Special Days
              </DecreeText>
            </div>
            {specialDates.fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="tablet:flex items-center space-y-4 tablet:space-y-0 tablet:space-x-4 w-full"
                >
                  <div className="grid grid-cols-2 tablet:grid-cols-none">
                    <AddressBookDropdown
                      formTitle={
                        `specialDates.${index}.type` as AddressBookFormValue
                      }
                      defaultValue={field.type}
                      form={form}
                      items={dateTypes}
                      type="long"
                      required={true}
                    />
                  </div>
                  <div className="grid grid-cols-2 tablet:gap-x-4">
                    <AddressBookDropdown
                      formTitle={
                        `specialDates.${index}.month` as AddressBookFormValue
                      }
                      defaultValue={field.month}
                      form={form}
                      items={Array(12)
                        .fill(0)
                        .map((_, index) => {
                          const month = dayjs().month(index).format('MMMM');
                          return {
                            name: month,
                            value: month,
                          };
                        })}
                      type="long"
                      required={true}
                    />
                    <div className="pl-4 tablet:pl-0">
                      <AddressBookDropdown
                        formTitle={
                          `specialDates.${index}.day` as AddressBookFormValue
                        }
                        defaultValue={field.day}
                        form={form}
                        items={Array(31)
                          .fill(0)
                          .map((_, index) => {
                            return {
                              name: index + 1 + '',
                              value: index + 1 + '',
                            };
                          })}
                        type="long"
                        required={true}
                      />
                    </div>
                  </div>
                  {specialDates.fields.length > 1 && (
                    <div
                      className="items-center justify-items-center"
                      onClick={() => {
                        specialDates.remove(index);
                      }}
                    >
                      <DecreeText
                        className="text-gold cursor-pointer underline "
                        size={16}
                      >
                        remove
                      </DecreeText>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex">
              <DecreeText
                size={16}
                className="text-gold underline cursor-pointer"
                onClick={() => {
                  specialDates.append({});
                }}
              >
                + add more dates
              </DecreeText>
            </div>
          </div>
          {/*end :: special days*/}
          <div className="space-y-4 tablet:space-y-6">
            <div className="flex self-start">
              <DecreeText size={18} className="text-blue-dark">
                Family Members
              </DecreeText>
            </div>

            {/*start :: family members*/}
            {familyMembers.fields.map((field, index) => {
              return (
                <>
                  <div className="tablet:flex w-full space-y-4 tablet:space-y-0 tablet:space-x-4 items-end">
                    <div className="grid grid-cols-2 tablet:grid-cols-none">
                      <AddressBookDropdown
                        formTitle={
                          `familyMembers.${index}.type` as AddressBookFormValue
                        }
                        defaultValue={field.type}
                        form={form}
                        items={[
                          {name: 'Spouse/Partner', value: 'Spouse/Partner'},
                          {name: 'Child', value: 'Child'},
                          {name: 'Father', value: 'Father'},
                          {name: 'Mother', value: 'Mother'},
                          {name: 'Brother', value: 'Brother'},
                          {name: 'Sister', value: 'Sister'},
                          {name: 'Grandfather', value: 'Grandfather'},
                          {name: 'Grandmother', value: 'Grandmother'},
                        ]}
                        type="long"
                        required={true}
                      />
                    </div>
                    <div className="w-full tablet:grid grid-cols-3 space-y-4 tablet:space-y-0 tablet:space-x-4">
                      <DecreeFormItem
                        textSize={16}
                        defaultValue={field.firstName}
                        label="First Name"
                        placeholder="First Name"
                        labelClassName="text-gray-medium"
                        required
                        {...form.register(
                          `familyMembers.${index}.firstName` as AddressBookFormValue
                        )}
                      />
                      <DecreeFormItem
                        textSize={16}
                        defaultValue={field.middleName}
                        label="Middle Name"
                        placeholder="Middle Name"
                        labelClassName="text-gray-medium"
                        {...form.register(
                          `familyMembers.${index}.middleName` as AddressBookFormValue
                        )}
                      />
                      <DecreeFormItem
                        textSize={16}
                        defaultValue={field.lastName}
                        label="Last Name"
                        placeholder="Last Name"
                        labelClassName="text-gray-medium"
                        {...form.register(
                          `familyMembers.${index}.lastName` as AddressBookFormValue
                        )}
                      />
                    </div>
                  </div>

                  <FamilyMemberDates form={form} nestIndex={index} />
                </>
              );
            })}
            {/*end :: family members*/}
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => {
                familyMembers.append({});
              }}
            >
              <AddCircleAlternate />
              <div className="text-blue-dark">add more members</div>
            </div>
          </div>
          <div className="w-full hidden tablet:block h-[1px] bg-gray my-8" />
          <div className="flex w-full justify-between pt-4 tablet:space-x-4  tablet:pt-0">
            <DecreeButton
              mode="secondary"
              className="bg-white"
              onClick={props.userClickedCancelButton}
            >
              Cancel
            </DecreeButton>
            <DecreeButton type="submit">Save</DecreeButton>
          </div>
        </form>
      </div>
    </ProfilePageWrapper>
  );
};

const FamilyMemberDates = ({nestIndex, form}: FamilyMemberDatesProps) => {
  const familyMemberName =
    `familyMembers.${nestIndex}.dates` as 'familyMembers.0.dates';

  const familyMemberDates = useFieldArray({
    name: familyMemberName,
    keyName: 'id',
    control: form.control,
  });

  React.useEffect(() => {
    if (familyMemberDates.fields.length === 0) {
      familyMemberDates.append({});
    }
  }, [familyMemberDates.fields]);

  return (
    <>
      {familyMemberDates.fields.map((field, index) => {
        return (
          <>
            <div className="w-full tablet:flex space-y-4 tablet:space-y-0 tablet:space-x-4">
              <div className="w-[158px]" />
              <div className="grid grid-cols-2 tablet:grid-cols-none">
                <AddressBookDropdown
                  formTitle={
                    `familyMembers.${nestIndex}.dates.${index}.type` as AddressBookFormValue
                  }
                  defaultValue={field?.type}
                  form={form}
                  items={dateTypes}
                  type="long"
                  required={true}
                />
              </div>
              <div className="grid grid-cols-2 tablet:gap-x-4">
                <AddressBookDropdown
                  formTitle={
                    `familyMembers.${nestIndex}.dates.${index}.month` as AddressBookFormValue
                  }
                  defaultValue={field?.month}
                  form={form}
                  items={Array(12)
                    .fill(0)
                    .map((_, index) => {
                      const month = dayjs().month(index).format('MMMM');
                      return {
                        name: month,
                        value: month,
                      };
                    })}
                  type="long"
                  required={true}
                />
                <div className="pl-4 tablet:pl-0">
                  <AddressBookDropdown
                    formTitle={
                      `familyMembers.${nestIndex}.dates.${index}.day` as AddressBookFormValue
                    }
                    defaultValue={field?.day}
                    form={form}
                    items={Array(31)
                      .fill(0)
                      .map((_, index) => {
                        return {
                          name: index + 1 + '',
                          value: index + 1 + '',
                        };
                      })}
                    type="long"
                    required={true}
                  />
                </div>
              </div>
              {familyMemberDates.fields.length > 1 && (
                <div
                  className="items-center justify-items-center  flex"
                  onClick={() => {
                    familyMemberDates.remove(index);
                  }}
                >
                  <DecreeText
                    className="text-gold cursor-pointer underline "
                    size={16}
                  >
                    remove
                  </DecreeText>
                </div>
              )}
            </div>
          </>
        );
      })}
      <div className="w-full tablet:flex space-x-4">
        <div className="w-[158px]" />
        <DecreeText
          size={16}
          className="text-gold underline cursor-pointer max-w-max"
          onClick={() => {
            familyMemberDates.append({});
          }}
        >
          + add more dates
        </DecreeText>
      </div>
    </>
  );
};
