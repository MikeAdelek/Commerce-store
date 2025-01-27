import ps5 from "../assets/ps5.jpeg";
import dell from "../assets/dell.jpeg";
import hp from "../assets/Hp.jpeg";
import fan from "../assets/fan.jpeg";
import headset1 from "../assets/headset1.jpeg";
import headset from "../assets/headset.jpeg";
import iphone from "../assets/iphone16.jpeg";
import cooker from "../assets/cooker.jpeg";
import iron from "../assets/iron.jpeg";

import productpage1 from "../assets/productpage1.jpeg";
import productpage2 from "../assets/productpage2.jpeg";
import productpage3 from "../assets/productpage3.jpeg";

import Slide1 from "../assets/commerce-homepage.jpeg";
import Slide2 from "../assets/commerce-homepage2.jpeg";

import NewArrival1 from "../assets/headset1.jpeg";
import NewArrival2 from "../assets/newArrival/flowerjacket.png";
import NewArrival3 from "../assets/newArrival/unisexBlazer.png";
import NewArrival4 from "../assets/newArrival/handBags.png";
import NewArrival5 from "../assets/newArrival/hoodie.png";
import NewArrival6 from "../assets/wishlist.jpeg";

import trending1 from "../assets/newArrival/xmasTree.png";
import trending2 from "../assets/newArrival/winterBoot.png";

//Icons
import {
  FacebookIcon,
  FactoryIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon
} from "lucide-react";

// Images
import ImageCarousel from "./ImageCarousel";

export const homeCategory = [
  "NEW",
  "TRENDS",
  "FASHION",
  "KIDS",
  "GADGETS",
  "KITCHEN",
  "HEALTH"
];

export const slides = [
  {
    id: 1,
    image: Slide1
  },
  {
    id: 2,
    image: Slide2
  }
];

export default function ProductDetails() {
  return (
    <div className="w-full">
      <ImageCarousel autoSlide={true} autoSlideInterval={5000}>
        {slides.map((s) => (
          <img src={s} />
        ))}
      </ImageCarousel>
    </div>
  );
}

export const newArrivals = [
  {
    id: 1,
    name: "Redmil Wireless Headset",
    price: "29,213",
    img: NewArrival1,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 2,
    name: "Flower patterned winter jacket",
    price: "5673",
    img: NewArrival2,
    size: "Size: S L M XL XXL",
    category: "electronics"
  },
  {
    id: 3,
    name: "Ron Lach unisex blazer",
    price: "3563",
    favorite: true,
    img: NewArrival3,
    size: "Size: S L M",
    category: "electronics"
  },
  {
    id: 4,
    name: "Victorian Luxury ladies bag",
    price: "45, 243",
    favorite: true,
    img: NewArrival4,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 5,
    name: "Adidas plain colored hoodie",
    price: "5213",
    img: NewArrival5,
    size: "Size: S L M XL XXL",
    category: "electronics"
  },
  {
    id: 6,
    name: "Vitamin C",
    price: "1789",
    img: NewArrival6,
    color: "color: BK BL RB",
    category: "electronics"
  }
];

export const trending = [
  {
    id: 1,
    name: "Ornated 6ft Xmas Tree",
    description: "Almost sold out",
    price: "13,568",
    img: trending1,
    size: "Size: 3ft 5ft 6ft 8ft",
    category: "electronics"
  },
  {
    id: 2,
    name: "Zeus King winter boots",
    description: "Almost sold out",
    price: "42,675",
    img: trending2,
    size: "Size: 40 43 45 48",
    category: "electronics"
  }
];

export const products = [
  {
    id: 1,
    name: "Playstation 5 with pad",
    price: "234, 464",
    discount: "29%",
    img: ps5,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 2,
    name: "Dell office desktop",
    price: "193, 572",
    img: dell,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 3,
    name: "Hp latitude 4gb rom",
    price: "94, 631",
    favorite: true,
    img: hp,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 4,
    name: "AANO portable electric fan",
    price: "34, 000",
    favorite: true,
    img: fan,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 5,
    name: "Redmill wireless headset",
    price: "29, 213",
    img: headset1,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 6,
    name: "JBL wireless headset",
    price: "49, 000",
    img: headset,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 7,
    name: "iphone16, 346 gb Ram",
    price: "894, 000",
    img: iphone,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 8,
    name: "Quillox, inbuilt cooker",
    price: "129, 513",
    img: cooker,
    color: "color: BK BL RB",
    category: "electronics"
  },
  {
    id: 9,
    name: "Binatone platinum surface",
    price: "67, 000",
    discount: "9%",
    img: iron,
    color: "color: BK BL RB",
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

export const productPageImage = [productpage1, productpage2, productpage3];

export const reviews = [
  {
    name: "Solomon Carl",
    rating: 4
  },
  {
    name: "Chineme Nnebe",
    rating: 5
  },
  {
    name: "Samson Fayemi",
    rating: 3
  }
];

export const footerSections = {
  COMMERCE: [
    { name: "Products", href: "#" },
    { name: "Sell on Commerce", href: "#" },
    { name: "Become an Affiliate", href: "#" }
  ],
  ABOUT: [
    { name: "Contact us", href: "#" },
    { name: "About us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Our Blog", href: "#" },
    { name: "Terms & Conditions", href: "#" }
  ],
  RESOURCES: [
    { name: "News updates", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Delivery", href: "#" },
    { name: "Customer Support", href: "#" },
    { name: "Brands guidelines", href: "#" },
    { name: "Privacy Policy", href: "#" }
  ],
  PAYMENT: [
    { name: "Mastercard", href: "#" },
    { name: "Gift Coupons", href: "#" },
    { name: "Visa", href: "#" },
    { name: "Verve", href: "#" }
  ]
};

export const socialLinks = [
  <FactoryIcon />,
  { icon: <FacebookIcon />, href: "#" }, // Facebook
  { icon: <TwitterIcon />, href: "#" }, // Twitter
  { icon: <InstagramIcon />, href: "#" }, // Instagram
  { icon: <LinkedinIcon />, href: "#" } // LinkedIn
];
