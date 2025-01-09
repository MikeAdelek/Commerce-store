import ps5 from "../assets/ps5.jpeg";
import dell from "../assets/dell.jpeg";
import hp from "../assets/hp.jpeg";
import fan from "../assets/fan.jpeg";
import headset1 from "../assets/headset1.jpeg";
import headset from "../assets/headset.jpeg";
import iphone from "../assets/iphone16.jpeg";
import cooker from "../assets/cooker.jpeg";
import iron from "../assets/iron.jpeg";

import productpage1 from '../assets/productpage1.jpeg'
import productpage2 from '../assets/productpage2.jpeg'
import productpage3 from '../assets/productpage3.jpeg'

//Icons
import {Facebook, Twitter, Instagram, LinkedIn} from 'lucide-react'

export const products = [
  {
    id: 1,
    name: "Playstation 5 with pad",
    price: "234, 464",
    discount: "29%",
    img: ps5,
    category: "electronics"
  },
  {
    id: 2,
    name: "Dell office desktop",
    price: "193, 572",
    img: dell,
    category: "electronics"
  },
  {
    id: 3,
    name: "Hp latitude 4gb rom",
    price: "94, 631",
    favorite: true,
    img: hp,
    category: "electronics"
  },
  {
    id: 4,
    name: "AANO portable electric fan",
    price: "34, 000",
    favorite: true,
    img: fan,
    category: "electronics"
  },
  {
    id: 5,
    name: "Redmill wireless headset",
    price: "29, 213",
    img: headset1,
    category: "electronics"
  },
  {
    id: 6,
    name: "JBL wireless headset",
    price: "49, 000",
    img: headset,
    category: "electronics"
  },
  {
    id: 7,
    name: "iphone16, 346 gb Ram",
    price: "894, 000",
    img: iphone,
    category: "electronics"
  },
  {
    id: 8,
    name: "Quillox, inbuilt cooker",
    price: "129, 513",
    img: cooker,
    category: "electronics"
  },
  {
    id: 9,
    name: "Binatone platinum surface",
    price: "67, 000",
    discount: "9%",
    img: iron,
    category: "electronics"
  }
];

export const categories = [
  "APPLIANCES",
  "FASHION",
  "GADGETS",
  "BABY PRODUCTS",
  "HEALTH",
  "GARDENING"
];

export const filters = {
  office: ["Laptops", "Desktops", "Keyboards"],
  color: ["Blue", "Red", "Black", "Green"],
  size: ["Small", "Medium", "Large"]
};

export const productPageImage = [
  productpage1, productpage2, productpage3
]

export const reviews = [
  {
    name: 'Solomon Carl', 
    rating: 4
  },
  {
    name: 'Chineme Nnebe', 
    rating: 5
  },
  {
    name: 'Samson Fayemi', 
    rating: 3
  }
]

export const footerSections = {
  COMMERCE: [
    {name: 'Products', href: '#'},
    {name: 'Sell on Commerce', href: '#'},
    {name: 'Become an Affiliate', href: '#'},
  ],
  ABOUT: [
    {name: 'Contact us', href: '#'},
    {name: 'About us', href: '#'},
    {name: 'Careers', href: '#'},
    {name: 'Our Blog', href: '#'},
    {name: 'Terms & Conditions', href: '#'},
  ],
  RESOURCES: [
    {name: 'News updates', href: '#'},
    {name: 'Return Policy', href: '#'},
    {name: 'Delivery', href: '#'},
    {name: 'Customer Support', href: '#'},
    {name: 'Brands guidelines', href: '#'},
    {name: 'Privacy Policy', href: '#'},
  ],
  PAYMENT: [
    {name: 'Mastercard', href: '#'},
    {name: 'Visa', href: '#'},
    {name: 'Verve', href: '#'},
  ],
}

export const socialLinks = [
  {icon: 'Facebook', href: '#'}, // Facebook
  {icon: 'Twitter', href: '#'}, // Twitter
  {icon: 'Instagram', href: '#'}, // Instagram
  {icon: 'LinkedIn', href: '#'}, // LinkedIn
]