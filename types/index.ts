// types/index.ts
export type Business = {
    _id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    image?: string;
    email?: string;
    website?: string;
    phone?: string;
    openingHours?: string;
    createdBy?: string | { _id: string };
  };
  