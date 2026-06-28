import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'user', 'total', 'createdAt'],
  },
  access: {
    create: ({ req: { user } }) => !!user,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true
      return { user: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true
      return { user: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true
      return { user: { equals: user.id } }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Customer',
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      label: 'Total Amount ($)',
      min: 0,
    },
    {
      name: 'paymentIntent',
      type: 'text',
      label: 'Payment Intent / Reference ID',
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          label: 'Address Line 1',
        },
        {
          name: 'addressLine2',
          type: 'text',
          label: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          label: 'State / Province',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          label: 'Country',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Order Items',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
          label: 'Product',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          label: 'Quantity',
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'color',
          type: 'text',
          label: 'Selected Color',
        },
        {
          name: 'size',
          type: 'text',
          label: 'Selected Size',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price at Purchase ($)',
          min: 0,
        },
      ],
    },
  ],
}
