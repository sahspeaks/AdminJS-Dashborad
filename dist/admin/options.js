import componentLoader from './component-loader.js';
import * as Models from '../models/index.js';
const options = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ['phone', 'role', 'isActivated'],
        filterProperties: ['phone', 'role'],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ['email', 'role', 'isActivated'],
        filterProperties: ['email', 'role'],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ['email', 'role', 'isActivated'],
        filterProperties: ['email', 'role'],
      },
    },
    {
      resource: Models.Branch,
    },
    {
      resource: Models.Category,
    },
    {
      resource: Models.Product,
    },
    {
      resource: Models.Order,
    },
    {
      resource: Models.Counter,
    },
  ],
  databases: [],
  branding: {
    companyName: 'Today Blinkit',
    withMadeWithLove: false,
    favicon: 'https://seeklogo.com/images/B/blinkit-logo-568D32C8EC-seeklogo.com.png',
  },
};
export default options;
