import _ from 'lodash';
import React from 'react';
import {useParams} from 'react-router-dom';
import {DecreePageWrapper} from '../../../core/DecreePageWrapper';
import {DecreeText} from '../../../core/DecreeText';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../../route-list';

type CustomizationLayoutProps = {
  children: React.ReactNode;
  breadcrumbTag: string;
  // Overrides productTypeId
  productType?: string;
  sampleIsOnLimit?: boolean;
};

export const CustomizationLayout = (props: CustomizationLayoutProps) => {
  const {productId: productTypeId} = useParams<{productId: string}>();
  const type = props.productType || _.startCase(productTypeId);

  const history = useHistory();

  return (
    <DecreePageWrapper
      headerType="block"
      color="blue"
      sampleIsOnLimit={props.sampleIsOnLimit}
    >
      <div className="px-4 mx-auto mt-2.5 mb-10 laptop:mt-8 laptop:px-16 max-w-screen-figma">
        {/* Breadcrumb only shown in mobile */}
        <DecreeText size={14} className="text-blue-dark laptop:hidden">
          <span onClick={() => history.push(routes.HOME)}>Home</span> /{' '}
          <span
            onClick={() =>
              history.push(
                routes.STORE__VIEW(productTypeId || _.snakeCase(type))
              )
            }
          >
            {type}
          </span>{' '}
          / {props.breadcrumbTag}
        </DecreeText>
        <div className="mt-7 laptop:mt-0">{props.children}</div>
      </div>
    </DecreePageWrapper>
  );
};

type CustomizationLayoutGridProps = {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
};

export const CustomizationLayoutGrid = (
  props: CustomizationLayoutGridProps
) => {
  return (
    <div className="grid grid-cols-9 gap-6 laptop:gap-12">
      {/* Left Column */}
      <div className="col-span-9 laptop:space-y-6 laptop:col-span-5">
        {props.leftColumn}
      </div>
      {/* Right Column */}
      <div className="col-span-9 laptop:col-span-4">{props.rightColumn}</div>
    </div>
  );
};
