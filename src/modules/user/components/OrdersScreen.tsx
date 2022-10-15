import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import {formatPrice} from '../../../utils/format-price';
import {DecreeText} from '../../core/DecreeText';
import {OrdersProps} from '../containers/OrdersContainer';
import {
  OrderTableBodyText,
  OrderTableHeaderItem,
  OrderTableRow,
} from './shared/order-table.components';
import {ProfilePageWrapper} from './shared/ProfilePageWrapper';
import {images} from '../../../assets/images';
import {DecreeButton} from '../../core/DecreeButton';
import {customAttributeFields} from '../../../utils/constants/custom-attribute.constants';
import {productTypes} from '../../../utils/constants/product-type.constants';

export const OrdersScreen = (props: OrdersProps) => {
  return (
    <ProfilePageWrapper
      title={props.title}
      loading={props.loading}
      userClickedClose={props.userClickedClose}
    >
      <div className="w-full">
        <Accordion className="border-b-[1px] border-gray" allowZeroExpanded>
          {props.orders.map(order => {
            let additionalShippingPrice = 0;

            order.node.lineItems.edges.forEach(edge => {
              if (
                edge.node.variant?.product.productType === productTypes.SHIPMENT
              ) {
                additionalShippingPrice +=
                  parseFloat(edge.node.variant.priceV2.amount) *
                  edge.node.quantity;
              }
            });

            return (
              <AccordionItem key={order.node.id}>
                <AccordionItemHeading>
                  <AccordionItemButton className="flex py-4">
                    <div className="grid w-full grid-cols-4">
                      <DecreeText
                        size={18}
                        className="col-span-2 text-black-light laptop:col-span-1"
                      >
                        Order # {order.node.orderNumber}
                      </DecreeText>
                      <DecreeText
                        size={18}
                        className="col-span-2 text-right laptop:text-center text-black-light laptop:col-span-1"
                      >
                        {dayjs(order.node.processedAt).format('MM/DD/YYYY')}
                      </DecreeText>
                      <DecreeText
                        size={18}
                        className="col-span-2 text-left laptop:text-center text-black-light laptop:col-span-1"
                      >
                        {_.startCase(_.lowerCase(order.node.fulfillmentStatus))}
                      </DecreeText>
                      <DecreeText
                        size={18}
                        className="col-span-2 text-right text-black-light laptop:col-span-1"
                      >
                        {formatPrice(order.node.totalPriceV2.amount)}
                      </DecreeText>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="py-6 border-t-[1px] border-gray">
                  {/* Your Order */}
                  <div>
                    <OrderTableRow isHeader>
                      <OrderTableHeaderItem
                        title="Your Order"
                        className="col-span-4"
                      />
                    </OrderTableRow>
                    <OrderTableRow className="uppercase text-black-light">
                      <div className="grid grid-cols-1 col-span-4 gap-10 laptop:grid-cols-2">
                        {order.node.lineItems.edges.map((item, index) => {
                          const svgFile =
                            _.find(
                              item.node.customAttributes,
                              attribute =>
                                attribute.key === customAttributeFields.SVG_FILE
                            )?.value || '';

                          const isSample =
                            item.node.variant?.product.productType ===
                            productTypes.SAMPLE;

                          const isShipment =
                            item.node.variant?.product.productType ===
                            productTypes.SHIPMENT;

                          const itemImageSrc =
                            svgFile || images.decree_no_image;

                          // Reorder not available for wax seal, envelope, or samples
                          const isReorderAvailable =
                            item.node.variant &&
                            item.node.title !== 'Wax Seal' &&
                            item.node.title !== 'Envelope' &&
                            !isSample;

                          if (isShipment) return null;

                          return (
                            <div
                              key={
                                (item.node.variant?.id || item.node.title) +
                                index
                              }
                              className="flex space-x-6"
                            >
                              <div className="px-8 py-3 bg-offwhite">
                                <img
                                  src={itemImageSrc}
                                  className="w-20 h-32 object-contain"
                                />
                              </div>
                              <div className="space-y-2">
                                <OrderTableBodyText>
                                  {item.node.title}
                                </OrderTableBodyText>
                                <DecreeText size={12}>
                                  QTY: {item.node.quantity}
                                </DecreeText>
                                <DecreeText size={12}>
                                  Price:{' '}
                                  {formatPrice(
                                    item.node.variant?.priceV2.amount
                                  )}
                                </DecreeText>
                                {isReorderAvailable && (
                                  <DecreeButton
                                    className="px-8"
                                    onClick={() =>
                                      props.userClickedReorder(
                                        svgFile,
                                        item,
                                        order.node.lineItems.edges
                                      )
                                    }
                                  >
                                    Reorder
                                  </DecreeButton>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </OrderTableRow>
                  </div>
                  {/* Price & Shipping Information */}
                  <div>
                    <OrderTableRow isHeader>
                      <OrderTableHeaderItem
                        title="Price"
                        className="col-span-2"
                      />
                      <OrderTableHeaderItem
                        title="Shipped To"
                        className="col-span-2"
                      />
                    </OrderTableRow>
                    <OrderTableRow className="uppercase text-black-light">
                      <div className="w-[60%] col-span-2 space-y-3">
                        <div className="grid laptop:grid-cols-2">
                          <OrderTableBodyText>Shop Total:</OrderTableBodyText>
                          <OrderTableBodyText>
                            {formatPrice(
                              parseFloat(order.node.subtotalPriceV2?.amount) -
                                additionalShippingPrice
                            )}
                          </OrderTableBodyText>
                        </div>
                        <div className="grid laptop:grid-cols-2">
                          <OrderTableBodyText>Tax</OrderTableBodyText>
                          <OrderTableBodyText>
                            {formatPrice(order.node.totalTaxV2?.amount)}
                          </OrderTableBodyText>
                        </div>
                        <div className="grid laptop:grid-cols-2">
                          <OrderTableBodyText>Shipping:</OrderTableBodyText>
                          <OrderTableBodyText>
                            {formatPrice(
                              parseFloat(
                                order.node.totalShippingPriceV2.amount
                              ) + additionalShippingPrice
                            )}
                          </OrderTableBodyText>
                        </div>
                        <div className="w-full h-[1px] bg-gray" />
                        <div className="grid laptop:grid-cols-2">
                          <OrderTableBodyText>Order Total:</OrderTableBodyText>
                          <OrderTableBodyText>
                            {formatPrice(order.node.totalPriceV2.amount)}
                          </OrderTableBodyText>
                        </div>
                      </div>
                      <div className="col-span-2 space-y-3">
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.name}
                        </OrderTableBodyText>
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.address1}
                        </OrderTableBodyText>
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.address2}
                        </OrderTableBodyText>
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.city},{' '}
                          {order.node.shippingAddress?.countryCodeV2}
                        </OrderTableBodyText>
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.zip}
                        </OrderTableBodyText>
                        <OrderTableBodyText>
                          {order.node.shippingAddress?.phone}
                        </OrderTableBodyText>
                      </div>
                    </OrderTableRow>
                  </div>
                  {/* Track Shipment */}
                  <div>
                    <OrderTableRow isHeader>
                      <OrderTableHeaderItem
                        title="Track Shipment"
                        className="col-span-4"
                      />
                    </OrderTableRow>
                    <OrderTableRow className="uppercase text-black-light">
                      <div className="col-span-4 space-y-8">
                        {order.node.successfulFulfillments?.map(
                          (fulfillment, i) => (
                            <div
                              key={`${fulfillment.trackingCompany}${fulfillment.trackingInfo?.[0]?.number}`}
                              className="grid laptop:grid-cols-2 gap-y-4"
                            >
                              <div className="flex space-x-3 font-serif font-bold">
                                <DecreeText size={14}>{i + 1}.</DecreeText>
                                <DecreeText
                                  size={14}
                                  className="flex space-x-2"
                                >
                                  <div>{fulfillment.trackingCompany}</div>
                                  {fulfillment.trackingInfo.map(info => (
                                    <a
                                      key={info.number}
                                      className="underline cursor-pointer"
                                      href={info.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      #{info.number}
                                    </a>
                                  ))}
                                </DecreeText>
                              </div>
                              <div className="space-y-4">
                                {fulfillment.fulfillmentLineItems.edges.map(
                                  (item, index) => (
                                    <div
                                      key={
                                        (item.node.lineItem.variant?.id ||
                                          item.node.lineItem.title) + index
                                      }
                                      className="space-y-2"
                                    >
                                      <OrderTableBodyText>
                                        {item.node.lineItem.title}
                                      </OrderTableBodyText>
                                      <DecreeText size={12}>
                                        QTY: {item.node.quantity}
                                      </DecreeText>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </OrderTableRow>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </ProfilePageWrapper>
  );
};
