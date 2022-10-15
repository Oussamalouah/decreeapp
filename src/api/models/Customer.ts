export type Customer = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing: boolean;
  defaultAddress?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    zip?: string;
  };
};
