"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

type Bottle = {
  id: string;
  brand: string;
  name: string;
  type: string;
  abv: number;
  nom: string;
  region: string;
  country: string;
  score: number;
  ratings: number;
  additive: "Independent verification" | "Producer declared" | "Not disclosed";
  notes: string[];
  process: string;
  pairing: { dish: string; why: string; alternatives: string[] };
  image: string;
  imageSource: string;
};
const bottles: Bottle[] = [
  {
    id: "tequila-ocho-plata-potrero-grande",
    brand: "Tequila Ocho",
    name: "Plata 2023 Potrero Grande",
    type: "Blanco",
    abv: 40,
    nom: "1474",
    region: "Los Altos, Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Green apple", "Lime", "Rosemary"],
    process: "Single estate · Brick oven · Roller mill · Copper pot",
    pairing: { dish: "Citrus-cured kingfish", why: "Bright citrus and delicate fish mirror Potrero Grande's green apple and lime while its herbal finish keeps the pairing fresh.", alternatives: ["Goat cheese", "Grilled prawns"] },
    image: "/products/tequila-ocho-plata-potrero-grande.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "tequila-ocho-reposado-san-jeronimo",
    brand: "Tequila Ocho",
    name: "Reposado 2023 San Jerónimo",
    type: "Reposado",
    abv: 40,
    nom: "1474",
    region: "Los Altos, Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Ripe fig", "Light salt"],
    process: "Single estate · Brick oven · Roller mill · Copper pot · Oak rested",
    pairing: { dish: "Fig and Manchego crostini", why: "Ripe fig follows the tequila's fruit-forward character while nutty Manchego complements its gentle oak and cooked agave.", alternatives: ["Roast pork belly", "Mushroom tacos"] },
    image: "/products/tequila-ocho-reposado-san-jeronimo.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "cascahuin-plata-48",
    brand: "Cascahuín",
    name: "Plata 48",
    type: "High proof blanco",
    abv: 48,
    nom: "1123",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Fresh herbs", "Mineral"],
    process: "Brick oven · Roller mill · Cement/stainless fermentation · Copper pot",
    pairing: { dish: "Charred octopus", why: "Smoky char stands up to the 48% intensity while citrus and sea salt draw out its mineral, herbal agave profile.", alternatives: ["Ceviche", "Grilled spring onions"] },
    image: "/products/cascahuin-plata-48.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "atanasio-blanco",
    brand: "Atanasio",
    name: "Blanco",
    type: "Blanco",
    abv: 40,
    nom: "1599",
    region: "El Medineño, Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Black pepper", "Fresh herbs"],
    process: "Autoclave · Roller mill · Wild fermentation · Stainless pot still",
    pairing: { dish: "Herb-roasted chicken", why: "Fresh herbs echo Atanasio's savoury profile while roast chicken softens its black-pepper edge and lets the cooked agave lead.", alternatives: ["Grilled courgettes", "Apple and fennel salad"] },
    image: "/products/atanasio-blanco.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "vivir-reposado",
    brand: "VIVIR",
    name: "Reposado",
    type: "Reposado",
    abv: 40,
    nom: "1438",
    region: "Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Not disclosed",
    notes: ["Agave", "Vanilla", "Caramel"],
    process: "Highland agave · Six months in ex-bourbon oak",
    pairing: { dish: "Butterscotch bread pudding", why: "Caramelised richness mirrors the reposado's vanilla and caramel tones, while a pinch of salt keeps the finish balanced.", alternatives: ["Aged cheddar", "Roast squash"] },
    image: "/products/vivir-reposado.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "gran-coramino-cristalino",
    brand: "Gran Coramino",
    name: "Reposado Cristalino",
    type: "Cristalino",
    abv: 40,
    nom: "1122",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 0,
    ratings: 0,
    additive: "Not disclosed",
    notes: ["Vanilla", "Dark berry", "Light spice"],
    process: "Eastern European oak · Cabernet cask finish · Filtered clear",
    pairing: { dish: "Berry-glazed duck", why: "Dark berry connects with the Cabernet-cask finish while duck's richness balances the Cristalino's vanilla sweetness and light spice.", alternatives: ["Dark chocolate", "Baked Brie"] },
    image: "/products/gran-coramino-cristalino.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "g4-108",
    brand: "G4",
    name: "Blanco 108",
    type: "High proof blanco",
    abv: 54,
    nom: "1579",
    region: "Los Altos, Jalisco",
    country: "Mexico",
    score: 91,
    ratings: 1842,
    additive: "Independent verification",
    notes: ["Cooked agave", "Black pepper", "Mineral"],
    process: "Stone/brick oven · Tahona & roller mill · Copper pot",
    pairing: { dish: "Charred prawns", why: "Their sweetness and smoky char soften the 108-proof heat while echoing its peppery, mineral edge.", alternatives: ["Grilled octopus", "Spicy fish tacos"] },
    image: "/products/g4-108.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "mijenta-blanco",
    brand: "Mijenta",
    name: "Blanco",
    type: "Blanco",
    abv: 40,
    nom: "1499",
    region: "Los Altos, Jalisco",
    country: "Mexico",
    score: 88,
    ratings: 1206,
    additive: "Independent verification",
    notes: ["Floral", "Citrus", "Cooked agave"],
    process: "Brick oven · Roller mill · Stainless & copper",
    pairing: { dish: "Citrus ceviche", why: "Fresh lime and delicate seafood lift Mijenta's floral, citrus-led profile without hiding the cooked agave.", alternatives: ["Avocado tostadas", "Goat cheese"] },
    image: "/products/mijenta-blanco.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "codigo-1530",
    brand: "Código 1530",
    name: "Rosa Blanco",
    type: "Rosa",
    abv: 35,
    nom: "1616",
    region: "Amatitán, Jalisco",
    country: "Mexico",
    score: 84,
    ratings: 692,
    additive: "Producer declared",
    notes: ["Red fruit", "Citrus", "Soft agave"],
    process: "French white oak Cabernet casks · Unrested base",
    pairing: { dish: "Tuna tartare", why: "Clean tuna and gentle acidity complement the tequila's soft agave, citrus and subtle red-fruit character.", alternatives: ["Salmon sashimi", "Beetroot carpaccio"] },
    image: "/products/codigo-1530-rosa.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "don-fulano",
    brand: "Don Fulano",
    name: "Reposado",
    type: "Reposado",
    abv: 40,
    nom: "1146",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 90,
    ratings: 2384,
    additive: "Independent verification",
    notes: ["Cooked agave", "Oak", "Baking spice"],
    process: "Masonry oven · Copper pot · French oak",
    pairing: { dish: "Mole-roasted chicken", why: "Warm spice and savoury depth meet the reposado's cooked agave, baking spice and measured oak.", alternatives: ["Grilled mushrooms", "Aged Manchego"] },
    image: "https://tequilish.fcbzzqm7dr.chatgpt.site/products/don-fulano.png",
    imageSource: "https://donfulano.com/products/reposado",
  },
  {
    id: "tears-llorona",
    brand: "Tears of Llorona",
    name: "Extra Añejo",
    type: "Extra añejo",
    abv: 43,
    nom: "1146",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 93,
    ratings: 1680,
    additive: "Independent verification",
    notes: ["Dark chocolate", "Dried fruit", "Agave"],
    process: "Five years · Scotch, sherry & brandy casks",
    pairing: { dish: "Dark chocolate tart", why: "Bittersweet cocoa draws out the extra añejo's dried fruit and layered cask richness.", alternatives: ["Blue cheese", "Roasted figs"] },
    image: "/products/tears-of-llorona-extra-anejo.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "fortaleza",
    brand: "Fortaleza",
    name: "Still Strength",
    type: "High proof blanco",
    abv: 46,
    nom: "1493",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 94,
    ratings: 4103,
    additive: "Independent verification",
    notes: ["Olive brine", "Agave", "Earth"],
    process: "Brick oven · Tahona · Copper pot",
    pairing: { dish: "Fresh oysters", why: "Briny oysters mirror its olive and mineral notes while the bright agave keeps the finish lively.", alternatives: ["Ceviche", "Grilled courgettes"] },
    image:
      "https://tequilish.fcbzzqm7dr.chatgpt.site/products/fortaleza-still-strength.jpg",
    imageSource:
      "https://tequilafortaleza.com/fortaleza-blanco-still-strength/",
  },
  {
    id: "codigo-1530-anejo",
    brand: "Código 1530",
    name: "Añejo",
    type: "Añejo",
    abv: 40,
    nom: "1616",
    region: "Amatitán, Jalisco",
    country: "Mexico",
    score: 89,
    ratings: 0,
    additive: "Producer declared",
    notes: ["Cooked agave", "Oak", "Vanilla"],
    process: "Aged in Napa Cabernet French white oak barrels",
    pairing: { dish: "Wild mushroom risotto", why: "Earthy mushrooms and creamy rice balance the añejo's vanilla, oak and Cabernet-cask richness.", alternatives: ["Roast duck", "Mature cheddar"] },
    image: "/products/codigo-1530-anejo.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "t1-reposado-excepcional",
    brand: "T1",
    name: "Reposado Excepcional",
    type: "Reposado",
    abv: 40,
    nom: "1146",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 89,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Light oak", "Spice"],
    process: "Traditional masonry oven · Copper pot · Oak rested",
    pairing: { dish: "Grilled chicken tacos", why: "Charred chicken, lime and mild spice sit naturally beside its cooked agave and light oak.", alternatives: ["Elote", "Roasted peppers"] },
    image: "/products/t1-reposado-excepcional.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "t1-anejo-estelar",
    brand: "T1",
    name: "Añejo Estelar",
    type: "Añejo",
    abv: 40,
    nom: "1146",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 91,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Caramel", "Oak"],
    process: "Traditional masonry oven · Copper pot · Extended oak ageing",
    pairing: { dish: "Aged Manchego", why: "Nutty, savoury cheese reins in the sweetness and highlights the añejo's caramel and oak.", alternatives: ["Crème brûlée", "Toasted almonds"] },
    image: "/products/t1-anejo-estelar.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "fortaleza-blanco",
    brand: "Fortaleza",
    name: "Blanco",
    type: "Blanco",
    abv: 40,
    nom: "1493",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 92,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Citrus", "Olive brine"],
    process: "Brick oven · Tahona · Copper pot",
    pairing: { dish: "Baja fish tacos", why: "Crisp fish, lime and cabbage brighten its citrus while playing against the signature olive brine.", alternatives: ["Guacamole", "Grilled prawns"] },
    image: "/products/fortaleza-blanco.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "fortaleza-reposado",
    brand: "Fortaleza",
    name: "Reposado",
    type: "Reposado",
    abv: 40,
    nom: "1493",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 93,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Butter", "Light oak"],
    process: "Brick oven · Tahona · Copper pot · American oak",
    pairing: { dish: "Herb-roasted chicken", why: "A buttery roast texture and fresh herbs complement the reposado's soft oak and cooked agave.", alternatives: ["Butternut squash", "Comté"] },
    image: "/products/fortaleza-reposado.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "fortaleza-anejo",
    brand: "Fortaleza",
    name: "Añejo",
    type: "Añejo",
    abv: 40,
    nom: "1493",
    region: "Tequila Valley, Jalisco",
    country: "Mexico",
    score: 94,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Toffee", "Oak"],
    process: "Brick oven · Tahona · Copper pot · American oak",
    pairing: { dish: "Dark chocolate and toasted nuts", why: "Cocoa and roasted nuts bring the añejo's toffee and oak forward without overwhelming the agave.", alternatives: ["Bread pudding", "Aged Gouda"] },
    image: "/products/fortaleza-anejo.webp",
    imageSource: "TequilaFi collection photograph",
  },
  {
    id: "tapatio-blanco",
    brand: "Tapatío",
    name: "Blanco",
    type: "Blanco",
    abv: 40,
    nom: "1139",
    region: "Los Altos, Jalisco",
    country: "Mexico",
    score: 88,
    ratings: 0,
    additive: "Independent verification",
    notes: ["Cooked agave", "Pepper", "Citrus"],
    process: "Brick oven · Roller mill · Copper pot",
    pairing: { dish: "Ceviche tostadas", why: "Citrus, chilli and crisp corn sharpen Tapatío's pepper while letting its cooked-agave core shine.", alternatives: ["Grilled fish", "Pico de gallo"] },
    image: "/products/tapatio-blanco.webp",
    imageSource: "TequilaFi collection photograph",
  },
];
const tasteOptions = [
  "Cooked agave",
  "Citrus",
  "Floral",
  "Black pepper",
  "Mineral",
  "Herbal",
  "Oak",
  "Vanilla",
  "Caramel",
  "Dried fruit",
];
const rankingTears = "/rankings/tears-of-llorona-best-overall.webp";
const rankingMijenta =
  "data:image/jpeg;base64,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";
const rankingG4 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA0JCgwKCA0MCwwPDg0QFCIWFBISFCkdHxgiMSszMjArLy42PE1CNjlJOi4vQ1xESVBSV1dXNEFfZl5UZU1VV1P/2wBDAQ4PDxQSFCcWFidTNy83U1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1P/wAARCALQAgADASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABAABAgMFBgf/xABIEAACAQMCAwUFBwIFAgUDAwUBAgMABBESIQUxQRMiUWFxFDKBkaEGI0KxwdHwUuEkM2Jy8RU0JUNTc5JjgqIHNbJEVFWDk//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACARAQEBAQADAQADAQEAAAAAAAABEQISITEDE0FRIjL/2gAMAwEAAhEDEQA/APMa1OFyKI9JOCDWXV1v73OrBuXNxiErq59M03C51iZsnGaz+e1EQWkjkaedEbk98ghIz0rGlk7RhjkKU1tLH/mA4qEaZqKOjmUIAedKRg+OlD6CoyDTjLHA50B8E2hAFO4qF7dMy6c71o2XDcQhm3JFBcWtBCVZetBnxx69zWlFYJ2QY8zQEZ0jetWKbVCMdKgy+IW6wspHWqQwIqziUxklC42FUrsKsDAgSZxyooTHTzofs3fdVq0Wc5XOmgEnJdiarWHUKulUqcHmKlEdjtQRRAq4PSqLlsoQKJZtjVLRawagzkyzUfECFqnsdBoiP3az18b5M5qs1OSqs1jlqnpjTZpia0iSnvCug4Z0rnU98etdDww7CjNdHbnlRqtgUDbbgUYM450Q0kndNY9/uprVkHdrJvtlNUcrxQUFHtR3E9zigUosX2x+/FdZwz3RXI23+dXWcMPdG9Zqx0EHKryxAoeDlVxFZFcshwayb0jBrTnGxrFvm5ipVYtz79NEh6VG4bv71bbsOldeWaIVAF3q6GANVeMjaj7OElck1tkJc2uIyax+z0T10t5hIzmsYxhpMigMh9wVM8qqQaV51JdzisiyNSzbVp2eRQ9tGOVacMYX40sIIjY4qwGmUACpristHUmoTS4BqU0gRc1j3l8ASM1BK7mB2zQjRs7EgbUKLntblVJ5mujtrYNDnFc+usakcvcKVkOaqzWjxeMREnrmsftcECunPWxixea2eGwFkDGsVWGa3eFSg9dhXXn6zRF2gRNR6VkSHW+a1+Iyq8ZC9BWIjZ3q9EEIgTcVCW4KnGag02OVBz6mOSDisjkKvt+e9UVbCcNWlHLgOM8s11HBLdZIi+1cnr2rd4HfCKDQWxUpGnxi3RbN28BXNwOORNa3FuICSAxqck1iBds0gPBBOkHc0db2yqeW9Y8D4lXethbpQM9aDooZI44QD0FYPG5VkmRRy51U/FOeTyqlB7U3aOdulBVGoZwvia3Y7ZBGBWNOgh0yL0NGJxBezzqHKlhAPFYgtwFHhQqJipXVz205bNVGQBTUGzZRK0yL0rYkhUbYFctaXxjlXflWm/FCU3NFZvEYwb9lXlUlgwMKKpMnaTs/UmjoZQI/OqjMuIij5xtUVYYrTkAKEkbms64jxgrsaCmUjlUY6TIxG29MAy86x18b5RlNV5qchqCgmsRqlvTEVLl+9QZsGtIdF742ro+Fx8smuaikxKPCugsLlQBvWpGK6WDSo51f2oA51ie1gDY063LHrWvCprXklBFZd82VNRa6wNzQdzcbc6l5wjF4ie98aDWib5tbbUMgNZaWQf5wrqeFsMCuWTuyCtmxuNArNak110UqhedT9oFYC3m2xqa3LeNY10/jrXnmBXnWNeNkmlLdHHOgZp89aT2xZgC6Peprd9Jwaa4OWqKAGuvLFacMve8a1oJlVN6ybGPbzrRKDs9xW2Q/E7sBDigrRu0TNRvI8ggk4qVmNMYFQFOcLTK3WoSvhapV9q52rGtbzjI33rWtn11zMD5cV0Nie6Ku7DGkOVOuaZNxU8bVFCX5IjNczcEmc710nEPcNczMczGp0I2ozfJ6129ptBXE2W98vrXbW/8A29cO245rj53PrXOzHDA1vceb7z41gS+8K6c/GViTedGWV2YnO+xrJJxyq+2bJrvGK25r3VGVTOTVCHC1CNe7k1MEZxWkMD396k7jSc00i5XNZ07PnTnag5ynBxTUqqrBKeVWxzsnumhqVAfHMWbJOTVwlAU5NZasQcg05kYjBO1EFmcK2c71b7cQuMis2nzUUaLjUTvWrY3iCIKxwRXOhqsEh8aDdvbxGXQp9aCEnnQPaU/a42oCGffam1mqA4NTDiguQnnU2kONztQxkxVby5oDUl8KuE7AbGs2OTeiQ21AYt2SMNTNJrPlT21hJMuvcDpUZ4Xt2w1BNcAGoOBpNVCQjrRVpaXN6+IoyR4nYVnr41yBZM06Qlu6oLegrqrX7NIBm4kyeqrWrb2EMA0wxD0G5rnPTdcXDwqecbRsB4sKIH2cmONTqK7HTEudTAHoAMkUk9ob/JhkZf6sBRTyMcePs+inLSgeu1ExcJVB3ZVbFdQLa7cd7SoPi+cfIVW3Dnz3pU+CnNPKmMH2Z05qMfGnWInbHyIrc/6ZEDlpZT5Kn51XPYWw2YSEdO0cKD+tWfpU8YxZYH32PyoKe0lZe7g10HsFqSCkyxv/AKZM001hoiLsRIMe8p3rf8lrPjji5YnEh1Agiq0GOddBLbhwUPeYEaW671kTxYLFOjYqAbmwI60fbKcUIi779Bsa0LYbVK1z1ghNqvVxiqliJG1MYXHjWMjpP1XSKGFBSoVogBgNzUJQcVYx11rNlJzvUoGGd6eRdTgVoWVjGRkjJrpHNK3k04Ioz2gFd6c2iAbCl7OMVUZt3KuDUbd8rRktoh5ioGFEXalFEp2qoGpTVAcq5VqCbU/eCulsfcFczbHD10VjINAqwaqHAqYY4qiOVTtmrGdQOdUB8QPcNc3KczGtriNwpGM1hk5cmsdKssBm/Wu1h2tvhXF8N3v1rtI9rf4Vx7ajkeOHM4HnWLKMGtbjLf4mseZ+9XTllVzNEWw3qhQTREWRiu8c2lGQVxUgBqoMS6RUvaDWtUTKwCEVnyEFqlJOSKqGTU1Mc7SpUq0pUqVKgVKlSqBUqVKgVKlSoEDSzSpUEgaWqo0qB801KlQTQ96i492UHxoJedFxHvLQdxZQL7OmB+Gsvj0HuBBls1o8NlZ4FA8K1oeFo+me438BUtxqRznCvs+ZCrzqWzvp6V0caRW33ca65OWE5Cr2kMrGK3UInUiqdJ1GG3OP6pBz+HhXK21uTDk4fTL35D/5MZ//AJGiltHkT75xHH1RNgKst7ZLZMYBJ+ZqUin8XwUVlSijghU6E5dcc6RckawhIG+ScCkg1p93jHV2Gw9B1qmRYwxYlnP9b74/QUDyTu+yNknwyRVZWXJywX64oWbiIDFIlZ2PUfzeg5FmmA7Z1Uf09fkKA9zGchrnPkJFWhybUc5EPqS+KFcwRsETse05Y0rk+nM08l1eISrhEU9GlwfkBRCm7Ak5kY+axnFDSquk9hMGJHuh9B+XI1GSR37xmdCRtiY4Pz50BcxyyIctFKo5HIJ+m4NakRVczkyDXqSQEAkjn6/vTWEUihxIiy5OcHO3xrPneVQFBBGdgW3H9qK4PeT2zKTqAA0lSuQR8a2gi6tYS2oRtF5A5qEa9mRvkeNbdxbm4hMns7ptnUoBz6gVlGHScN7h5tzAqGCIHXrVxKY6VjPOYJCjcxTG9yNjWbizlqO0dCzOuNqz2uXJ51EzMRuazq+J2f77NalldBV36Vjdc1dHN2fPetTuF4bj3u2wpjeDFYz3JPLYUxuMjlV84ngPl4iNWMVS16HGKC1AnnTahWfNfASX1U4OKGEgFS7QeNZ8mvASsmk0dDf6VwDyrI7QeNIOKeeHhG2OLFXGOVWPxYhdjmsHtB40/ar40/kv+HhBs148p3p1fAyaCEop+2GOdZvVq+MH2k4iuQ55V0o4rGLf3hyri+2FP248az7q5Bt9MJ5ywoJo8tmomceNMZx403ozlcijGKkFPSqBcDxpxcqOta8uzOV+gmpCKqFuh41IXQPWpva/8rxEMU6xgVSLjJ51YH2zWs6TeXL5pUqVet5j01KlUCpUqVUKlSpVAqVKlQKlSpUCpUqVAqcClTUFiLvWhawmRwqgkk4AHWgIgT6V3X2S4SscXttwMn8I8KluLJrY4Pw0WVkDPjUw2Wr5pTKSoJ08tuvkKe4nyM525DFV5MKZ27RumPdrlbrpIZ20A28JAc++3hRUEIgQZyX6A88+fnTW8IhjDHd/DHWiok7Ma2bvsMjyFRS0lNySZOpPJaqmAxgktnpndv7VMNqGQCEXlnqaq1gvhBqznJ8T5UCY4TvnIGxA5Dy25+gqiRoyrEqNQ55wdI8+gqLM0rbNhfd1J1/0r+pqqYaZOwt0BdRkqfcj8z4nyoAbm9WE91e8+yYXLN6CqfYpp9Iu5HUf/wBtCe+f9x6Vq2lhgtLrOs+9MfePkP7betSxpBW1RY0zhpSevrzNEAra+zxlFMdlH/Sgy59TzqrVaIW7JHkcnOw3oic2drlJmaaQd7Ry+a+HqRQcvF5WHZ20RjONtAAwPM0EJblkbPZXAGdgFqiedezOsyKSPxoDQs9zOWzLfOG6BTyof2mZfelZlPM6gc/OtRKquollQ4wV8xn/AIrLhAiuRFMCVz7ueXpR8zgSYOVDe66jY+RHKqoFb2yGUadWQCXXYf3rbLfsg+km3ZlKkgeFNNc6pCkihWPNhyamsb28jRQI1eMdDgfWpTtFdMwMXZy9Y2PvehrDQDitkzQCePcqNwOorAM48a6+A9iwQktAdgWG6nwNYnHeFCFu2gHcY7gfhPhSSX6bWV7RS9oodlKmmrfjE8qK9opvaMUPSqeMPKiPaab2g1RTVfGJ5UQbg03tBqmlTxh5Vb27Uu3aqacU8YeVW9u1P27VWiM3JSfQUipXmMGmQ2rO2fxpdq1VipDFTIbUxKx61ISNjnVdKphq3WfGm1nxNQzTUw1ZrPjS1Z61DFIDwpgszmmzvS6Ux50EwakrEVWKkKAiJ96LWXu0AlSZyBQ1m0qVKurJU9NSqBUqVKgVKlSoFSpUqBUqVKgVKlSoHqQAJ2qFTj5+tBsfZ/h/t/EUQjuLuT4CvQ2ZYoV0AKijujx86wvshZdlYPMR3pjgf7RWtKwlb/SDXLq7XTmejw6mJduY33/nSrLde1lDHOnOaqmOIxHnGr3sc9Ph8aNto2jj1EjtGxy/D4CstCVCtIWbAjTmfHyquR2d2B7ud2PgPCrW7gAGCsYz6t40LKfdjU/eNuTQSeTVqPuRJzx+VRZSihW7pONenoOiDzq1Yl7pO4QjSg6tTyjQMkbg7HzPM+vQUFMgMaKoCCZ9lHSNR+g+tTSKO2Q6uXMlubE9TTxxGFTK/edvp4UjpKvNMRoUfiqCqQ9shaTuQDcKDjUPEnw+poC6uZJiI4CYkxgMo3I8FH4R51EyzcQm+7ysP4c9R4nyq6OKS5lMUG0YGGkA3byFBmGBIwCi68fhXfJ/U00nDppsNcSezoN9GRn5fvXTRcNWJQSSMD3U6fGoN7LbMQqxjwI500clJY2kOrTqYnbLKT+lDTWYY6kXA8AcfmBXWz3Vuz6ZVz4Ajf13rPuI4JY/uwwJ2yhx+mK1Kljkp4NDgPGQh95sYKjocdfUVe8Y0RSEqAmSVG+kYNXXNnKNfZuZVH4eTDxwOR+FVkH2acj/ANLmBvnYVuVMT4akJhH3kiMR3SwyPjijLpdKr2664/8A1U5xnz8qosr8ezIsoWSPAJDYz40Sk0NyNUMhGBzI3X9xWaLI4u3RlkGZQB3jyfwpo1WaJ4pATkYOf18xVauYZAoyqrsyjffxH7VfJtmUAa198eI6Gsq5DiVkbS6aNskc1bxFZzDBNd5xbhy8Qs8xjL41xnx8q4aVCrEHY9Qa683WLMQzTUqetIVKnApCgalT4pwPGoHiTW1GpagjlVcGBRqyACs3Rt8K4ZGLYMQMmg+PcOSNA6gZozh18EhCk8qH4tdiYBeYrjN1v1jmRETJpxRBtTooiMKJQauZ1xXW1lk6SCQelICpSEGRvDNNkCqFopBafI8acd47DNQNinC+dT7KQDOk1DODuMUEgpIpdnvTqwA51IMKojoxTACpFhUNQzQWrimcbVAOBTl6AKlSpV0ZKlT9KaoFSpUqBdKVKlQKlSpUCpUqVAqVKnFA2KJtkLyKqjJY6RVSrk8q1OCxg38I5nNKR3tons9lDHkd1Onyp4VBdFzzyxHlTHGCo5DA/nzqyHHZu+wGdK1wdlkEXa3JfAKg7Dz/AJ+VGw93v8guy/6mPWowRmCAf1YwPU1a4VMR8xGCTjx61LSIO2kBdWyjUx86Ht++HuH3LnCjyqc6lwEHvSkA78vGrXxHJhFB0DujxPIfX8qKttULyM3IJn59flVRLPOz45HG/wCEVfL/AIa0WMZLNzPj/wAmorHpwre6u7eZ8Kgq0mWVWbIHPB5AUDesbybs8fdKchc++fE+VF3EpCE4yX5VXaWpkYop3PvvU0QgtjNIYo9oyfvGG2vyHlWoDBZLpyobGO6M49BQ9zdCAez2SqNOzP4eXrQSROSWLnx2zRqc1oNNGxywkOP6gaqkuLcg5nKnwZTVIWQLtIc+OKhI1yBuVkXwZc/3q6vhVclpFcIxVoJ1+RH7Vk3vDVyxjLxtnZ8kj0OP2oq4aJe/2eluuDQJklL/AHTSY8c/z61qVjxrHllmhm7O4VgfwyDc/Pr+dFyQs1m7MwXbc5575+tGyWsk+7IrBhk7daquLZhYmMRkhf6jz2O1XTKz+H2bT2zdi/eOxU+HT/g1a0PYYMYxKpwyjbJ8cHkfLka0uB2zaWBLCT+o4/LrRd9bEPlkCyAHDnf4j9j9KWpjNijF1b6vcdeXSmgmUIdR1Mg76gc06/Kq4VeO61a+8diTk/A+eKuuojHMs6aSCe+B59f0rKDuGkAzW/Mp34yd8qa5T7XcO9lv1uIxiO4GfRuoro7ZhBewONtLdm3mjcvkau+0Vj7XwmZAuZID2i/rWublLHm4U+FLBosR0/ZiurkDwabB8KO7MUuyFU0EFPhSwQeRo4RCl2QoBFZ16VMSvvtRQgz0pzb4HKoDbXeEZ8KHv3K4xRduuIxVF4uphXKfW78Z3at4GmMkjDFE9kKXZCumM6CCHwpaT4Ub2YpdmKYaohtzI3kK1rGyUEZWn4dAGAGOZraWMRAd3FQlVewho9krHv7AKTlcV1MMvcIAoPiCCWPlvUari5ImRiKgFete7tsb0GqajjFaZDYalpNGGHAzTaKYaECmnCnFE6KWjemJrNpqVKthUqVKgVKlSqBUqVKgVKlSoFSpUqBUhSpwKCyM71ucBQm/jI8edYIO4xXUfZyErrkPuqu/qdhU6+LPrp4n+6d98g9OtGWUWpo0J2TvMPHrihI49MUcYGSxJJrT4cuGlkY7Db1rg6io1OsZ37PvfGo6Mk+e2f55/lU430K7beJ/OqXJ7HbGSAPjWVNANUzSnbH5VbbL2s3x1MfDw+n51Ap2duEznVz9KuX7qzeTPel5Y8P+KCBcSz6iO6pyPyH71BnBk7Nepy2amcRo7MoIUZIxzPQULFlI3c7sxAB8zQKfvyqibn3Rj6miJpBZW4giOZm5tVUBWFHuXzgDCfvVCgyyNLJu7fQeFS105508ceAM7mr1plWrVUCsuyGM8hmkR4irgM8jj4UmVscs1QHLCr78j40MbNM50gEciu1aOnfwqDpvtTUxQqBQdufOq2iznG1XsCOlQwaaZAnYmLDRHHjnejYZY72IxnCuoxg1SQdVCTqY5BKndcdfGtSsdcapvrMW5y2UA2JHLHT+etC5WWFkkU61OlwTyB6+ldBBInEIWjlwGxjnWPJaNbXGl8Ef5bEjp0+VbcABmaPTsMqME+Y3H8866WdlZ4ZPwyDSR61zNyCI1UnvZ0k+YNb8I18HQ5yVCt8tqzo4LilsbPiE8JGArnHp0oLVXR/bOAi8huMf5kYz8K5gnHOu/PuOVmVaGqQND66cPWmRANOp3qgSVJZN6g1LWEPzotrUEbUJYzDNaIlXBrFrcijsNC7b0BcjvVrkjTmgLiMk5ANZ5+l+M+lmnl7h32qKnNdWEs0qWk4pwpFQbvBEBAPWti4QNHy3HWuc4bcNE66Rmta4uXZB0qqssInkZt9gatubXCknpQ3Db0JqDYBzV99fqLcgczWFYl2ACcmsyIDU1EXMxbmedChwDSQojFVrETnbarLdhI29altCrY1DarEZnsrFchTVSQMZAoBzXTtagL3RtQbRpHdJq61YOIp+lNSrQVKnAJOB1os8MuVXLKqnwZgDVAdKiWsZVBJKYHXUKYWchG2k/wD3CoB6VaFvwPiNyjNBaSSheegZoe4sbq1kMdxbyxON9LKQaAelTlSOYI9RTUCpUqVAqVKlQTiUvIAK7vgVvp4fEDzlfPngVxdhE0twiLnLEAYr0u0hWAYG/ZRhR5VjutcrkBNyxHuxrt60ZbDTbhR5k0NEoWKTfJPWiRmOMqOekKPjXGusWXB0wnw6/H/ioqhIVDuR5+NQnbU2nmNXLPhRFuNy7cyM/OpFSmGqQRqOS4Hry/epXLqsqR80jXJHielStgGnZm5rvQyMHmlncYRTnJ8elII3cjLEiH3idb46eAqBQsyReA39Tz+lVFjJKoIPfbJ8gKmHOp5M4GSD+Z/SgjdOJJUhU91RqYD6VbGBQ0Cl8ytsXOf2opBiudd+ZkTAq5BvvVaCiEXYVYtT0LjHI0tOBg71IDfzpMa0yoZOtVMu+9EnfNVEVmrFDLVRWiSOdVEYNRQ7A5qi5TVFn4UU4oeU74xVgzbWUwXAyCYzsR5f2rauUSaLLkZ93X+WaxW+6mUn3WOPnWojKdULgmOQcx5jOR9a68vP1GBxeI27MCMbBxk+B3rd4V3+FkeArNu2FzBLaz7uoODjn5itHgWRYBCdWBilSMj7XxBuE28mPdbTmuEk2zXpX2ii7T7PSDG6MD9a83nHOuvHxy7+hWc5pazTNzpq2ylrNWRMWYCqavtf8wUo2bCPFaOjY0JZDetA4xXKtRWq4wDVkgAFRPOq7iVl5eFZ5+rWRxQ6XPpVNqxbGao4jK0lxgmruHgs4ABrrfjDSSLOKkYD4UVbwEdKtK86xFUcOTErFhy5VqlV7Ik8sVmW+e0IHTnVtzMyRFRyrRA7gaiQcUNKzBTkk08cwklK0RJAWjO3Si2YxZZDvmhjPvV9yukkUCedXlK1eHPqkz0FdJbOpAGK5fhOTLtyrpIgAoI50RuRhRHg71hcbUxyI6nrR0V2Ave51j8WuxJIADnFQclSpUq6C60Gq6iH+oV09yNcYdguosFGR5VzvDE13qeW9dMFzPbKw5zA48cVLVjN47CtpehE7M6cNy5nl+lCi2SWCRyAFXGRq3yfD5Vfx+5aXjTOAFYoMgctxn9apGUwwBGMbkVdqO4//T7hGZWvIL2eERd0xgAhsg439fKuZ+0tpNZ8amhuOIm7mB70oBznwPnXTcA4i3DeCcPcbSX1/wA027q4HLrua5n7WEj7TcTAGALhuXrUGVOXCH73f/UKaCB2jVnSJlY4yRUZZMrgjVvnJraV9PDbGM4C5158c5oQBxHhUUFmZkOCAM4rErreNYHCpMHOSOlclUi36VOFJNNU1IFVG19m4g3EY12LZyT4Cu+QYhTH4jqx4npXG/ZKDVcyOeSrp+J/tXarjKDy3rl39dOfi2KPugA7N1/WrFGqWFehct8BUymhcdQppodroD+mPn865OipDqdz4kj50ZnTFkDmfyoS2PcydssSPyouTuRqOYAGfzoEzmO2dertoU/nQ857ONbf/wD2OPIch86JMY1xRtuI1LN6mgLmbaSTGWfBHp0oIowJkc5wq/mf7VRezdlYIuO9I2Mfz41ZEAUVNXvHJ9B/DVU8DXlyq5wEOf58zSLPq6C4VhjB2HTei0dTyORWXNw6dMEMwA5EHIoZLi4hcqxYN01Cp4uuujjxiik2BrF4fxJZCFkwD1FbSFSAVOxpJglTY51FjtT5yM0EGPSo0+5NOV3x8aiqiM1W9WsMCqWrKqJe7QrZL+dEynV61RIumkRncQOmAtjkc0czZiRwT3SPlkH9TWZxZ8Wz454ouyft7JFGNRH6V15cuwfGQyvqj2IGx6g/wVtcKI9mLjZXIbbzGax+JnWSQcEgt6bD961eGELwtVPng+m1WsQ/EkEnA7gf6DXmNwteo8QP/g1zjmEPL4V5jcrzxXT83PtmtzqNTkGDUK6MFV9u2HFU1dAuWyeVBv2RyuaLdsLzrOtnwuM0Q0oIAzWMNFKaGvH5+lFQoX5ULxGF0BbpWOfrdc7dHVcGtngsY1gnwrEmH3zetbHDGKAV0vxh0iIAKEnbDMAacXBC86HLF32rGKvtQFU55moXzBYjjmakgKjehrg6m35CtGg4O5MDW9AoaMGufkOk1oWF53NJNUt0Hxi3CEsorCPXFdNxJhLGRXNsmJCvnSI1ODrit9AAtZPDI9MYPjWg76VOTUDSHJOKybontPjWkjgig7iLUdVWDnaVKlWxo8GGmdpc7pjFdFDf28l9YS3XcSN3aYqOnlWFw1NNqW6salcNhDjnyrK/0t42LaTicc1tL2gmQSOM+4Tnu/AAVV2riFoQ7CNyCy9CRy/OhYdUrjCf5a/hHzJq0OQduta1HYPA7t9kbVB7yh9vEyZ/SsP7WTrcfabiDoAAZ2Ax1wcZr0DgkNm/2b4XxqdgW4dbybeYzj+edeX3bNJM0p952JPqdzUAE5OB611MtuTwnhBAP3xGCeWwxXLXA7q9a17SWSfhcSu7N2SsqAn3RzwKVYO44mjhjbg7jka5Kuov118JkI6YP0rlzzrPK9fSqSDUwFRq2AYJbwFaZdv9loBFZM53LnJP0A/OultlDXA6/i38uVYn2fQxcOhU+Gfpn9a6Dhy5cufhXDr66xdPhXPXAC7eu9VoWWGeQ7Z7o/nzprhwznp3v5+tPKSsEcZ5swJ+Waw2a3QaYkBzyz60c8YkmVOhND2g1TJvnYnNFIT2rtjZRt60FMzE69OxkbmegFY10+oqrHGojHwrRvWxlQdz3B+tZyp2t+icwpA+W5/MVBeWCPM2MaAqiudvvtA3D7+SOMBn0r3MEkk79K35t7Vzjd3rnZra4HFZr62ADKSclcjbbH051rnN9r7/AKG232unRSbvhkyopwzKfd+BxWnFdcM44gNtOomxkKRpb5Hn8K5xriG9Z0mzbs8gkGsZAbYkb7EZFa9hwyK/umk1RsgkMjylVTvHooHn4VuyJOrvtG6sJ4WyFzp5EVq8LuJdASTmPjkVXHI1vO1tM4kQbK55kfvVyBY5dsb8jXOu3LRBJAAqwDu1TDkr4mrHJCjbAFRTqQDUts56YobXk7VMvgHNDDNuxqh+tQuL+KLm6g+tZkvFUOdG+9Tx00e1VTEaQPKsmXiLMeZHnVPtzncnYVfFnyU8ak0IwbrgVocIGhrcEc0JFYvG5O3t1kU9etbnC8+0cPB5dkwP0rXyOd+hOIYBgK7ZSTP1H7VsWylLOCM9Ixn1J3rK4ipaWFRnvGRP/wAga1YmycHYDPyG360tZid82eEzgdR+tecXSMM5FegX8oXhsxzgFtPrzrjrpAQdq6/n8cu/rnJfequir2IK2RQyLqNdKxDqhNFQoRyFX2trqAyK04rMYrFqs5dQ5A1fGrF1J8a0VtAOlTFsAR61m1cFcOQsSvWr7vh5kRlVskjlStMRPk/OjFmRXOphvV4K5Zvs+xfUTy51clqkQ04wRXRnRu3SsPiEqI5IO/hXWWOd1TnBIzRdvECurxrFWRmkJO2TW3btiMCsNRKYBEzQD97Jo2VTIQoqPsbEVFYt0hBJB2qmCUpIN607y1ZENZip360g2R9Sb1nJCXuDit624c00OojbFSg4d2TsSKCiFTGgoe7ucDANas8QER9K52VWkZjuakVdBd74Jo+MdpWHgo1bnDTrQE1UcrTgEkAczTCul+y32cl4lcJPNlLcHOerelWtSWqoUKwKijJC9KFucCMA7k7k11fGuENDAZbQKkcakFFGCV8SetcfcsX1EbgHSB41Jda65vP1XCMBiKkx3PlUkTTGoPMjNLYVWG8t5dcP4BNYThlSebvQiUEoABvp6Z2IPKsV21AEjlsaiAGK6cnPMDenjGdWetVQ7JqOAdwMitLhv/bgdM/nWZc5XGOdaHBTqj0nwP0qUaDgycJuAOkQauUPOuwsRrjljP44nT4iuQYaWIPQ1nlejVbAeY56tqqq+0GZkAGTqrTL0a2ASBAp5Lj8q3rEaLfUc8qwISCuM5wB8N66OEabY+Aya89doDbLyoAPxGnmbXcYOQVj5/E08CntQc7DVtVT5a6k3HdASsRpo2AzqbGNh9auVitsT1Ziaha9yGRvFjj4AVZIAlupY7Iuaoyp5B7S2+0Qx8aHsBm91HfSrt86UxCh2bJ7xJ88bmocL3SZj/6YX48/1qKI0Yt4w24Mm9V8OjBViQNzncc6IuF02q+GCR8jSsY2WIEAnNSt8RaeH20p1Swxu3iyg49M0NLwOxByII85z7vlitSMkDcYFJyPL4U2rjLj4ZCjL2TPDpIOxyNvWrrwASMygKAc4HIVcWJbu7AVRcHKnz51nWpBNs+rGDzoi5IAA8qEsRpAzyq64cEnflWpfS/2FknWIksQBVJnklcRoO84JAPPHjQUj9teYY9xdzR5sHLmWKV0kPMqedJZrNc/POMkmAklHkOu4VBheeMjn5UVYNbzMAljOzmPWq9qpyMgdcY51ZdWt3b6j2S3GX5AbjP+k+fUGq4uKWVikjv7QbpxpOqLTj/SB0HOusyuP/WrbbinCp7trPsZILgfgnTGfQ5NXXMMDDGhflWHbaOI3LyvGyMpysnUH9q1gGIwTqI61nr03GJewhDo6M2wrZsO63D25EJ+dZfERm4Rc74JNa4Gm4tY1x3dA+lP6Z/tVfAHiFuMEhXJJ+AosbbA/hH1JNRuoibjUeQbb5f3q9I8zSeAwPkBURm8Yf8A8KxyzLt8K58gyLmtvjrhbCNTzZ2I+dZluoaHPnXXiuPf1g8ShIQnFBWaanrf4nEBbOcdKxuGjLV030y2beMKoopSFqEK9ypECuarRJUw2WFULgmrlHeWpVFae7QpgMtxgeNFj3RSsxm4JPLNTkrStuG64gCSdqz+J8KUD3a63h6KYQaF4tEvZMcVpHA+zAPgjka0YkAAFVyD74+tXoaQThQGTFbNpYCSM1ixNpnBrseFKrQ5oOW4zY9jbu2OQrkY95gPOvSPtHGvskg8q8+tI83KjH4q3Edxwu0BsU26UPxGJYcY8a2+HRBbNB5Vj8dOHUedQYd/JiEgcztUrHhitCCRzoe77xUeddNwyNTarnwoOV4vwxY11AU3CFBIXwrc+0KBbc4rH4SuHJpvoT4Z9ko0Ie8bWf6F5V2VoqxKqQqFRRjYchVhhCjApxhBsK53q17uOJFd4q9m2R3SDtXkswAc6WB7x2HMV6RxniUUMDRuW7wKkoOQrzyKAmQADLFjjBzyrp+bl+2X0t9nkMgjUanCj0FWzWUkELSKe1jK4Ldmcefp61o2qY2X3hzJ8a0e0ddCrEroffZnGAOtb153LyxSpEk/awuuygRyAsvqOYpKxKjPhVs1mpvX7Nx2ZJK472PKnZFij0YDSfiPh5VaQBdjIBxzNF8DbEuP9WPmKHn3gx01CieDwuTJIoyIyrHffHpUGvYZS9B6CX6NXM8Th7DiVxH/AEua6qM4l0rnJTV8Q1Y32si08WMoG0qB6xPrV+MStDhMOq9iLNgBgSOprPG1H8KP+OgUHdmyfLwrbEdvZOTE2RjDcvjXVggQMvpXJWRy7ADA1AY+NdSuTFvzOk/SvN07xXDvMV8tqFi71xMSO72mkfOrlbs5iwOMfrvVMHuyNj3S7fWsxWkjEWkQ6vuR6tRF3jsyvi2KHTAaFf6VX9aIuwNOc472foaDm7ss0TAYyQQPicURZLps5sDYy7fCqZciRFGMnH03/SirQf4eNP8AVv8AEmiiOIIFgA293A+VW2eVhGMjaq+IghFGM880VbYEK8tqOnPw7Fif3qtw2MnpV7Mo3oaecYIzWWorHOqJDvjFVC61MQKfOo1GhkJ7u1VXUhEZJ5mrrcbGqLxdSkVUZtuuZGbHOta0nIHZtzxjJrPtcE4NGGM4z1FRBxwy4IFCXEEcmSyKxxjerYJdQ0tUZRt5U1PFlywrGe6ACdhinchIsCrpCN80Fdy6I2YkYAzVnszGSR7RxbRzGoL/AD61rwtru43xsZjj0Gw/Ksvh8RiPatuwRmJPif8AmtS3Gh7YjYZLflXRyaEseqVR/qU/nUoPdLk+8c/WpOwUyt1Vcj1ziosezhODyX5VEcz9pnx7Kufwlj8TQdln2cVf9qTi6hTO6Jpqu20i3THhXXlx6+geLEi1f0rI4ZWxxcr7HJ6VjcMNb/pl0ER7lQkfFMh7lRJBNYaSik3oqNsuKEXAq6I/eCpQfnu1fw8BmOfGhc92reGv96R51OSuzsFxDQvFziE+lF2JHYj0rP42fuWojkJGzKT51ZGaHJ73xq2LnVguQEyD1rruFPiAVycQzIPWupsFxDVAf2il/wAM4HhXI2cOLhNutdPxvOCDWVaQ6p1261qfEdhZ7Wq+lc5x9/vwK6aBcWyjyrlOPH/EgVBjTH7xfWum4ZIPZxXMuMyCugsEIhFKKONuHiYeVZPDtq1OKIXUgCqLW1ZFBpFdaz+NYXH+Lmzi0QjMrcieQrXvJ1t4Wc7kDOB1ri+JdpdSGWQkDOSPAeVY5m16++snoJJPK9kpldgJGbUT+L18B+1Z8E627lot3wQCRsK0eLGS7sFEIVuzYkKP6MbfrWFFKxARzkDkD0r0SPLaNjZ1jeUGTSCNTA7ZPLPyoiC5YxMuksp54XIzWfkvgEgCu5+xVjwy6gmjkhiurtFMkdvIxUOeXXn/AHq1lxy3KrJERGwkXcuTn5bcqZm1sSAcE16H9ofs9HJ9n572exg4ddW3eVYXyrrtkEdD4V5yQ2eYXxqCqTeHlRfBpFW60lsKVJJ8uv0zQ747JwoJ5knFXcCUC/WR1yqlVx/uYL+tSq0oLghk06cBySfI7VV9rYs29nL1GpD+dDrH2dxIGJf73So58ia0/tTHjgcJOciUYz6Vj5Wp75cgq5AHia0ODjVxSIgDAb6Cs8MQta/BojGXkPPYemTW6xHVWG6qRz7Tf4V06tsmPxRjFc3w9cNGCcfiP51vrnRb/wDx+lebp3iFwdE+eXd+mSKSqUtsf14U/PNQu/8AMXmckD51a+/ZLj8e9SKMQk3S+AbHyqV8x0REE4K/tVEDkzMT/URU7g5W3B5BR8elQZbqTeKPDn5bf3orhgLaCeRYH6tVEn+ZcNywKL4dsq9MLn6GkU962QPJc/r+tPFNiIZNQ4mdEbnOCF2z13H7UNauGHe3qV04+DO0Zxty8aBvSxKpyBO/nR2oYqEiCRcN8Ky6BYrYAajTKfvsA7DrU3WRAdOSfDoaaz0mTB5jxrStG3G2aGvThTitKNY1iGCckb0Begdk+9Wxhkxs6gONh0rbiKvED4islB9wF61o2x0KF8qwpMpVtqTvlaucZGaGkOAauLAlw3Misq+fWqxfikYKKPuGxmsdHafjKqu6xZ+eN/0rcjHdyDioCsBsCVX+fCigSktqo5heXxqmUL2kMa82fPwG1ElS3E1HRUGSfHNVxE3DAF8nALDPzzUIyHZF6M4z+lUXzZlRQdi+DV9u3Z/ekeL+mBtUHH/aSftOKyEcgTQUF7oTSTyqHEG7W8lbpk0DJsa7Rwv1dxG87RCinOaq4aMGh2GTRVgMNWtMbKLlKbSQeVWxe5SLAVhUApPSpIuHFTUqakpBfaoLc4WlYyET486k0T6c1PhkY7YFueanK12FhIRBv4Vn8amHZtvyFH2+kQ7VhcdfKsAarLATvSUXGtBQnSwNGxvVgnGSJB611PD2BgFcqvvZroeGv9xVA/GuRoCx/wA9aO4sdS0JY/8AcCqOnDYtx6VyXGG1XVdYw+4+FclxQZuvSoM4j7wVv2kgEQWsKQd4GtCwdmPOgNuE1lRirAoyqgczSVSWz4U8AZ7jlyoMC044W+101tey5tZcwjwU9PrRPGuHyWzAKC69f+KwoPstxC9kaaWSKEuxbDHJ+ldrawTSWMVvxORGkjGntlBIZfPzrWx0zq+3HS2sqsojZ41kjyevw8qE/wClMJVVWUlsADBBzXarwOOR37GQ4HIt+WRVA4VIHXtomCg97MoU4+NXWccs/DJred7e5Qxuhwyncg/CrouGguhSVlYHIOcV0c/C7riE3atIJHAChu0B2HKo/wDQbxc61JAH4XGfrS08QTQNPbYuridyp2V5dQoG44XDNIzoBGCfdQbD0rSl4dcRHaOcLjmdt/hTJZ3DrkyMF8NyfyqaeLHPCQmpBJNok2OkYDdQPnRsUFvalCsaiUntH1SADUOWw6DwokcPEj5Ey56kpmjV4Sxt2MMrEgDUQAcH06CptWcAEMfYgQxoCx3MaYJPqd6C+2MnYWVnan/Mf7xh4DGBXSWVvHw+0PEeJzNIOUcSc3PRQPH8hXM3PCeIca4hJfcQK26yHaMblV6ADpUn3aX5kc3CqFxkFgozgeNblhayiNiwK5xz6mj/AGWy4aNEaAv1ZjlifSpQu0pZmGN+tW9ak5a/DAGkkJ5Dl6fwVtIVCJvkLjf4VicK2hlbkRj8q2cDU46DFcOnSKJ8yTIAObA/Wrix0IdhnOfiaqTeZc81JP507EkQLjIChvzxUVbbvgy456j+VWyviK1Yn/SfnQkGzyLnJ5/U1azYs18YyG+GaKplGRPnyxRlj/nMh5YA+FBSFWdsH38j6UZw9hrbOxwD9DQU8UGq3YN+LGTWJbcSFnc9jcd1CcJL0+PhWzxg7EDdQdzWObeO5Vo5sBSPDerJK68T03ou+uVOQetWqNuVcxwoG3draSYwdl7rs3vgnn8K24prlFJIMif1AZBqeDW/0NMWTjnVD25V9Se8KnFeo2dQx5qasWRM5EqY/wBRwaeKqmklQd5dqHkZ5juML4UZLKr7B1OPOqWyB+tSohGip5mrgRnIoYSd7FEIO7WaLWbah5TtVjHFBzSY5VYus/iE4hjZ26ch4npQH2fjbXLO/PfJ8STVHE5jNxBIhusfePma1eFJot4kP/mMPln9h9a6Rw6u0REmvixGO7EuAfP/AJokD/xBz5gVRw5g0s0mMlnA+Zz+1XIdmk33ZjSsg7l9V2Qm+5+dEXr9naS45Kmmh7ZDNdR6jjVljVPGpCLTSh3ck7+HSk+l+OPlkDOx8TmhZWHjV0sLY2NCtCwbeuscDZzRdkPlQ/ZkDcZq23kIbBNUrbjbCUNPKQ21PFJlaqlHeyagtSQ0Zw89rc4NZ8daHCf+7Nc61G+YAY+VYM16LO7wTtmukY/dfCuK4yc3RHnWeb7WutteLq8I3oHiNx2gPnWVaSaUAz0qVzITjeujJJuRRca1nxvhxmtCNxjY1YixT3sV0FihEArHsIDLOCeVdPbwhYRtVGLxMkYFU8PObgVdxZe98aH4Y2Ljeg6aRsQ/CuVvMPdE1v3E4EJ36VzRlDzMaiyahMuAKNsVATPU1n3MoBAq+3n7oxSGNcHBxRFiuJGJrME22TkUZBcAIN9zViNC3iQL7oq4oMctqCcv7TJ2D5XVtttRCXE6jvxq2PDaub2HVMNlcqfEbVTPZRzYZ8kg5586KW7jPvoyH0qwPDJ7rg02pjNl7e2T/D2zOv8ATFPoPyIrOP2r9hLR3FrxGFj0aYH8xXROuBtQ08KzxmOZEdDzDDNbnTN4345iX7UWskjNq4iurprVh8qSca4fMwI7eOQb9p2Kg/Q0/EvstCZO0tnaNDzTmBQJ4FLCAElTBO5O1b9Vyu8t2G8tr0Ikc5klB/EmGNFQmZLgBxKjJuCcKVP61g2vCGa8QLMjRqAXYAjHPYePLnXVBAiAHOwwATyFZ6uOnHPl9YvEeI9jOO0jaSbfT4KvrWVPfu+0sxVTyih2+Zon7QlZr2GNScqpLBfM7ZqiG20AdnD8awz1MvoNoKoCqCIHwO59SdzUw+6qB0OcbVK4Cxg9rIMg50jc0Mrjcr1bAz1qsuk4RH/hFPWRgfqK04u80h574oXh6aI4R/SoOaLhbVG58d8fOuV+twNGT2jk+GfoafUe0CjkAig/AVW7YjkbqVAHxqyJf8Rg9HX6CgkiD2uYDqox9aZCTJ2ZPvxnHwJp4CTdAnJYp+WaYt2cts/g5B+NGg0T56+6x5+laHDMdtNsdk2+R/esyVcXjouwLZ/MfrWlwtwbht8Fl3+QoG4mgy679aylXWmpfeHKtriK5ds+v1rKthpYr54o6cUyRx3C4kQE+Y5VdGt9Zn/BzFlx7jjUKse21MGQ6WHXxq6OV4tpUP8AuWtyuvqpJe2TRAX1sUkAwW0dfUVOCPhdxEG9sKt/SzhSPgaYvFNuCM+BqmW1gc7opHmAc1tnwn9IXLWUVpJNHdGVVJGVYYyOlYFxxa6a8aKxUGJdu0cE5Ply2rTextkbV2ajrVXZ6pNMagelS4eOf2u4aLiTLXEgZttguAK2VTcChbaNYkA5k86LDYQmuHV9opmO5FZ1y4jgklPIDajJGyCaweLz9rIttGcY3Y+FOWOqz7aPt7ieTIJ1BB643/OtczKtyqJtoiYjA8sCgogsYjjUacDUfU/riorIWnnK+8VVQPVv2FdXJr8O7lqd+eWJxzPSr5z2VrjkcYFNax6beJRsTio8QfBCrjGdI8/OoI23dtpJgcHBVfyrJ4yxMgRTsu1bcY028S4yNyc1hXsbuQ3MlskVeUrN9lEgO+CTVcvDnx3GB8utHqcHGPhSCsp2D5PhXWY5sGe2li2K58RQjq0TBtO3l0rpLshomPZlcKTmspQjWTq3vEZq4im2uwW0k79M0YyO34TWYiI0iEA9K6KyQsQme70LVMQEinwo/hQ/xJoma1GcFdJIp7S0MEwbVkEVjri41K1pG+6+FcXxc/4onzrrp20xb+FcZxN9U7Vz4i1K3n2q55s/Cs+I92pSSFVrrjFFiXvitO3OMVz9u5adR51uwjbzrn33Objr+fHlNbdjOsbbmttb5exwDXCPPKkpAbGKJjv5Oz3bNdufc1jqZWvxS7XxrNiv1jkGCM1j8Sv3xz3rLiuJZJ1GrmatiY7S64nqjwDQMbljqB50AuogAmug4JaLIuSM1y7lb4sn1kXrsMdKN4fKNArY4jwyOWA5QAgVx8k0tpIyqcgGs9c285FnU10c84EeTWYvECG97GDtWY19cXI04+VUsXU95SKzx5cz21cr1aCDSuSMnrVvZ1eNIGBUgVFadQphqDwL1UUeNJpmRTRGWY8cgw9DUSJV3B1DwNaBhGRvUOyweVVQiSI4IIw3gaCuLEvuoOG5gda0Z7Xtm8DjmKrEc8S6QwYDx2NakS+2cgjgmURhgMbhvGo3/E0tkzI4DNsBR84aWP7yHb+rwrz7jT3A4rPCXdipADgdOYFPHadd+PLVPEY11MoZiTks22fiaFueIuybyKqnogOT86yYY2B94s58AWNHpZP2eplEf+pj3vlVyR59tDiYu2NJVWOCW556Udax6+yUZLayPif+KoWz0Pqw2Mbu+3yFavCU7W6izvhtRpasdHCAgJHJV0/KrAdFq7dFSqyNII8Bn4n/AJqc+3D2A21DH1rg6BJci1QeJWr7f/uD5Nv8qDu2wkCk7jG3r/BRkI09oeRywzVRCByTGw27p39c1bcDVanxBDA+dVxLiyRvA4FEle0jYcwRUaZ93n2wOMAP3h6/wUXZMBexg43GPp/agbsMIInIOY30n0NE250zoRzyp5+BI/WqjUvk+89RisdUxcsPHetm9A7PUpztkVk3XduFYcnXb4H+4o3wOjXrVmNsEVRb5ZQc0asWoHPzqx0CPEGOSoNQNunTPwNGyKyjY7VQzeIFDQb26ZzjPqc1JUCAtj0q44NDytvgVkTjOpqtlcBMUMsypkUNc3RVCwGpuQHSoiHFb9bO1dhgvjur4msbh6vLqkmOSy63Pgo/eqOKGSaRIdWqSQ4Jo6XTBww+MxwAP6RsBXSTI5X6rV2kVpMEs2SB6/2xUOGDUJpgAfvgq+eBgfnVrDsoiBzUFjj+eVE8Fg0x20OMsWZj5YxVZbcKaezXmQurP0H60BdN2l+ka8o1yx8zmtVmwjMDjVy/2jrWTaBpbq4kI22/nyrKjJ+4AhHIAemc1ktpwvgSRvWxeDVIwzzK/lWFcHDK22kkkitRmqZkWNtWnI5elWCcLHrWM+Awam7KEVsdw7MKrSDTcBfezvuMKR41uVigpXeRZQRpJ23oNAoiIK5ZAenWt10QzPHCO0J5ueQrNuFjikmGC+oZHh51rUYMK67hQfwnlW5FgOhDYHQVm2wCSZA7xNb1jM0sirHErMOauBVRdb3sUo0TMNZ3DY2o+1iGj2iR/uge6uN2oHsrjWYvZhExO5Humjru5E9vFa25UqmzAjn5+laRTcTe33XZqhAIPIbLXHcVge2u3jk552PjXdWumxDRqNTOO7jesrj/AAzVFHI2e03yDU8dHIxA45VJ1yKJCBTjFWaFNPBNBQDRMrYziuu4Nbw3ewZdZ/CTvWBoCbAc6uiTJG7A+Nc+vzlu1rnu8zI1eOcOS3kxkLIfwisbSwGA1bMPDoJI9Ury6j4ULcWyRHCZI8TW56LdYt5aOAGcHvcqDjjKzAjoa2JHcHpgeNVrb9t3wMA+FXKmnikzjxrp+AzdihDda56O1KsK17bMa5Brn3LG+MrbvbxexYDwri7sdpMxHU1q30skmwO1Z5hYHPOrzKzfVW2dqoj8zUru2BjOr4GroMqMrUbpmkGNtq1ia7K5vuxxoRpD1ApQ8UhkdI8SCRyFCletJcMNxUYo447qKYoW0MGwNs4rhHuFrcKzMozlTgjHKpC48c/KqlaGOaWSOUfenJEgIx8qsWQNyMZ9JBVZ9pi46748cVMTI3WqZ7e4mixETjO66xTGynYRs1tKGRQpCONLYqyHoQMZyrDIqLud9cYI8QaDNpxKGNWZUOr8IJyKifbSP8rBq7izKsvJC6Jb2/dU+8WrguMo0XGbtWVJNL+947Cu0W0uDKJJXCgbkscAVw3HuIwzfaK9e1IlhMuFkUDBAAGRTn25/pk9JQSzNskKY8NwK0Iorkrl2jhH+lf3rIhvUB57+GTRUd2SdSqpP9Tb4qVyFyWykg5Zzz1E5ozgUR9oY4xgfWsuS6kbH3hAIxttWxwLKQzSEkjOPjipfixolshD/Uxq25P3SLvg7/Wh/eljjJ2HOp3chATGO6ua5thZPvLhAeXa/QYrQAPskniSfyrPiGq5U5x3s7+n9q0AR7BITyPLPnVEolH/AE6Mf6ifqastcGNQeenHy2pWwzw1dtyv6mlb9xUJGcMfrUUFPEHjnj/FvgeeMiqomPZjfkB+lXTNi8ZvwsVxvnn/AA1TyZlJ3zg/z5VRuuQbcN/SfoayOIArGGX8DZPpy/atWz++twpx300/GhLiPte6w2lQj4jb+elCXFVjMCMGtJJOgPOuZhklt30nfBwa0Y79SO8SpqurWdwVoOU55VT7YjDZgfSqnnLnug1LVWtJpXehGYtv0q3QTuxz5U6p/wAVkDrETu3Kk8OxduQ5Cj1iwMn5VRMO0JA90c/OiMLsO0uRIASSCB5edSuvvL5EA+7hHLzFGt3C8unOgEj8hQdtH95oAycEux6n+Zrcc6jcRgLIZfdwCfPltWzwiJmTtWUDuBFwPHJJ/nhWHeBp5Y0ye+3Lx6CuqiaO3t8E4VFxtVZUXzbNH1C7gdB4ULwtQZZs8mKY+RNWx6mjnlYc15VGyXRgn+bYqC+csXuPID6Cudd+0CMMZUtnzGa3Lhstd4bAC4rmIpQnFIIyRgxkEeea1GaKi2BBOY3OPNT50SGDwhZFJMewA646UNIMTqpOzrvn+dKvXLLqbZ42w2n6GtRKjFE93pIISMHG3IUFxllifUowMFdhyrRk1yjQrBATyGwrP4pGVSTBzoQ5PMHzFWMsmxBNwCF16TyNdEiASoTAY2IzlGBwa5nh8gWU6/XNdJK1m9wjJJsAARvtWpUaLtiHRG7Zc6Rr6DqaTwadEEKgMBgsei0IoMClpCWLbrk7+WaLW7FrbDVmS5kGQDsBWmULyzKyQkSNqQZ0ZwfUn9KlNMHgZ7gnGcEHnVMKNADNMXnuWA043071dDby3AaW7AUZ3BPI1Rx3FUNncatJEcm6UCt5qYAczXX8dshxK0kFsmpIeT45muN4bFm7w4wQOVXWcaSFmUFhg0XAe8BREqdnZ90Dc9RWar6W96sq6myUGE90luXlWbxL/M2yBjka6D7LcHjveF9vNc3CFpNC9m21c1xuJrXic8DSMdDY7zZPzpgy52351ZFdCGIKRtzzUUUNOoGkjmQ3WtD7T2UcKJ2QAzErbelWXAOt8njV8XEUAxmuSDuOpqcbSMcBjWvJJM+Ora9RuoqPtKHqK50LLjZzVkfactVWdRLHQpcIOopzOjdRWMkMrD3qrlWaPkc084Y9Z7DJzUuzAHSlk58qfsx41430FLoNzgUFLbozal7r+IrT0pjlVbqgzgDNFY8k9xCO9bo4H4+Vc19p+K3cM8McFw8J0FyImIzvtn5V2Mx2OBXnn2otxb8XZ0JxMgfH9PQj6Vvj65fpfQP/AK9xX/8AyNz/AP8AQ0y8b4mzDVf3GPNzQDjflURvXXHn2jpL27mys9zJIvgzFgao0iQ7sqfGkp1INPNRvSI1LkA8+dBIDstll1eQ3q1JpSQNC+A3Oab2ZTGGEmluuoUMxdDjWceRoNJZXGkdBnJzXacDQxcGgDe9IdTeXX9q4K3DSERb8hn0Jr0iMdhbxL0ih1H1Ncu/jfKUHendgQcA1XdtkgeIBJ/Ko2bZt2f+cqlPhrkAnByB8q5OiDHRdIF2VUZj8sVobnhjjHh+lASgG5nwPdgwPL+ZrTk24c4Gxzj6UBNsMWWnwUCqk5gYwCKItxmLGTjaqZQF0dN2U/KorIv5NBXB3yQPhvVk/PUN9W4Ph1oDibfcxHkQ/X5UYrj2df8AQQN/StDQ4e2EIH+5TRF3p7JnUE4IkA8jzH50BauFdd9s/Q/wVooQVI2IG/7ioMi7iAm18w/Xz/uKpaPI8q0HjHfhzsDgfmP2qgFcb86rcD20W+1HJDyqFuyg70UpzyrLSCxHrzqSIBV3SqmJJKqR5moqMh1kovxNUzYSM42Hj41eFCDHQfGhbogkA0gAnJEPLOo6v2oe1AVpGPeOPhk1O6bXJuTtyAqtz2USqQAFBkIA6nZR+ZrccqlwyM3XF2lxmOHkfPlmj7qUvdCEclO/m39vzNK1jPC+GGSTT28u4B2Cnp8vzoLhv+I4gXY9xW0j055qstmQCO0mHUYUY/nlVEJ7xx0/tVt4fuEx+N8n4D+9DBgkMxB307VBAvqtrtsc9W/yrk5SV43CRuNvzrptebScA80Y4+FYVvEs3GZC2SykYC9NuRNb5+MdfR1wMXONshSfrUoiNWDnBGkg9R/apTZDysSE1DAbqKohcAgJnCkZJ86gIfs0X75gdBxjxrO4qe1R2n7raQEVetFye8cHLEbeZFUXcTLEpkYK0m2wyTWojFsYx2rF0LAY2zjNbLRLBKdCrowGC6skeVBwRokg1gYYgbmtmeJZrWLSkYjJ2x72K1EqUE7MhuZ0B1DTGudvU1fFiYhyp555dKa7ijQWtvjWfxbY9BRiKBbuUmRCcEvzGPStxk7yW9tAX1AKRu5G/oKHw/EeyljUw268hndjUZwb4I2MQIfu18R4+laEBEEOokFtsZ5fCiIhotBtIUCH8QHIVw/GrMcN4rrVgUffbxrqb7iPZI6W8ie0OeaDJWh4+E9qplvypDHIB50tyaYypZ1msEZTkdcdKzmXU2Qy1078Mgt17OMYEjAHB6VlcSga3mxbFmUDJHPFY/Pvymrecdn9imjk4N2UpD9jLq069IAO+T41xn2gkNxxi6l1owaQ94cjvXSfZPhUF/w8y3RlDPMIxobGNsmudn4fcScaewiCqe0KBnAAHqa2yyok13CKGUn1rT46/aO65yAMCj4uF2lnNIkknazqDgrjANZl0urO2az1ZFjnvZwashh0nFFzJpztVSHetS7BbHFV8cAzyqMNGRAVnROOAaarntwRyolNuVJhmpo75BgYqYxiqoJNYGedWkYrk9pjzqo786tO9VuNqAW4QYNee/a1iOLrkd0RADbbrXoVwcA1wnG5m/6rOUAddgUIzyFb4+uX6fHOFVfwHpVRXGc1tJBbyxs7xkfDH60LLYuo7u/gp32rq4AEC6gS30q8mLSQr+fWm9nYHDIVPnUjaMBnRJj02oK2kU8maoIokkAAO53q9bcZ9x/jtVyK2oKkRBP+moC+ERE36uQCSQR89h8/yrtLxwlrMRvqIQfCuV4NC/8A1O2LKQNeok+Cgmug4ixSwhRveOCd+tcu/rpz8HWY+4iG+5zy88VWSJL5WwTh2+Q/vREQEUEIycBM58aGsG1XbYz3Rk/HeubayPd7s4zso/8Ay/tWi2Tw8HPM7/Ks61GuG6fPNkH5n9a0XP8AgnGR7+KA20z2Izg90HNBXEmOXMHPrzFEhiltE39UeKzZmzIcnbK/UmorI4mcxKv4gR8e7RMTare43yNKkeur+9A3p13SKdu7qI8OlH2Ch7WUk7sxUfz4fWtC+3bMWjqABn8q04ZA+mTbDDO1Y1q33oGcahj5j/ijbWTAkixyOpc+B3/cVAXcAK6seo0mg7tMPrXk3OtAaJ7dwWwPHwPQ0Iy5V45Bpcch59RVXmh4ee+9GxsDQKgB8HYjwohAWxltvrUdRWS4wpx4mnwFGNvhUA3Qcqlnu8/pQQZgAdvOs26kwSRux2FG3DhRjrWTPJnJ5jOBRKpOCwUk45tj6mieHwrK73M7BYk75yNgq8qqt7Z7pxGhAU7u3QClxG5BZbK01dmhGoj8R6fzpzqudVcRvmu5XmbuKg0omfdHn59T8qJ4TsjsBtjVgeYrLuU7ixqB4Dfr1P8APCtzh0JjhReZfn6YAFGV16+ns4v6Eyc+e5rPupNNkT/VpHzq29k7S6kwcliQD5AULfkEW8Q/E4P6fvQWLzePlsw5eVB8Pi7J3m8yx9Ogq55czOR0zUgjGFlhIUL33Lch/N61GaEmYiTvkM5U90H+YpsSNHl8IukY+FE3DW0QAhCyOo3Y9eg3quQGUBnAz1GOQ8hWsZQLYOoAZGcULdaFBOC7DmxO3wovGMkcs8zU7qzgis5Zp2y+AFGeudj9aQrLt5I5LzLrlM4xiugghkW4SR410psiK2c1i8GMXbSLgmUYKgcvia6K1VDKZGjzjLbKQM56/KtRKafQt60YIJYbazyJ5iq4ZUupGto40FvGcsxOc+VBFTd3b6Jv8SzYY88DyrSlSOwsgsbLqb3jjc+daZKaQBZJEYHshpQHkB4Gs5WvOJao4ZGCFu/Iw7voKRkM6dn3VgxqUD3nqyQskEaHuDXkIN87fU1Ygm3itbPa3iSSU7dq/I+lItLIjBgWZzuBz/sKkkJECm5Jjzvg+9/anHEQjyR20SgL1PIeZNUc7xOQ2d+gMkhwCcZ5elCxX08kpJc7mn467SXau762YE56c+lW8I4bJdyqTlUz05n+3nXXicyMdW67b7Pu0fDQVbTh9e39WOdclxa+uYLtnR9JDFuXXxr0ThcXD7SxRVZHxzK9/wCvKuR+0nEuGvcuogk2OMgJ+WKzzmrfjjv+pXUt6paU5dgDgYrfMDMucVjdlbTXySWx2VgSpGDz8K7RLcaeVO+ZanNrmJ7FmztWfJamNq7GaAYPKsS/jC5rGY0yYtjRUZoVD3jRUdYUQGp9VQ6VEtUV29vLpbB5Vo6gyVj5xijbaXoedcnsEVByKsYbZFUE5zRA1y2FJ6AVwd6k0txI6MsyO5Y4IyPKuu47N2NjIV95hpUeZ2rmG4ejSsscLRqBnXnST8a68Rw/Sg0WTSQiJINx7uSKjNE47yxkEjkq4OfSiexljUGU6BjBZht65HOrdClTI17CHySFUEj05c625ghFrbCKXUnG/U1bHb6UzoaHPXOPzq8xyOgkt0VSPfOCd8UkuHVFEwdgMb7acH1qYqBYjIaSVgOukEVSZCWGWcjnknA+VEzXURbIdl6KSu3yHShXAc7onaHmMdPLy86mLo77P6pr1mbkkTnGeWdh9M1ocTcvfQRjcA5obgCBHlAUDCgHBzmiJe9xxF6Df5CuXX1ufGzdsIoAeWmPrQvCxpjnYn3TpO3l/ereJd6CQk7DTt8P71Xa4XhErDIMjDfzNYirLM4sbjzb9B+9HTSYgmzsNY/KgeHASWj/AOqXY/Krp31WUp6hh8sUWD3P+Htk8Fx+dZcr/fPy98AfDJo8uCsSk8gT8qyLiQduTjkS2PlUis+Ul5kx7zZGfBQa1bfSrLEBsrFmx1PX5DArOUhX19FOF/1H9utGWHe4ioOcMhz5ZNaEdxOD45Bz4qdqLkk0XET8kbu5+tDSgq0bMQVeQrkdMjr8qj2vaWjA+9EQT6fzNFatpLid0YYDjOPOiJh2sex++Tcf6sfrissyGOSJwdhkfKtAONRI6biogeRNREoAw3lyNSjz4VeSHZh48wOvgRVGvszgdetV15olRtk1F3x6/lVXb/07mhppicjJz1NRUbiQu3PYdaqgs3uXwoyOpPID1q2GFSNcr6V8+dRvOIFYewgAjQ7bc2qsWle3MdvC1vaty7ruOp8qz4o9EbsfeP4jzAp8BQEyAVPMeNVzTDABP3Y32/FRg0SmSYOBgE6UHjW6zezwyPnGkBQfP+Gs/hkJeQSOOXur4VdfSaphCpyI9zjqx/n1ogeJSZGbOwAUE/Mmg3l7fiCkHZSANuQAJom6k7C2CA99zpP60DH3O0b+lSB6mrBZkhGYnmfp/BUpY5CXWZyluGzktzHp1qvGqIKPEY+dKeIxx9qg7SVmCDJyAfHFb5c+iZyHKxAd5gNxuuPAU7uxXVJ7urugjdvOrFhit1E07/eZA0ocnJ6VO4mZjgRiMNsF6nwJNVFca6jEXKjuEnzqNzEJoWaK1a5Y+8ckAfAc+VJlAmJAbCJpBI2zy+Jo6cAqsSKVULnUzHGfEKOZpCmTh0Hs6HURJgnsIxtnnv5UTCXNpKWZEkVFyAT1zVT3EaRCMSaZUGVCNjmN2JqSDXBHKSi6mVQF6r5+vOtMr+H2y2EaBQolAzK56AnOPM1m3N2ZrxpNXd1YjUDBY/sKneXoldiGYKndjU8gOrftURboiRArmd0xpVvcX18aojoCXDyFhK5bBOdl/wBIouO7REGhPvjuC25x5VCO0SMKx0lEHe1HY7fWkHs4yxwZGkyB1x+1WIHCmYK9zcBl0kkZwvxPWlc9nFArxljkYwx0r8BVD3kayM1svbsOpHIeQoqHhrcSgDzto37zPzHoKow7xGvOLxRl9eQMleg8qPuZJZZ/YrNGKR4D6B7x8PQU06Q2nGpDb6ikEPN/HeqvsvLJ/wBbhGo4kfvDxrrz8tY6dpwmCa24eI5kKOVzpPXNcb9ouH3dtM0s0DojHYkV6jZRhrkuR/lx7euTXLcUc3d5xWKU60UgKD0HKs8dZdXqbMecW8cy3SSopwG5+Neix/5YBOdudcnMq6rYoMCNdJAFdZH7grXV2pzMimbkawOJHnW/PyNc9xI86xVZEfvGio6Ej5n1ouOubS3O1UyNgVYar0Fqg7xo8CoplTtRLjoKqK4rg9y9Zcx1UzgZqqN8IaxOKcRdo5be1crLy1+HkD41ZNY6uAPtNdyXFxHFCWCQNqLYwC3l6UKkSXVmbkyHUM641JH5fOq4pzb4huVEiZ8M/GrrRJLN+0iAkt5typA2PTnXeeo81u3VTWchlLLeIzctEhwcDpRTOkZYBo4ww7sTsQA2NydqHmv7iOZ/a7FSM5J0b/Or7R4m7/s4GTukkerIPgefTnVRXZSlkQKEVlHvKd1HiOuKaRrxpHaJA5KAsvMjpnTzFXwWcMiNmFoZD3gEYEDpgjr+dNNZ3scbJF2dyifiU4KnpnrnyqAa5nmEIjnULG4ALumCRQo+6IV01qRgPnYDpv08auuRLKzQ3MZiOdQCjGT1OOtDntbdpAqqxJ55yAM7bUVu8DQiNmGRtsD/AD0qUatJ9oc+CHP5VfwJddvM4HJiv13qVkmvjk7AHCgA7+Z/auN+10nwRxJi8kyDbUmB8N/0qd0ey4TAi83YGg72Qm/Qf1Of7/TNXcVc9paxggKu2PLGM/U1lVlg2i0xn/zB+Yq4nMMyDYaR08BQsJxbqSebgH5iiFJzIvkTUVdr+5jI3yjVjzvi5zj8A/8A5CtHWPuxg47H86zpB/iWP4Qv60igw+bpQN0TKjP1NavDm1cTTSCcBhWRAvfweYY1rcKyLsOds5+VVRLyrCrp2a6XyjNzYEHYj0qlGAWcSuHBAKoDkjnn0FWXY3friUn50Io03U48UP50WQS+9rjHeByPnRSSHShO45H8qFG8aZ6/tU1IVtOeuf58qjKwTgqQSQUyM0u0Ew3IB/Ohix7VmVefnUu/vgd09M1XSJGQgkaWGPKoGRuSKox154q0KzphyG9DSFu53HIeOAKKHnZmGNRbPj1qlk7LDt755H+n+9FELGCR/wDL9qFcZbOD5knl8PGiVSCBklcjHXr/AGqqBWlm7Q4x0J6+Qq+QKF90szb6Qd8eZo/h9roBlmwCBlsbBQOn60c6vjItLbLbMRhfHzP88aBtxq1SsfMZ/OiZg93MAchV6E7+OD5+NCcWk0YtIN2/Gw6UQKrm5uGmP+WmyCmkXSFj8O++PHpVwCQRBTsiDLUMxZsDk8hy3lViJIe4TpY5OwXniiwzxxkBUgTJyo971+tUIr6FMK5IGwPL40+NbgS3BlcY/wArkMb8+QrpI508ZjBYQIGKjOTzJzv5n6VDSWId3PaHmu2V+XKr4EIRzFGpwe86MQgB8W5mh9UcdvhCrl+nJTnb1qonFgOxlJ1HJ051MV8PAfpSubkMkw09kGVdPewNvAdaFSFru47K32VPu/u+QOevlWsbcxr2ccLaFGXckFRt4mrALw09sIyUj0DYS4OTjoPMUVcKY4bcjXl2JxIcs22cnoByFOZVjhWcSiOIYBdhjI54UCs/iA06FtUlcuxjaVye/kZ2HT1qoeBBczSzStqtYDrZs8/LHKo20kl5eao4iXZs77JGPPxoq4tyLaLhsDBQnelOwDD18art4VWF+ycTEHG/JTjYD+o0DSXcaStHFI9xM40s3JFHlUIrAdniRt+uR0zUUENpl9nk1bZIJJ8sVabxxGZiwTI3QbsP2z50FsaxWipHHCzk7nA71Eqn3IErdiEJLYPePxoZ7wpB26xCJXXfJwx8T40FHHcXRkeR2VFGY2kOFXzA61QPfNGb+77DZDADzzvUvsrBI3E4JgB2aPuc0M2mPjckTPqDLpLYxnbwoa2V4LkxklWVsV34/wDNjl19e02aujlmH3TJp1Z5HJ/euS4yhsLridxP3Y5CCh/qrY4JYTTcGi1XbfernSd65D7Q8LuJLponuzJgFwDkjTnGa58z3jVrIu7gPPDNEw7Ls+8POuqhOYlPiBXn15bezmJu0LCQ5G2Nq9Ag/wAhP9ordmJLqubka57ifWuhn5Gue4l1rNVkRczRUdCxDeikFcmlh5U0TYamblVJJBqD0tl3qiY6QaJkAAoKdsAk9eVcHtAXlz7NZSON2A2HnXKo+HbvMpOWcHkxrX+0MrR2SKvvNIM4+dYKXE+ltTY3yp8+ort+c9PP+l9jpAtyiqwwSAFxuM1CF5LRZInjMkfNlIyCemMfWqIrqPDavug3IqdifSireZbiLsZJSxz92w/KtuYmIW3b6kuPZCV1ZjJZPQg05k0IJrSeKYxt3ih2PqPDzFV20y240PFFhBtglSfT0zy86k9tbSDVDLhz0caSMeY2NQEx6ZLiRNGmVNJYA77+Hj8aou7RgYSYpSkhGBGCG9SPGrruYm4huLfQGJx2hAAfPTHj60puIzTyEQWeiQNkCRsbgY69KKzuxW4kEbM+tVwuWzpPgep6VRcIqEAFXw2kSA9etHrw6W6ja7AWNxnKsd8joCP5vWZO88cMqXBAdSzEFd//AJDzoOj+zB1cGLdSxPzJ/TFT4dn/AKnePyzjPrTfZTB4UijGQWU+uRRNgmm/vzyywP0NcevrpPgCca76PI5Z28zypXr67nWd8bEeG9JmUXZkxsilqo16w2rqDWVHAgws2NsqcfGrifvDjPeShIWzYyk/hOfhV2vvRE4B8aipaiyoCf8AygBQpGrGefWrASpCnkAQPrTR7u22dQyKKCRNLPnxx9aO4f8A9yBvshz64qkoNbeY50TwwgSRsep3+VVqC7gZuCP6iWHzzQOMySSDwI+tGSHMiN1VcUCO7G7A8ydqLBIbuBaTHADdQAKgGGnB5DepyboT44x86iZ7PjfY8+dTUFeYBpkORnH8zRChQM43qukQGrOygHxpnbIGtiSdtqkzkgqPpVDk+GTQwz970HTwoWR8AgDGNyateXAwuDjr500SayDnSoOSxqM0rK2aV9bgrnvZPOjWkMjCGFcjOyjr5mooJJwYoBojG7M2xPqaaa4is4GSI5LnBcc3PgPKq5oXV4llCwjIZxnLeJ64/esiDdzK5O27HxPhTMXuZcjGPoP7VXPLoTSgz/SPHzNWIuml1d0nGTqY+FRDGNGlYacnCjHIdf2qqNTsGOernxP9qmuJpSxBEUYz8K1IzaMjifsg2I10gAM7ePgPH9zSnuLe2UBEN1ID3g2yLv4U6W1xIBMIktlK7u5yd/WlDBED9z2tyCdTyNsAwHU10jmHuJrm8ZYgweNVBKqNKx+WOvKjYIIpRGGR5hnmowAfXkKi8yo4DKZ8ID2cY7oOOp8PM0QouJIkV27GOUAhIjjP/wB37UE2mkhsh/ho7CHJ2G8jYG2MVCKPtYsu0hjzpMMZyd+Wf2ohVItXkWJI+4f8ROSSARjbPWgTAkg7J2kih3Oz4DAgZz4VUWRl57TQxxqRWMxXJO+2F5gVW8UcV1DIZDNPESF1MO8cbHAqcb20FlI88xlkOyQqcZGeh69KFaeYxHs7NItQxHhckk7c+vWga4R5ZnLBezlIfqoA5Zb86DXtS5jRVk05RTjGaPls1twJb65AYgrpjGS45Y/4q2SaBYY/Z4ysy50wAYLjxNBnvDDBBraWNXj2VUG4Y7YNUykQwK0JYzM2Qqrlf3NXLaS5ZbzIywbs4k3XzI+Na1j2SEP2YjVSAeR6daIzIeHSzSBrlZGBBOSSSB4VqWNk0E2MhIAMhm7xI8M8gKuubuFYh2z6EO66WyWA6UIt3eXmIEVY4Sd2b3iMdB0qjleLuYuNykMGKsNxyNaMcB4gyz24zLjdOrY8POsjiYA4nMAxYBsBjzNF8IuHtrpHXcZGQetejmf8659X29C4PdTpw0d8h40KgEe6K4vjnE7uW4fXM2c+lej2N7Z31iGnQBsbltj8xXFcej4Ol05TveXa5H5Vji+16+OQXtLq6XtGLKhyc8hXoMBzCn+0Vwd9doZAlugRM9Biu6tj/h0/2j8q10nKM/I1zvEzzroZz3TXOcTPOsVpmxc6LShIRRabVyaO3Kh2O9XOaHfnQemSEkb7etDquslzvjZRV8y4znryFRTYYrg9dc5xWL2u7FsmRLgsjZ2z4Gueyg1JPHJGVG5Zc4Oeea6fiGqMXFygw9uQ+VG/XY/DPzrL4w7WtwpjGY5V1kA8s7kV25+PP39AJAHhZojHKuN8HB/akJUbuMFGMAZXQ2fyxUFEWoBTJGx/Fnr5nrRLSjsRHMFnAPvptjbwrTKdtcjUq3BMqAFUOdLehPpRDi3kkys7Rro04Zc4Hr60I9lbyxhkOY2znve4fEUfbEyWEokEUxBCHIKuR09D+1QBInYSAmQNaBcOckkHzHP0ouN7cRN2Msg050DWGB+BpeyyJCrwbMVUHbIO+4bz86Z20280Zs4ojqBDA5HPGR4/CiqRw+8aJNJWQICylD+Lwx40FxK5maIpdrpGodwrggZ/YVqWt2zp2YUpIMYf3XA8c9dvGg+NOJrqCNmDKzElXwMc6g1vscVNlOwHdM2wrQhAjvr9Tn3FYgVmfZBh7FJGdjqB9a251VLm4Y578S7+hP71y6+ukc9dPiaZRsAT9Khbt2sA/q/PxqF4+b6RV3DMSCPCntiRqXO+Dj86iibBu7JEx5jGau1kKpPmD5UDBIUnz01eNFzECRgN15/tUqnlb/FDw6Y6UjiOZSDywPhUHLMqMPeAwfOmLamK56bHHOo0uH/dqPwk5GR0qdmpjmjX+hiDVTMVSOYfgfB9KvU5nZh4g/Oq1E5DpDZzsPyqgLjSDuDvVlw+HI+lUB8RlW6e7RTq+V36sBV8mBGMke8N/jQkPvxAnB3Y5q6c5kROmc0SDIfcXbc71YxyN+lURuPPYYFSMq7jSCfWjosBAB5fGhJpAxOgEipvMijDLn4mkpLDOhIx06n60ZtRgt2lb3GkPTHuj1NGIkUedRErDnpPdHlmqHu0RR2jmQj8OdvrVTXMkwIiCqB1HSjnVt5elV0nn0iXYfGs3SZnZ5pABjBbkAPAeVSfSmSe8ev/ADVUrsFwRpHMIOfqfCkjKFxIka4ydA6dWNCHU0mcHtDy/wBNTO76jhm/COg880iNMgjUaiee351uMrFXTF2YO2NyOgqTMBPBbKxVnYM5XfluBUyAnPGo7k5oO0d5eJaxnRpbGPTHzqxK3kUM2BBJr151XDAjPXKjy5fGolWlAEzu0QG0YGhGO++Ofz8KqiilkjKJCI11Z1nAAHw8aqnmSbQjlpUOMBO6OeOfng9K6OaUl5bo6KqdoxX3It9vE9PHoakbmSJBIZI4Soy0ifeS7HlvsvzqEFlNM4MUQtIBnJzoHz5mibNOH2UTNJN20i90mUHSCRyCjnQVQO88aNHDNOxLIrO2ttsfDHnVsMp9p7N4xLcJgCMAMiDqT4+dSur03SKBex2tuxAwqgOx6beHmTU7WEyPoxLbxHpj7yQ9fQb0FaNMsJbNtaFnI1HvOTzOkdBUruROxUwxSGRXU6m95tjyHP1ogQw20siLH7OoOkgd6TBHLP4fCh9FtHGoFwkYDAiKM4Pnk/rUFE8ACrJKTHpkDBIyCV2xjwGTmq3hlkAMP+Ghzq7Ujx6ZO5PkK05ZImhEUQURgjfTkDy8c/vVeqeclQ+hUXGrPun1oAJe6Y4mZ5CpAZpBjJ/M/GiTAssq9kxjKnvFeQGNvLpzq32dVVQp7WRAASTs56AmpsDEzRxR9tOy94DZF8iaopSwjQs+guxB1b4XJ86mGghZFAe5uCOUXI//AHeFVzSEpIt46OAABEhwnx86rueIrCDEY9ZVclIxpCbdT1qjIvuFpcXskpPZSNJ3lU5UHGaqt7ERXDL2mdOM5HjWipDFWwFyxOkdNqpH/c3Plpp/J1PR4y+3UWGE4ZKdQIQcq47iNs8jSPqXAO9dTbP/AOESjHPwrCvMmCU7Vrnqz2zZrDThZkk70oGBq2HnXcQDTCg8FFczDs8nlGPzFdBbzB4gAclRg1qdW/UzDz+6a5zifWuhmPdNc7xPrS/BnQtirxJQSnFTQkmuTQsZblUWXFWRe7TSbDeqj0iYYqhWAlUedWzMqoSTWPJe5m+7IwDu591fjXDHrtVECW54yjnuYCe74qSd6x+Jq4tbUgbuo3VN8D1rfskjAumaZbiGdtTyKdJjwAM4323+NZnFNPYxanUxgEYDbbcvjiuvLj17ZUMWsIjrId8FiQRmrJOH24cgB06Z1YGfKnWZGwRICWOAcjaropShzoDnHeJ8uu1VlnvbNbB3inZWAxnT0+tG2F5mcZUqSAuOQcjkd+oqz2hNHcDEk4BIBxv86Fmt4psyBdChSdt8Hx8d6A2QtbTNJBIhDse1R13A8NPh6VCa5imigi0PCz5YjGUyT4c/KirMwzcOi7Z42ZAEKuADz20kVHiyiGNSpZHXR/mnIGOobw3oLoIZPYVjuI1uDqJDo+TyPP0/asG6tVkuI+wc6izDD9MDn8TWha3F1DGZLmJMsDh49iB8NjVE1yjCAdqmvRIxB7pBPIZ61BZ9mpjFeLG+MFcHzJ3rqbga4l2G6aT864yBjDPrUFWTSfiBXXdqHh1KwKsNS1y6dOXLSsGnYnmasgbVIu+/X8qokBDjJzgnf40kJVlI8cVFTlB0llyNgwP89KPjftYVY+8Btjw6ihPxadsHK/r+9PZNp7SE+GVqLByYcbNnPXwqp1aOUsM7cx0NJSQ5API4I/WrGYHJ1bZ5HpUaLUdJTPdYfOrLB9epSc4x61QQwCsCDpPTqKeFuxunK+6QPriiw07kOATtqxnrTSvpz4DamkjDOS2efyqD7szHAwMjzqtLrQ5YtzPuj0q+NWlmeQJlU7q+Z60NDkRhMFR1Y/tRsehVAjVTjkRmgcK/9AH0qJ2ODoHlnP0qZknJxoUqP6hn604iMmdVunwJoaGZio7hAx1xtVLdu4PeOB1Xb60awWIZ0KvxOao3nJ7JAzDmenxNGVEaoD3gzVM3EbNoU5I/Cn700lqCfv59R/8ATiXOP0qLGKFSqKi+Wrc+pqxik7jHd0qep5kUI6hm6suc4xgE+fj+VWFiVBfCr0CjGf2+tDySlpNClTJ1HMIPE+flViHeTSRhcseWOfwp7aPvnUdk3fHU+FRwIhhcmRjgueZPlVwaO3g7/uL+EdfL1NaRVeuVj0kkPLzx0X+9TsbYvdBi4gt4k98nG/XA69aFkbve0T4llY91OSLjxPl4Vs8HhnknlcsNaqO+wA5+RGw6CrEqxobdYAgkme3RSw7LIyTk5Y/rVcvEdEJNhaKI0BLTMM4AI5Hlnc1oXEUKosd9eIqKoJw2rYnYfl0qCzw3GlIbWa9C75dcK2OW/L/itubOWC84pEI1JnI3Z2JXbPieXw8KccOeE6GuhGyjvDRkhRv3Rzzz3Nazx3XaqZruO3jHOONdzz2HUirIWht1HskX3zZL9oCWPnjmOnPFBRBbxPAs1lbJAMd2eYaivkB/MVO2yqsGmOhffuNW5P8Aqb9BV80kPZKTKb0liAAQqL4/zeqriZAhS7eFEJGIyMDIPIL1PmaAaVbeW8mMszdjq0qnu5OMk+fgKrkjhhgeK3DRLIoXKjSoJO253Jqm8nKt26MttNIoC9qdT4Hh4elVovZKzl5LvUwycEDbffPn4UGlFZJax4hjQtkLodzg+JzShj7hQk3LKRhQuleh+VQaa1WYtEZpmkYLjPdBH9R9elC3F9BLdmCIq0Y2yp7urngDrvUBdzJGdSGQzd8ABe6B8evwoWS6liJQBThjlRtnw25k1nkO6xy5MO+NTDLknwq0Wk1sjPCUjaQ/583vHxwOlUEyCSRCTJHbppIGVy+Qd8Cq4+0iH+GiALJ/nTe9v4k9KjBLFYQu0cUt3Ki7ud1XrtU7e6mu4Yy6ozscMJNkPhiqIAETAE6sMdx15VVo++uHxzIH51eWBupMDkTtUSuz4POTHyFYv1qfGtAccIdAMsxArF4gpiVo3GG1YIrpPs6BNIe0/wAmLvt8Kx/tMqtxafRsrSZFbjmyItpZv9g/OtWzwrNjm29ZsKFnuSOifrRyExsh6GrFFynuGsDiPWtyRsoaw+Ida3WWVgVOIDVUCd6eI96uTTRgG1TaMHnVMTkDaptKfCmjtUNr22iZzLLn3C2RnwofijxtG0boRFswPIA42GPpintTDJGvs7S56SdljLfLkKnxGBcHtIowzYOWbU0nkD09aka0BZ2lsEQdrKGnmc4HLIUkDzAwBmsniBa5RQ5MeNyOQznck/znXTRtbRPZFbZQ8ET4LgqA7Z3HLpXN3gS4S7dUOiOMYZuXQfGqUFFYRrnsL3DKDlWxt86NjDhdEtyjBxgEqN/HJoFYFdUKtCVVu/gkGi10GU9mmNI/8qQE0QRFavKhYlMgbaWG46GoyJ2UAJDocc8HfPn/ADnVKxTRsexlmgD/APqJksf2o6OQ266HAaI7MVHX0ztRWd3RasjwlYs5MqnBJ25Z2O1WzPDDPEUup2hdsaGGTnxI8OlFOXV5GhjjkiAUuoXOOmdPIb+FARzSRl+wiVlI0SqxypwTgDO/jQTl7ZECxffBlIQR7HGeq8qH4rPC80HtFuQwhI3GCTtuenyqxoYbi9Uh2te7g62yo8N+lV8TnufagMxzxJHpRh3hjO5qCIVQXMcgkUqMMOQ2rZ4LdBomtmOGQakz1HI/oaxVZWhlkRQgdhpXwp7eYQXiyjI7Nseozg1itwXxGLs5FPRvrQkbArkZ2rpbixN3ZyJHu6nXEc/T41zEXckZHBU5wQelYaEKQYtR6Y29KkcpMrYwfEU9tsQm2Tnc0lXVFn8QO1RYOdEdVfGDnfz8Pr+dH8Mjgu4HimQGZTnPjWXbOCBnfxHl1ohHa2vNa535+dRpY8CwzvCRgc1z4VROmoMwOM9ccqNvj26RzRkal5eHmKGLZGVBBIx6GhFS5I7+M9ajKu2PGrYlWUDOFbxHKoXKtC6sc4G3Paq6QopO6Cc7DB2zREckR8P/AIUMQYpNQ5NsalrTGWyp8ehqAwTqAQsrL6LUu11AhVdzjmTgfIUF2gGysfkKmpmOyB/gKM0dBFLJ3iEUf7cfnUpTCEJkmLjwT9+VUwW7gZlHniRwPpmpSmHO7K8mOQUv9KsYoGed5AUtLcLGObucL+5oaOLSdRcyv/UVwq+g/U0RNdRayFQ3Drz1NkL642FZN7cySnUzDs/6jso9B19TWpGbVlxKCxAbW55lTg//ACPIelUQyAlRENumkbE/rQaLJdyCK31MnVgvP48gPOtq2sltVyxLORu3LA6AeFa+M/Vcce/aPsF/EeQoR7gXD5Ufdqds7Z86e7uDeOYIv8oHBbp50kgLMIoVLZ2VRzc/tRV1p2KzGe43jj2RRvp+HjWxwiS34haT3EpmWMTYCK+A2Bzaqbf7KS3EatfXJXHKKLkPj40y21nEGsY8kKe6NWMb77+efrWuU69Rou1tE7i2FqGG/fOo5z8c1GXi02kdijupOQYkwBt150BJcSWspRYo+mlt2Y7ZONsVXPxGeBE0RvISurW593ywNsVtzFxS3Ez6gyqq7tozrAHifXzqcT2ETs2uONmUtI5+8ZgCAPIb+tB+33SIFJUuy6tOkaXJ2xj1q2DhLzIs0/ZRpIpxqXcAdfpQW/8AVokdRBH2UZGUmkXUzf7RSQ4iYoxe8bH3jkFlzuNW2xxnlQ8tvHexj2dZVRB35n93HLboB18alFc2VvFHIpe4uFQRhQCFGM7sOZ/vUFTo/tUDymIpIMCRl1awOWB1PrU5nihyZ5neZByOVxnofAelQyvEFh7FmMkrY9ocbseelQDtiihbQWtwFeaN5VPeA7zE+fQVQBa3Dy3EQyojQnALYXJzsBRs8BjtABmLVhjIVGtjnfHhVUFrKVzawBJATI01ztoOc4UURhUlyoe/nY7uwIQHGwFQUoqWkiJYwl5ydySWK+Z6DamS1aRi07PdTaj3mxpUdQBRMaaYwbtuxjBJaCMZJJG2451KHVcq3YnsIlB3dfPr50FTECN4ZgIxsSQcjHljrTNLcaBJHAYxkbuuMY64/eoiSGG4Ps8ZuX2YOXwNvE1eZZxDLNdujPnuIvIZ/M00C2cQeVzOSqD32HMZNUylVmKQszIrHDHmd6vkY9iIYmzqOXbGMmn0iJAMYPjUntq2SY6PgnCrheGyySt2SSp3RzIFYPGx216ZU3XO2a1ouOS29tDrijkl7PCOG3A5bjxrEuHZiGIzvk1pzVWqgzSggDXGRRt9bdlCQNzExGfEdKlZWkd3DMsbhLhRriycBscxUILs3cj27riQJp09dqsUPqzGDWRxA860QdIZDzU4rJ4i4ANVGcTvTxnvUM0veNXWx1MKwrRi5UznapxLnkM1J7d2zhTUXHY8M4ff3dosjcQEcjsdBVcpkbYPn5VaVisWa3tw1zdHZ1Jw5brqY8h5CiV4itnKba2tk9lhfspW5AHoVH1zWbcW7Xt8bhZtRDDMagvnHVsbZNT3rTPnurhYnkuZObaUY5I25ac9B4nPlSvoRFwhoe1AkYFyefPkP+aJmsyL8iYl4dpGJG+rpy86G428gi0yMgYMHYnbmcbeOPGtMsKKOJThpxrI5509aIt40OI0QBBuhGCc9eVJXDzgyIXdjpRez2Az1qM6TyXAZIwqKeaqEPh8qA6MskKKHA1KVGcrUryGRIe1ttfb6cZU4OCefnQiLdwp3HZ1O5V1yAg6/tUYuKdmjdugj1gNmM+PlRU7W+mWeQLEWl7P3nAQp57cx1quVLq8UTQxrq2J0qd8bA+fXl40fbxx3M0hE6nVGCrkbY68uvLnWbrurKFlkDSQ5ADkbDfoRyoB0QJMe1QhkzkYyCf+Ka4kV75i0aoNGFCbbUZa37jtJBHbs0hOC27DoMUHNGpvI1a2AVEypU7cycmgJuXSRiUJ0lsjPyqvQDnbc88U0w0zxRrkAYBz02JNWRHAZ8YGDmudbja4dfaLKKTPdjPZOSOXgajxmyWdWu4F742lUdD4+h8aC4EykNbS5CzHGT0PQ1daXUtjcNDJ/wCUxUE/0n8J8qxjUCwjPe686mcByASB7wGPGj5rOI5ntDhD78XVT5UHLGQ2RvsOVRqFEQJlI686NZC0QAzqTdTQUYGsZ5k5rWWMtHt8KjUiiCTusvLfPoar2VmCjHUr+37VZGneZR1quVSRn8S0XEcaZNY3Vufkavmj9ot2TPe/CTQ+s7HO45+dEwMGIAwCelFgFGfBibUrjxGRVom0jTMhjPRsZU0Td2iyoWGVccmHSseSZ7dykuY26MFGD6VStGNY3bKqNuZV6sTQpwMKT0Jz+VZRvIUAy6n1A3qpuOvGdNud/BQM1cYtdCIZSMDvg+BC/wBzVNzFNowEcr/QBoUnzPM/E1gniN9Pu0hQeeM0bbT8VfAtJp8f+ozELVxle/Dr2VcGKOKMchqUAfAHc1EcDiVszyGVhvjGlT+eate8u0OJL55n6LGgJ+eKrZp0Yi7mLTN/5WQAn+7z8qamJtIlsumML/tX96zboy3LaHkIBGSPAfp+dGPDIU7qFdW+t+Z9BUDA0MKnTgscDxJ8hTWsDxxgstvBHqcjZR4eJ8K6jg3CVs17STDXDDdv6R4ClwThfscOZADO/eduZ9M1shdqLIrl+7iZvAGuYWw7MtLdypGX7w331c8gCt/ij4ttIZVZ2CqWOADWPPZWsbCaV5ppXG0srlF8Dgc/pXTly/QJ2PD5ppCZWY9C0hXWT4ADNS7KCb/D2VtcvGrEN2Ke9nmCWPLajorm2jjcRiGLHJkh1HfbmedB3nE3kibs2ZjgqO0bC+mF+FbciPDzaxa7m6S2Dnk762Axuo8+VNBfcOim7OGKe5mjGEMgOkjpheo9arggu7q3ZWiC7ZBKBRn15eO9DIZFK/dyE90A48Djl8R9aAqS6uLiYLeyKi6tUcQGAo5Ek8tsiqYreYvFIALeIAqJnAUZPUeO1FcJt0SOWa7kjcxSMolkfIXYbBev6UrjiDPkWwYs41CWUZY5BxpXp60U0yxQpGlq3YvKd3cZbbngdB+9K1tgsXarCisyDGtdTZzkEjkPSg4+2ubwnUVDLidmwSuOe/hkD1zWisiQWwEjdkgyREu+nB3Hn03NQBt2YvGSaSW7uEkOYgO6QTnvHkOtal5IyliGWKAdVOMD+eFZaCea9uWth2asysWIyzDHyFaFvw3UnbSMHkA0LpYHODuD0oK4bpYyfZYyWkO8xTukcgAOvxod5O1nLO7Sam7q6e6mPIfrVs725Miy57BcnuSEDHXzO/pUkm7aFDEOzibBC4wT6+NAwCCYk5KqMDp9BUbiR5pMyYz0A6f3oq1hhZ3EsoQKpYsRnJ8BQTA55g5qQpkUKScnNTPeXzps4UYHOiH7AMqh23G7EbVUUImMmitMbQ4zvVbhVJVHDj+oDApRcyMZrSBdRhlOkkMDlTVk4N6yzJhLlfxDbNPdopBOCGqi03OpW3BwRUB00S38DSwxqtwi/eoNsnxArk+Kh0RiVOBXUktrWeDuuDviguM24KFwNmG4PQ1ZRweo5zmtawTKA0BNblJSOnStfh64jG1Fa3D+zV+8QD51q4icYXBI5muVvmIdcEitKzkeK3zz61z69OvDfM8d3MZJYWeXAZ8DYkbdT6fKjoL2VVljS1MYY7s2xbbfCism3ito7bRfgiV/cKZ1IBvk9SN8URDxDtMQ2ds0hBBxnO2dyf79c1pgr0yRTJLNpBJ7pcbqfhsMdAPHnWNxRCoiVt+0chSzfh67+pro47N53driRWdcsqqRrA6Z6CsviLPdcagjeJcKmjCnugncnzqxGQbCI3JxG+M951fAGfL16UZFw0RuxjuJBnu947DwHzrN4siw8UlMWNOx06iQMAdetI8SmcgqoAjIZidwPryoNMWjWlq2tdw2O0jfSfrt5VGNIpgcujMygJ2yBCw8M8jTWPGZXmcSxxMqqCXUkDb+9aMkVlOujUize9pByDny61BiyQRwWtzGJjbs2DofOMY3FECCYxK00C3UUae9FJsx6ZHlVl1OmDHcIXJbOocwBjPyoVo39kL2zCRX2Op9/wBKAiwigNsDG8SuYzqDIN/ifWqDDGnFromNljWIAdm2w+FTivBFYLHJaqyMMAuvIdT6npQyzQi6vSsRTCoowaixTIe0vGZTk5KqOtXT4jiMY8dNRsyVZ5zjuLhfU1NY1luYo3SRlzltAycdf0rm2uCBV1LrTI1DUpGPSjr1Fv7SLiEYBcoFmA+hqMscY0gSPnkVkzkD408DNZvguJIpFyRjmCcY+eaVYhbO6YYHGV58/nRDKk4GnuOPw52+FQeLsJMKcxNujeVWYHZElQwxnFYdIHNuyEg5/OtWyOuMeI2NUq6OmmQdNieY/errZGikbGCreFRqIXMXZy6h61XImckddxR8yCRKFjG2lhRQLIQ3kelSiGCPWiZIcrz3FUr72evI0B0bBl3+dZ3ELdHKKVBBbrR0XTxqu4GZYvXP0o05+44dFHkrEP8A4/rQuYYjhgq/6eZrqJrdZVwRmgo+DwKxYjJPjvWpWbGZa3PePYW6n/UV2FakUdxckdu7tnfBOlQPOjYbWOMAKuccqvEQJ3Owqs+LOll7AiK0ysjnSZQuNI66fD1NWW9rpJ0rpyc6sZZvn+dXaVa8ydlRcD1P8FWi41Hs7ZO0cbHwHqaNSQ7pDawmafHkg3LHoPM09hZvNce13Q0t/wCXH/QP3oiCyOsSzt2ko69F9BWgiYNDEkUAVPG1N8KTEIjE8gKuM1g8dumjmVYyNSqcHqGPI1lDVcukj3JZ5O4r5PdBPLHwzRnEO1ml1yMIE1EjW2nXy6Dc4FU2zW0celDLOwDaVChQeY5nl4V1nqPN1dqDJbq/bCKaTH/qtoBPTSoqdrcW6OTCtsVwcAKegzzPht8qmPZpVNtKipoyyByW08uY28agk00iSQ2cQwcqwBx0PQDw3oiU17PcXWlF7UsgLKRjTgY2HTpQYEiyqjMsI2YAttgZI+m9WQWt3btG0k8asi7AElifHHyyKvighRo9MTXEsgKnA7urmTpG+B51RKCcGAQW9qsjppcKTlF8CSBv8agja3BK+1XEoXVoBESjwyOYwByopYHndYpmYrHkmCEDRtsNR5D60QXt7fVbyzxqFQgwxe6mfE/i3oKTcCOxMsojIUb6BgEA8h/UcY8hWdCPapVuJcJA0Z0Y32/42+dUyRi6u7d7pTLKcAhWwVAONhyA61qTu0f3sQAd0PZnPhzYD+kZ+JNQBBjHdSwtFphymEc7asZqMkktwoxPFBChxrc94HPJVFUIUkv7nDoqrg9/ctgbj570csMWIpZI1EmM6iBhP2/OgiltEnaOIjKZMqWbYLk7jFWOO0wuoADbJpoJO2DurhwjEEr7pPlVJbDg7lRz08xUU/eVmMUgODj18xU1765IwxyuPOk7xlM7gHbUB+Yqx0iFkpWYPM7BiFGygZB/SqypKiNVMhIyMjzouHiMUMqOtqjxhNLoxzqPj5VB7Rrhh2mFYJqUj8QPj8jTWNvBO6wdncGdtgqMACfiKqGhniDkpENLZyjHOKkDjI8KFmJV1UKURHOQTk6qpuro208b4yrjDDzoNBl1pzrIhaSC9cFW0sdq17KW3cYmkKrgkEDO9AyyRmdUbOc5B8DQW9v2cg6K/Xwojs/bIHjbmBgVmOY2t2PeEg89qM4ZOQ6EndxSLjmL6HRIysNwaP4fECgq/wC0luFue0Ue9z9aq4c2FAqz6B+Kw4kU8jmpRzkW5HlVnFGBZaGyvZbVz7+uvPx2Mklzeys91HAqlSylW2yRyyOmwprWRbaOQqUjOcOgXbTjbYc/nQsjtJMTGYfZy2zspYn+b1FJJpWZ7dpUJUrpWIaR6nryrTAia5uI4I44UEIc4LYwzfD+c6Ft0cIzxxFppGKsWOGUDmc/hzWhYWUluq3XEZlI8zk+mf2qaiGGaeWNkMbANoQEg45Hz/tQc7PagECbuEqQNxz86BksmidWREkGQ2WBHw/Wtq5CPboXY6gmpww3wSefh/es+SeWFiigEMNSs2646bUQJGnaIUKsWbbC7ax5GrIpSAySKrxk7q3vDG2QRRcMlxJpC26NH4xEfrU1Nncq0SoofYjUMEfH+elBfbL7fFIsoS4XONcg0MM4x8cY2oW/snRAscpLJnKS912yOfh8KMsA8FoHkUsCWygI2OfrVl7cxzRIuNIYasMveG/I0VmPFOseL0sVRMqCCMbbYPXlQbSq5mcah2hXOo5YgDrXSRW6yxM9tcSRsOQJyOXh8etYd5G6XShirFo/eC42BqVYhECsUUfX3mprcyvcGWJiNJxt1HWlIwDlckbY9avs4JJISyMozuMHdfE/XFZi0XHctK+XLFgSuWXfPnVs1ylzDhgnaocKw2yKpZHjdsppBGxz4CqVQJKTtqz0G+NudMI1Lcgo6Nhk8D0q5IT2ZCfeA7eY9RVFu2mSRTjHMVdbgh+dcq7QnjwWH6VbExjIPTbNWyR5Od/CooC0bAbkHY1GhYAwSKoePu6hzFWRNmMHltVigaSOmKKDbny25UK66W9aOeI8uooWX3gaC1B1FVTf9xGPX8quUEDb1qic/wCJi+NGl4G1TVATmmXlVqjAqxDBQKrlRiNKnHpVrHSAQMmrFXIqjNhtNcriQlt+XStS3hWNcKMAeAqmFSLlx8aPjGBWg4GCAKsC0gNqmKqFg6aB4kzNGIY20s+5OcYUc6NYgKSTgeNcxOt9xG4mOBFbPsupsEL4/GrzHLvrIoeO2sUDXci3E1wcaBlsAZ3/AEoyPiYCSNBYDKNpAxufHGKjAttBpTtSxA3ZVBXfHLwqyS8tokfQksj90HL4yueeB8a24oTyTTTGdLaJSwGppcDUPDffr8hTxh5pGdJJZAxPdhTAO3LJ26VCK/0IqKsSkA6mxknpuaqe9mX37ho0cYB6Ag/SgLSzitVQmNEcjd5nLHlzwPMiqfbbeAYgV5gpOYwNCJjbIHXc0IuppiiSzSa8MxXbJx0PrzFFWtjMNRZYbdFbvO3vN18c+NVDTXDy27IJUUZJYL3QAe9yHoOdU2trNeTPMoGknIcggNj98GjeytOGws2SSVJSRxhVPgOpqAvpFnjZimjYIX2I23YKOQ361BJ7WC1cIsaymRSGUnBJJzknoBQV9M1u4d2EkrABtPugchp8AOg+NVz3yQJP7MBI6Ed494E/1E9T9B51SbebEDyN2twwJz1JH4ifAfWqBobZReYnZ49aD3QMkjofOtK4jsIOxDLqGM958kkeQ61jTTLBfK8imW3U6M4zqJG5+dalsWWImK1W3TmC5A+O3P8AvUF4c+xCQKUBJBBUDl5ChlZe7klWA5ijLhzLaSvkHfOQMDfFYzyfdyHqetQrQV8kBwDGT0q1Tb26TQykuMnTInT4edZ9mzdlnVkk4AIqU/ekZDsq+95nrVRN7qNnAj1YAA3OTR3DobjiF0ILfJlXfn7vnms9ADGo0qADgZFdN9idEUt/GjKbsx/diqicn2W4gqEh4ZDzKg75rl+LxMBhgVaNsEEV0thFxYcYV1MgYONeonBBoX7bmJOKzKMEsgzjocUg52zfukE7jlTTyL7WmBnkTVEX3a5YYp7dTPcht9t8VVSmk0zPCM7tgfE0XbNiygcc1JU/Og7hM8RUD+oGpRSstuQOWtjUjVG8cPaRI/RlBrPsyMUXeydrwxHI5agaybCbmKqH4yxBXFAQSMynJzWxewCaMUAkKpGdsGsX66SXHWpeWMBdIrU5IBChWbfG3P1PzqUd7K0YFvA8CnaNCdCgdc43G/51F2lkLRW/djiOXlY6ct0B3+dJeHuI549cTdqgZm1Fs9MZPxquZrcLjtLmddC5GiMkg4BJ5/KovPbzodNuY7dNJfB3xkYJ8+e1SjsYIYYzcqjSBcHVJgJ0Gw51dKpltl7oA3QPIMZ2z3R/DRVMivJDO6w6A5GCfDYYrLune2lUMGyoOVXkpycjHyroHlX7iCBg0gYE5GrYcx86weIo+qWTSp7Jhr2wNhQVtcRTDtOzLHAGE2Prg8xRkUUN+i4OZ0ypxthfInl+VZge3ZmMyPbuQQHDbc6K0diqzRMzOF7+kcx4g+XnRBlncNH91IdMgYgK5Glz69KmQGTQ+VJzguMqR0AI/Ogre4PZEOyXMefvV04z4EfsKvUgMfZ7l7din+VINQPPr4VFHwXLaV0xhY5PeeM6lwNtxzrLv+9daw2VXO+MbenpRrO8ILvbqU0d2SLbOeuKy71i+ssTvjGo5pVgaPDlnYjJOfQeFbdnaQnh0ZcKXPu905Y9B/OdYUCFO+yFn5gZ+pFb1iztEn3soJGclMgehrMWpXFg1r33kOo7am/QVU0UjKBrGj3sNsW8N60XJ7FQnZYGcBydXmd6EMj9oyFCc8ypFKQ3ZszIyqSyjPLn5UZbDLjnVMCrJEp1MnXPUb1bHKFuEbWCG6CsY6SjxGezOOm9Mkelj4GiowCmB15VFYznepjcUoukY6VYo69Ks7Lcg0iMYFMaUSLnlzoWSHcr16Hxo/Tzqt0zRQqoQuDvQk+1zF8a0CuBQFyMXUPqfyqLBSVaBtVcfu+tWqN6JUgCelWqABUVqwcq1EQMeZQw6VeM7VFQetWLyqi0AYp8mmQHFVXlwLeEucE9BnGasZtxm8dvhEFgBILbsw6Dw+ODWJb2ryRLPMG7RiAwCZA5Zx5gGtKEvJKGaItIZCzto25dSenpV6htReSQaSuI114HXlW489u1kQcOmZ10KezJ0sG2IAORiiTaXEali8KhsrknOnn86tiiJuwGuItOdlLFtvTPOrwqRs8i9pJp97THpz8aqBE4YotWDtqx3gETG/XGf5vTh7ZdLezIG0EL2zdfD61dJLHGCzBdS570sud+eNvhVH/UkHZaYwxxq7iAdee/Pl8aAyWRwiZ7oJ2EKAAY55Y+maoEsqsvfQaxq1KNbDfqTsPWoze2z4Edqrrs4Mg1bnb0qq4twZily00zKMhI9lGTyJ5AftQKWWNFZVLTy53UtqPkcnYfCqJFaUBWCQJIC4iHellPTJ/fxop4JYGGlVjhRd0iwztjpq6bVQ8scERLSJbhW2giOWYkZ50RTHbmNyohDydkFcJsq9Mnw5EY8KHu7vTIsEOBJlQ86nO52Ax0FPJeieGRIv8AtySojXOrO/XmehqMcIjeG4nTVJpUFc95cdT5+VUCTZhRGVWMcD6wpG5Xq2PM1poUYIZlmUue5b4wW8M/Tas/it0YpXlj3dhlyeRUHYfzwqcN4GJZsGVyuWdzt6YqDRmLR8OnVxhl0gj41jSHNsxFbE/e4QWyDrZe8Ou5rHMbdi+CSaQonhzlFR8DIfODSALBieZagYJ2jkVTyzvnwo2bVG2x2O4NEHwkWcMdzMmdZ0oPpmroOILYSh4I9M6nIcjpWbbXgiiZXQSd7KEnkahbC6unKpE7uTsFGd6qO0k+2WYO5AqyEbvmuUmuluriWZssWY+8c5rRh+zHE7mPHs4RW5mQ42q5PsZdxDMl3FGPAAmqOcv8a9K9d8Cn4ZL2NxpAyfOugm4Dao6vLfAuo8AP1oZrHh6ZJvO900sBTKsrF1iTiBYdATSt+7bDYbgn50WbO0iZmjuQe6RjI60OEATQpzgYz41JLGr1KiTnhoU9SSKq4NZo5Z23x0q7A0RoTjbf51WJhaynsTtUtxJNH8QgRIVYDBrnpFYagTnFGXvEpHTvMKAW4DIfGud+u/PzHQrPd7CK1iA5FCmy9ep+tacF7BHEDNM8xK5BGNIOcAAcyatMvDLm4UyEvrG/PSzcsedPBeW0SaLWBlCNjLxkYGeWfP8AWujgqL3d3GzQ2wWVj5YA8R0z50fHYRRQhriRpO8dHaE4VjsQB1oK8v7ntTmZbVDuuN3+QzSsrieWeKOPVkDT20x1Mu++BQKI9hNK2GSQgKEOMYxjGfE8/wDmgbi2VLQyasiY5Cr03wMZ6UXdTRh1WM6pJGGBzLb4Pz5/AVC+ZWfTEQYhsmBjCjbb1JorCbsYtSRtsNmQjJ+tW2sgiKhctC2582znlzqV6jJcKVCMrqA6ucbjzquUmIBjHKjg4GdzpO/OiDoI4ntJUfTGx3Jz9QR5fnSKMisUAckAGSRtI5cvPANQsJdEQilUs+4DJglcj+fOtBFuVYuiJNGwzpGMDAxjHjRWc8F1qRVBB6OH7uev0Aqy6hliQyy6HhjBDEAHPwoh7mBWb2i0KKuTqQYz5jxNJXinhdre4KEkZEq5oA+yjA1NA0eVBVRuaJglSNFCXDwhGAOoZx5flVY7d4jIszqQcEhRg/EHNFpbMifeSwyYyzl0xvn+9RREj9rq0XcTEe9rAx4Y+lBz2ksrhoo9I5jSc6j+1WS2K6yrwozg41LJjf8Ahqa8PSKEsslwmpchtY/nnQVdpLFlQGJAxk8jjrVsfadnq7rFcHYdevw50IsyxH7u5kaMnclATvvz6b0X7cUUrHeRnG+Gj3zg86mLrU4ddOX7OVVAIyrKQR6VogDnXMJNMArNHbq5j2ORu2cZGK17G+Lqsc7KHIGk6h3tvzqWN8df60GGxqAHj86nkU2Ky6q2G1VsKvNQbwqKHkGFNZd1tcQ/7v0Na8g2rIvtpof94qLBkXu1co32qmL3avU70hU1UA5qwDPpUcjFSU1qIsC46mrVwDVe+NqZ5lhjLOcAVcS1OadIImeRtKqOZrnrriU01wiwxFppCDGrbaR0OfhTcRupLvDrL2Wg92Mrk8+ZHjUTNGshEZlkc94IdtxjBGeuDnHlW5HDrrfQh2uux1SmIl2B05zgeHnvSnt7p3VUkRQTnIwCp6j9KrhFpC0naK4Vu6F1E53zt5Z+dTM1tcROqqWdlIGp8ZPUHH51WFVxbHCJLeKoBwwbJOee3wqySygn1RG7LhichV33zkZNJ/YiocxHK7HYYbfwqM/EbeGNPuF3ID625ddsfGgH0WGtHMUkxyMHGd800t9BCNUFqhy4QaFLH4+Bq5OImc6FhjiVdxjByPDbrUGWZsiCZ9DDZUAGTzz60FkiX7yh5rjskyAcHGevLocbfChbm/txM8aHtdWQY+ShtsZ8aolEqyN75fJQK2SRv1oqwS2tYM3aDtDhiJO6uPHxJqioRzPbFQ5jVR17qKcYOo9Sc1C3SGAu+gqrFQXb3c75C/1UTfXglh1yIGDJqRdPcHovX1NCww3V6qtKxh0nOsDfHTnyAqIZ4ITc65ZJIS/uqoGo4zqby+NV3dwDif3ABhUO7Mc/r9fSiybeFCkTLKxGV1HBPUk+XrQEzssZeRtz3lYDc/7fh1oMzibYtmLMNUpyfADw+FFQmFYF1xIA3PByRttWTxKUOACOoBxV0LELk6EiwBg5OoUR1c+DwCAr7urb03rFZwmc4retoPaeD2kOrCkA6sdMUpPs3bS//wBRKB6A1IVzd+QoRgRqPhWhwSK54ipjWLWUONbHAUetbkH2Z4ahGtJJf9z/ALUDxTjsdmhsOEKsaIcGRR18v3rfM8vUZtxppw3hPCxr4hP2snPs/wC3OiF+1UNvGY+H2Soo5EjH0FcOrtI5aRizHmSc0dByrt/FJ9Z82/P9o+IzA/e9mD0QYrGu725lJ7SeR/VjRVnHFNcJHKzKrbZXnmiuIfZ/TJOtvNqEJAfWPGrPGVLtctKxJ3YmhWOa32+z12zEakGOe/LIyKGtuCPcx6xKuNWnlXWdcudlYDk771Wk8sT6kcqR51pS8OxYyz6jqR8EeXjWS3Or6qTY2LW79qhdXwJFHTrSMWRkms3h7abtRnY7GthsBTXh/aZ09n5e4xrwaTQ0T4Yjxo29XJzWaqk5wM1jlu16TJaXSajGGUKGYaVUaTjYj0oXs+9DHPcTOysTkSe7keG+a2WhhDkrHbgKMtrb6UHPfW41SWcids50ARR5XJPLJrTAK2tLxZZGtYdBUAanz6k7/wBq0JIXjhLS3yAybMsOByHLP996Aku5GunLnTzHefOpgOvTbwqm3iZ3IL65HGMle6N+QHz3oDtYmCCJCDHGVicDBOfxY6dfzpplIAwuGZxGoGD3RzHzqMqJbl1hJ7XY5zlidu6fDnz/AGq2LBZmGRHCTiTmWPUUGZxVFeT38qpw3WhbWOQznspmKgjUjd7Vvy3om9B0CUalK7+HP86VvLEy4DCKXB0sKIogZY7qePJKGTUFbnjBx51eBLZyF4pHKyE6nO2Bnn6+VV3Fxs2pEjBTQ2lenTfHI/rVkdx2cYWRpDHzBO+nywRzNAdHxC4uSCez7Ir3lbbHQZqv2i3lH31voRxgMg5gbbfzrVbCO4wQgUsu+NvP8sUorRSCsbai8Z7ME+6N/l/xRRaW/DppEPbdnKBkqpwKsSOQhuyvUL88MME+ZoGKzNtP2jR4TO3eA1HlV7IonVyCRrGs/wBWOvp0oLDZTuffV0xsWXcnkaoFveK4TEhLDfD5yc/lj9KlGHuU0xtLGFI1kfh8h61NO3ZyRJJGdI2YYLYH8+dBS961qRqUsNQ7hxj8qstmeR2EsMQcnOkoPDnTNeXSFm1dqmxUNGM5+W1TW6uESMugyq4J7PI55/aimltxGHkNsp7q473XPM49aoZpdSotiG0sPdkPmdjRftF0F+7t4p1dfeEY94ch86Gae6jfLWiLjqVJLE8zRGlYcVOVS6QQhlGjUxz8fnWyrgjIIINcyAXjkeO0TMJDoWTw6Vdb8QnDd2AKo27POM+JB6cx86zY6c9/6380zb1RBdRyg6WBIOCM1dmsOsquSsfiWxQ+Dg/WtaQ1kcVIELH+nestSjIqJRdqEtnDKCOtGRmtRLU1XFSAwd+VRMqopJNZ9zfs2tLcAuDjvHH51qRm9Y0J7pLeJmIZiBnSoyTXO3l3d3UyaVbSd1AGw350UWdbg9pFcAMuSUlBI57fKoJCGkVYobgKdmftMn4eB6VqRx66tBxpcrmUpK8hAZWI1bDPSrba0lnbXK6ojEqVOQc48Pj9KeWznh1OkcwZyAoVu903J6+FT9nv4tClZGIU8nxjHU1WRBgV4sCcHkEByDq8/LFVTWeA3YSRBsAZGT15EedUtcz6AGfSTgEK/L18KVrI82stdDAxgEnf+eNA336TGFIWkZeoQ6dueM86j7PK0b3Fxblo889GDnl15UULuSMBorz3xuSCxyKmIXMYNzdGVxuq5OAMdceWaAeR7UWSwLbltwmU23HgauF2kK4WLSwwoGSOQ8eZq57csEdUwq5OkDAY+p+FUm2hgkBkmXfbAbUx/wCPAUDxSSyAsFZA5y6xgAHI6seuNqHh4b2t3qklZwp0hUGoKp8SefhRUtyscWr2cnAwDKcLnltmhpLua6HZLIV1bBYwVz05cz9KCyWK2gmCOdbR5BVDy5nfoo+tANPezSKCFRCp0hNyOud/zNWGOKNAs+EXoBjUeucdPqaAu7/EmiNCI8bKDkk+JPjRF8gitwX7rSncjmM+Z61iXV200kio5kc8+mK1G4bPcpHLcDCy5URqeRHLPjtVsVlbrD7RDGA0Jwe5jUvT45qwZNpwhLqDtZZDnkP6Vz/ejV4KUgaIoVGMk5yRWlZNEySws6aZlOQoxg00ySLHGEky7jPLqNiB9KI1bNRFZ2qLuFjx9KMaTs4i/wDTvQiH7uDbB0cvDYVdN/2kn+0/lWYjJ4r9ooJOGFLOQ9rL3W2wVHWuXQb1SnOr0Ne3jmcxxt0TEKOg5UBGaNhO1aqQZDMYZUkXBKkEZrodPFLi3kuB7PpuQHYEeFc0AW90Enyp5ru+jQKZJlVRgDcYrlZrpLgu94nddulsq9jclhrY+62NhQgj4nCrKskcali3oayZZZHkDF2Z/HrVUs8znTJI+3Qmtzj/ABi9Hv2mR9Dz68jcKdqy3wM/SiJDjNL2YGxknfOc4UVv4z9oW2bTNmjnuSF86BiK9opGfOirsoFOK8f7Ta9X5X0jvKCTUYI1UEGqo7gKpqoXB1GuUjdrtRbRqx0W9xIdI7smwbPMnH83o9LLRGiLojjEgJGr3TjbnnemueHSPdBI4wyYG0jnSNh86vh4e0eqGNVUruXGwPoPGtMhHtrY3DyF57hVP+1R6MfrV4lnWNAI+/nuIh5jB949evL0qFzZ2rTk3t3lmYaI0OQBnbajLabZo7C1KLz1k6F69TuaAX2eeKWOS9eKMRAtheuRkZ/b41BcSokI1IiHVKTuQfD4/vUuyLd+6ZrkqAyg91B5nxqmScYiggbvOdZZsjSPHH86UA3ESZ/umA/0b7aeZPmaFKoBmbJjbcgLuvn6VfNiW+jhJ7iYXbkarbSyoykjIIOfWgd2aOWFn+9hcECTOzCrXht+yVIWkUq3eHPod8VBLbXbyTBmUJ3jH4MOoHhUo1jkdYyVibGfew3kT+dAo7dlysPMgAYOCvzpYlQIYlCP3hg7bnbb+9ErbIu8FzKdLZC8wNquRQmnvCaRBpUKN89dvjQBw9s6tCJyx6Bm909BvREdwVEbBkbSDr0jc4FSYRiTLxyGJVwxYZ39flUJQg1OsIQ/idk2Hpj+b0Fj3Erpo5qzdCcgZ2wfjU7efvSdqs2pD3TnIBG3pzqvs4SxdJkXbuAsRjxNQaKKIkR3JY7b9tk5JyTigeHimiEDW7Ppw2kZJ8x5CqI+IsrkLPcgMe+CAd/HfxpmtkV9VtOQpyoZhzB8gKgkZEJdg7BiQQvPyOPrQHniWEiKM+GYEjSPdOR86pnvXkdCssm7ADAXAJ5Z/nSgEQOQiuXKse4y40gHmam0bEIEcOUAYrkBc5xj5YoCJL2VXcSSzsCF90jB61dFfoPupUZo3UbYBOc7dOu1AJcSAFMtiHAwg/D13FXT3BMioEc5OobfqSKDTmvY4Ym0WsocEAhVGF+P1qyPiDISZBpQ7qCcnFBQF7khpw2kj8O5Bxy28qUltFGuWjkIwD98+PTrUxZ1Y0/a43LAMMg4IzuKxONT5gMasA0h0jPnU0LY0ypCFJOkFj3c+nM0Bd2Ed0waK4kSVDkah3B896k59t+foXwy9a2iWG6yGQYD9HA61ojiGqIvCCw6HkDisWOOWBwXQFgdJf3lI5beVOsjCf7pmI1d6POw+FXE87jUM0V2AHlZW58+WDvtTxRToSyTxuOhYZ38aGguYWk7Nu4+nAyBhd+lWOY375ne3kK9eTc/Daqwa5F20Zj9nRozjJXmwzududDIiRsztFMrA50q5B5chRiPO0YMTlgEAGD5c9qt/wCoSaRHJFk74wAeQ6HagoWaLU+JJ07ucDvb/Pn+9FQOoUP95p3K9oSS3ht8KjE8LHVcWkZJAI05HSorDYNGmzI5ODiTFAUwlkiV0MCq+dXdxU0fU2vXbBcH8HTbf60KEhjeM9rIDgrlWG3/ADUjNA+5eVxjBGRy8DQESXVpgaZoIyMd4DJ32J26UCZ4nZxHdPPhwCBhAu1Tc2CqS0eM90KWxnr+1DpJAkrSJbpgsQMnI2HP50Fijt5cuy4K6ihdmxUvZ1Z9UazLqByyqE+p3qtbm4lYlYHAJzg4UcsUztM0m0kI8mkHPzoCcRqFlLoQFwWHeI8snlWbNeaw3YfdDBDsBuzZzgHmT49KsuEQNiVhIcklIty2Bt6VX2TySsrhEuGjZUA5AYzgUQHN2xXDtojRRqIGpjk8s1r3lvBHAsSxLEzueyPPYjwrNgQ3NtqdwHZCp35lWz+tajO7RwyEhs6X045Y2bBoA2meHhUpCKJEZZdI/Dg43+lFWjCQyI4OmVCmGPUHP5GqLOJtbRyKHLKe4ceeM/Kn7UZjkCqdehxjYf0mqK4pCO9LjUPdCr/Tzq+/j7rMoyqjtQc7gcmHyxSvgIbx8ZDqQ4CgcjzJ8qt0l7JZ9ZLo3ebOcgbGgKA7sWOQT9qtn/7SX/Y35VBhhB6VOf8A7OU//Tb8qk+s154vOr1qhKuWvfHATHXRfZ3gzcScySErAvM+J8BXPQqXZVHU4r1XgVottaxxAYWNRnzY1x/XrI3xNJo+HcFs+0eNFAG2RkmsC5+1dq7lWslaM9TzoT7WXrXHFHiz93FsB51zUx6VnjjfdXrrHZQrw270XNpboTnfxX4Vxv2jAHFpcAD0qXDOINYXYYk9mdmAobjFzHd37yxElTyJrfHNnTPVlgBEMsgjUZLbVo8TjEXCyijZSBUbFBBbTXsg2UaU8zUr7MnB1xks2KvV2pzMjAiB1A9KrJdgQTtRCa1dYnXTg5qKrua5d/XXkMUIFQo9kGmhuyy+Kw19elkSXDM3/UMqTjUE2HjSFnAJXc3Fw3QEE4xnlv8ACpqII4WRZoFLbDKsP1qiWeAJ2QuFcBiSqrp29aw0ulMdsZUiiUDYGU745EUlebQSZVkPM8hkeHlQUdzLcLpUu5VTlSM/ADpmoSqVAaeZbePn2aAszetA0rNKAmp9UjjQA5YHG+cfCozyNGpwurtCF1OcjbnnHI9KNYC3RRaxYdxtLqw2M5OPDaqL2z120dsjAKzqyoCcac748fXyoBWTsbRpDIhkmPZxlf8A8jVE0bBQoXBCqo365NEOyTXbGNV9ng+7QDmT5eVUyKsupoycAnfOx2xt8c0F1jeGIZYBpQp94bFf7VfJFbTMCY1Y6cagd8etZwDPbMi4yy5XP9Q5geoqdoznAgYd0KGR/d89/GgOggnRH0sQDhtRXIHkKsdb4xal7Ni5xkdB4UNLPOyrowAp3bn8MUR7RM0WyOzBdmO2PP4YoGYSk96NdBAG2QKk7qGKMsulCTnfn4enKq475dAWRFYFSoyCd6uTiIkKx9muQMls7KNqBBon1KI2LIB72CB/aqzLakyFGcYI0lYhjxPSiDcRSE6jH3+8yK5Bx5nwohb4AsgEW+473MUA8UsGhEXWdTEkYGScczVIlgUFgHJLYG2Pj8KvkuI2J7RSDqODnck7EemKn/1GICQGSPAHMAkAeGaAZiiMwED741PoGP708gR5Q4s5OybA7pAx5HHrVMvFGwhiVZRzGTgZ9KjHxO7Lu7lYic6Qq7HzNBfPDcu2qG1GvkhaTbGeWB8/jUIYLiJtd5JEpCggaMhaAe7uS+g3EgbY5UePQmrbm7XsAhftHA95BvknxoD37OESO1zJl2x735eVASXtsGLJAxYf+ZKR86ogyzExRkkjcuc435k9Kut7UzTGaUl2XGgnkPPH6UtWTVb3UxiOUUO2Aox3vXyGKpW2upGBMpjGcgKK2IrUBix3Y82PM1eIhnlWL06zj/WZBBNFJqZmlGMb9PSqpYdU7OYTg794Z0+lbyQ5HKpi2GOVSdVfCOeOsmLUqsmcliN6pZ015id0k2GSdiPGuglsUYbjHxrIfBIiUrImOo93wA863Lrn1ziAuNSu2jccimxA6jbmf3omG+7ENHM50k4BkUMKoNmBGg0FwxbS4OMY5k1VcZjhEokPZhgmg94lqrm0faZHlITsJFB0lQWWo3DI0KyC3BAfUw7Xr4jyrLLntXUlSqE93RtjqT86IhiuGhd9CNFH0I/vQGOlpMoPZtnbOmVfD6VEvbNPhYYlBzqHb9fDahezKhXAU5PLSNqa3tmkJEqiKBF17Lk88c+tAfM0EZ1dlAZPeHNv4KokvpsfdhdzkYXSBvzqFxbLbQqhbW7gnWR05AD41bcrCkQTA17KSPLnt8OdBWkdxdzmKVsNkgsx5Y57fGqTFJCZE1KANwxHMfpWtHagK8oGkqmnBw+onc4PjWXMI+1JVGKsjfDHdB9KAnhmWtJZGyWBK4xjAOw3ogxk8Qt5SxEKkBs7acqQfXNUW/bRx3cUYJmVdR/EMDl6c6NmCyw4IIVF7pG/exQZthFJFL2IySJSDlcYDd35bVajAW4jWTuwytHqK4AyN/jtVsNy8MLOBsXDttnAI5/E5priBI5LpIwWQMJSMj40A6l4+MzPkumkMGBzyxmr2hWS0aAbFGeMA8iOYpRqptu1yCH3G+4HIjwqNyzgAAFCVV2OrOcHGMdKoacyGa3lWPUjRMjtjOPX8qv4dcLNalQVZSoII5560NcNIkeEY6Y5NajxHOmjd4Z10qRg6WONsnJzQbYH3JzzBppv+xm/9pvyqePum9ahcbWFx5RN+VSfUrz1edXoKpXnVy869zzjuHEC8hzy1j869asd0kx/V+grx+E4YMOYNepfZ+9W5s4ZQdmUI/kw5Vw/WOnDiOMZ/wCrXOf6zQ1nw6biVwYYCuoDPeNbX2vsWtuJmYA9nLvnzrn0uJbd9cMjI2OYrXF9eks9j3+yF9jLSRAetC3X2ae2i1yXKZ8K6rg88txZW8krFmYNknrXIfaiaQ8WkTWdK4wM1OeurcLJJo3iHD7b2OKJ59McYzpXmTQNxLHa2ZcKWRTgZ9KxJHeRhqdm9TWnxXbhbY/qH5Cl5z6S6xjKZ7syEY1dKhHzPrTQZ7QHwpkPeNZ6+t8/F7+5QJcrISDRjnuUERlzWWo9EjuUXSLiFHWLfCk7Z9asjZzPot7WMBdg7HIyPChnteKYMLurLupKncjl8qjFw+5mMccsemJFwoDnc74Fc2hEuhbgdrdIGY4bsV/X4VYkiqFS1gLb4WWbAA2608djCkaqViWVd8qNRz478gKrllt45WFw0Ukw75kY5HwoE6PdNriYSaV/zDsvqB4k5qLRFopYobjtpTnVMRpC7e6D61BJZWdxaq66lwznIA9Klok3WVz2bbqBjb0HU0AmkwW8cMWdIBHgWP6CqrwaY1QoAdQQaR0AycUQpVVlLLpaNio64/m1UzNmeOMAlYxp/wBxO5oHnVPZX0hRpTbffI5/nVNvGiRqrxFHcDSQck9TkelXFQsE3d33JOMbkchSs442ZXlVu0UKSVPTHP5UFjpHOGBkMhUbZGNONyT/ADpV5kftMuFMWyjp3Tz/AOamkMaJIikgsNi+MkHw+tCmJNcapg+JMlA/YMur/FKmo5I56eVOIjHcDTcIygZ3GSc1MpFkIi97GSA+dWPXzqnuuoRbZl6FhIMigt1zMoCtGxUA5YAHG5NWNOYUUkCUsuFVB+uKqaCI6s6omwcKX3P8HSmlt0JOicnT5kbeHrQJbsuoBi1hOQ1YwfLx2NU3F20mSwRIDg9nnblUofuNSyksCRtyxt40pGhSR8ImMgBefxoBBJpClV5llBQZ+FXpNI8m6liSNj3dgOX0qeovgRQtk778hVq2txLjWmkZycdamxqc1SwyCupC5JJyMj+bmlJBJN2Y94fiJHLwx0rRitCqgBQMeNELBgb4rN6bnAKK0LDS5wg/COvrRiwhVAx8qISIAVasXjWLddJJFKRbVasYqwRnNWCMj1oqCJirVTbepqmkb1IDyoA70rDayOTjArAs0BgkKxsdbac5BxvgH5n6Vp/aOQx2IUasu3Ty/goSyt29mjWRgVhQSugOxx0PxNdOfjh+l9oyfcid2YOsKrGBjHjkn41nDvRW2EC9mDM23NjyFaPEWeOxtoQCWmcHURnPX+Gh2btNClhrUlcKuwxzI+Vacwi/dW9wpjy2AGfO+/8ADWoFS1+z6AjJlbWyseY8fy2rMhjeW2toSGTLPI7Od3AGP1rY4jEoe2twBqwoOdlC9fyFBVdpAIYIQGdhgnG2CQAP1NOkJltVeJcmabA2wAq7/DGKefSkzSLFns2AVic5GCfnvVwQi1s0jcMSD7oPU9frRQVyxN2IWUhFdQARnZBqJ+dWKRJfRRqqhtOCwG3MDby51Y3ZylwzlWCsxPPBJC/lUTEsnEbhVw7Eovu4wQpbaga0Z4kklkBC6mOkjmxydunSgpmCXaIzHtGtgpLb947kGj9TzW6qVRQyHbPLGB8OdZ1sCeNSiQAO0nfBXbHTB+FEHpIF4qjMWKTW45nCnI/ParpCY0IAOkMuExy6c/SqLZdHEIOxkDMvdOd8LnmKKgd29oQlghDMNPIEUVlqcWk2I5CsmY8ttjDbenOj2uYDbQysrKJEVHHPA5b1VI6/9OnCys2iZWJ08sjz51TNITwgsASqI2WXnnnQVhFWcJGGMUbMuk8sEc6JlcPNbZCxwuhB1Yzyp0wk5CSAaolfLjYjrQlzpaKKXuM0MmnKjA2PnQXWp7YyCTOZITgY3yMg/pQsjMYYpWP3Zw2G5gj/AIq+eLXeTSIdJSUrzxkEA1VAzrBJFPJpjjm3xvkNyqo6NN4XPi1V3I/8Puv/AGm/KrEGIG/3VC624bd/+yazPqV56vOtfhXBbviiSPaoCI+eTjfwrJXnW3wPjU3CtYRFkRiDpbxHWvbdz04TN9gjG0UjI4KupwRW3wDi78Mm3GuF/fSgoOJj2iaW4tYZjK2o6hy9K6C1sYLi3SY8KOlxkdnN+hrHd9e2uZ/jpPauGcbsuyeVTkbBjhhWFP8AZG1SQs18BFnlVbcPskRXNleoGbSCrA7+FDT2tscoYuI7dDiuU9fG2hd8V4ZwqBY4XDmNdKqu9cHxO7N9eyXGnTq6VuT2NnGTmzuyQNR1MBtVPskWMx8OG/LtJa6cSc+2Ltc0c9Bk0VcSXd5DpZFii6k7CtWZZYV29mgGfwruPiayLi4i1EszTP5nOK3bqZiqJ4YraSFW1uWB1AdKBHOpxL94cbYFVLzzXLqe2+Vrt3aG6mrmO1UgEtWW3ewzyRrrF0jEnBJJyPUUo5rjPeu0dV76nIOd8ZxV8Sv2XZu8x7pDgxqwHl61CS1EgUmPKjBwsOCa5tKPamkDJJc6VGTsMH0yfjTyqGlV4IMjA78gIUZzyq/tI1fCWTtKNyzgJgeNEPbTTDU06wxAAHTuR1xqoBo27LV3nAK7s51E752T96hJKpuSHKe/3mJ1EKPHw9KhLcI0svsuqQBs6lOEBO27Hc1BbVQ3a3J0oGyAox16Dn8TRF/aIskszoS6sz5/qJ5DHSg4we0d3yWYYOOQPX5cqskleeTCxdmCoKIxPIbZPyqIXA7NeekFseHh6nnQNd60gAUntHznvcvSrYWJgQnOTsAy5/KhbsXMk7SrGoXGB6U8VrPK5dtIHQeVS1uc1bIe6GKrqXcg5Ix40kY9rntEiJI7oTarFsbhl3lIB/KrIoWyAxJ8Ao+ppsXwpEojAiTDOTgqNyfhVTFlbSWcZIxtj40WtjqO7OQOWTVq8Lj5FAfWp5Nfxs/2pDKdPaNy72258aUsnbYEavsMbtRjcKjLkqoU+VFW9l2Y7+/rUvROGZFZzMSxVRnmTuaIisghy2XPnWusQC7UxiHhWdrfjIDXKjGnFSDGiuxyKQhAqClSasVSedWiECrUiwOVFVotXAbYqax89qlo2oIqMGp5xSApac0EdW9WCmVRmp7CisH7QASNEpBYruFBx6mqu2ReGPqQYdgjZ8z5eRpX8jPxsrsY4lBIJ64608cLe0xqrNGsrFgOZwMmus+PN19Q4goe/t4Y1UJpzrHgOnpQaxtBbrcP3ie0k0lhjfYZ69aK4hK0d+ZdLERoSFJ8B9RWdd4MMil3BGhSp3znfNVkoIg1/Yq2QCc7ZOo5zW07dpxSFpEdW1cjy5dPnQ3C41l4ncnSy9jGioR+E46VfG4bi7s7gCOF2Yn1AzRQ/EZRDHCSyd5n2+gozXK08KsNIRFZlHNtjkfSse7KTCyVgzKzEsUOwydjW7ckCWdQCrLE24PTGBQBoyT9pzDv2Z5c+Z+NS4Zj2qeYuQqluQ57ADNUxIq9oASml0i1Z/0H96UMam3ul5BzgYO2NfXz2oC0T/D9mGUkvpAxnbVn51nRs3/WYlkU7KWbIyRnVsaO0auJQw9owLMdOBt8/Ss9ooouIqpBeMbF8bjmOfWiEcwyQy4LRByCvLO/L9q0wO1ZHjOWLlQSdJA6iszjAjjtLNI2LETMwBODWpZoe0OkKEExwRz5Z/XFFBXCpFa30Op9SorkYBz4Gp2XZyKiOUONJ5f1DGai0DJfzqigmS3dQc51HnUeBpNIuq4X3dOGHQr40Q4j0z2u5YFGQeTAULJqXht3oKjMgcA9Mj960IGLiwYIo7WVslTkEnNVaVaK9iBDHsxuRzO9FBXEii4zJmQOsTAKcc9s1RcxyLcz9gMlwjENuDuKsmkV7WBniy7QL3tW+zjanupHhuHiVtuz1AnmO9VR0sY+6f8A3Cq77bhd5/7Rq6MZib/dVPEduE3h/wDpGpPqV56OdXJVIq6Ova4LkrWteKXcCARzsABgDwrKXpWxwbhNzxWR0t9I0DJLHArPeZ7Xl0tuLu7sYXN7GuSJNJQbHNVze2rG5jvUdlB2KefL6VjcX4XJwlY1knDTNuUQ7KPWsd5GB94/Ouc51vW7cwzzBxc3kcf4c6QMjnWZI0au8c947KAMYarbGW1a2VDavPOM6sDOaH4nMsdrIgtOyWTAXONqs/xKDnmsoyCMynHMnP51kXEiyEaUCgDHrRMEbzXCIg1OSMCtb7RWcUNkjJDGjhhqZeta2S4z9c2Njt4b1R2i5NELkBvTegDzNY7rXInKtTrGOhoSpBiORNY2NO81SlBoaCPUxJ0Pz8vM0hPesGaJ10hQe7k6avlikR1KC2K83ZTj5CpwXE8cDKbqEN+HQpLDy2+Fc3QM73M5RZNTPkFmCHAHnmkbaZijXMipg9xGbOP/ALRVxhkliYSyuCRltbH9KrafTCYkYEKezJjGAfTxoLZcQMEgT7xjq1ONgR4L0oe6uGjkSRgrsxIwBqZjSnlCSGSc6AMYCjJI8/pQvZpHIhVmyUywOTz6CiLwbhrRmlVFfYEjcgZ6eJ8aSliS0Ssx1YLHbNTRSkj5yCwxpHhRtvEdqLDwxdpjWTjwIxRa26qc9Kuh7gA61cAjc0U1zsdp3FKoujGBUIoAG36UUI4+mR6GpLADycj1FMrXnFYUFskCpADwqwQN0cH4UuxkH9J+NMp5RWVHSkqZqWiQHdM+hpKSp3Vh8Kzi6kEwtLSMYqepT1pwV8qIgEz0qwRCnBGOdP0ommVAW3qwgAVAHFPqoHxTioFx41AyY6iirCQKgzVDWzDYZ9BTHtSPcA9TQ05kwaYy7Gqmilbqq+m9UyWWsEO7n41qRL0ye21cSuJUbO4Xbp/MUXYMycR7EpjREeXNRn9hTxcLETNhzucg45Velo0SyGOQamXTkryrbgxrpdVz2cgZteFHVtzn9aHuYdV7E6YdmIK6dzjJG/w3rUh4Q6SqyyAsqkAnnTf9GkS8jZGzHHGqjvdQOfzqojwx2Ns00asgmuAmR7x35/KiIUVmvJA2yJpPd6HJx8qtsbOa3tLaIL/lOXYluZOatewkkjulLqnbMDsOQAAxRXOqjniccQKtoaNQCd8Acq17mVit6ralYg94HbGQKvteF9nfC4aUEjJAC7ZolrJnVw0vvMCe7z3zQAxRrPBgphRMxOnbOABQ1u2ixyMgtKgXJ5ZYnatWLh/ZwrGJmABLbAbkmnHDkVEUSN3W1DYc8YojL9oeO4RizgxRPJpK43AHz50KADfxGQkr2Y1d73SV8K3G4cjyTM7u3aqVbJ6HnUF4ZCGLMWYnxPwoMW8maSaGF5GyyEFj6n9hWnw/WbyXYgLMFBPUBcUU/D7Z5Fdo8sowCTy3zVsVlAigLHjDFuZ50GZbTa+MzyKwAWE4GOXxqvhU8SRyMwOckAZ3OT/atY2kAMhES5cYPnVXskSjCxIB6UGNPObTh/D0A0qZDIMHcLuaZZlEd/h1AWNVG+xPP9a15baN8ZjXYYG3Kq/ZowCBGvyoMF8CGKPUX0wqMr0ywNVXXeuZTFGzEoq6uee9mui7JV5KB8Kj2fe5VRoQ/wCT5liap4rtwe8P/wBOr02yKo4v/wDst5/7f61J9Zrz0VbHVa1ZHzr2uK5a9B+wNuVsJ5yu7sFGeoFefoNq3eE8fveHQiKFwYwc6WGa5/pNmRrn06r7Z+yHh5M8bLOP8pgOflmvPHNbvF+O3PFYUjnEYVDkaRiquF2LzOJIXglzs8LnGR61nn/me2r7ZEVzdWG6DR2gBBI5iq5/aryEzMSyqwUbcyegrtxwqBXt0liLJE2pUbGrB/D5jNUS2kEVtIIysUakkHG655/HpT+SJ4uJ4dK1txGM6xGdWkk748a0eP31rLbGCJtbZGCDmsu9aIzMIE0ou2c5J880IRmt2b7Z3PS2yhFxcxwE47Qhc0fffYniEJLW6iVcZwDvVHCEzxS1/wDdX869RPvH1rFmtR4vc8NvLRiJ7eRPVTQpBHOvcWVXUh1DDwIzWZefZzhV7ntLVVY/iTums+LWsYvfyIhSOJIwSuQ4OfMUQbQ9rpkuJFyARFGNwMb0CLq51fdo2VXcBgRy6UnNzcqygsjEgBw+FxjnXJ0Xrasiys7LFuSxGWOkHzoYSxvIiWfaNIgz20q7DNIQGQKsbNLIMjHJcVUkdzJpV2VIUGyodj60DJCGaR+0eRycsx5en82opAc/db6vxEb/ABqwW7zMUTZAd/CjordYhhRv40A8Ntjc86LjQDlU1Q+FWrEaggoq5M1IRgdKmFxQ06gVIVECpDIqmpU4JqINSqLpwTUg1QpxQ1PI8B8qWEPNB8qjSqYun0R/0in0R/00wpUyGn7OPwpxHH/TTZpZphtPoiH4BSwg5KPlTCnwaYaWqmpYpqGnJqJFKnxVFeBTaR4VIikBvVZQwKXWpYpY3ohDkKfxpDlSoGHOnzTdakFJ5AmgYcqVTETkcsetTFufxN8qYKPGkqsx7oJotYUXpn1qY2G1XECi2bnqAPhT+zuPxLRNOKYaENu++61A20n+n50f41AirgANtIf6fnUTaSYPu/Oj6jTBn+xyHovzphZSZ5r860KamJoAdfU1Rxf/APY7v/Z+tE6cN6nNDcb24Fd/7R+dZn0efirFqpTVqV7nEQg7ucH1q+PYV1EVnaw/Yl5FXLSKGZwMnVnl5VnWXB4Z+GR3RuSheTs8FM71y8434ss8qaK6mtW1QyMh8q2ZPs/LGl2ZJ41Ntu433HQ1iQwm5uEhUgFzgE8qssqe417L7Tyq+L3BTGzqg1CsbjHFpuITN32EGe6nlV0nCXTipsZ5Vjb+vGQag/CDFLLbzFhMGUJj3WBPOpJzPZdY9PDEZJo1IOGYDNa8UNqOItYmHV3gokJ3yDvUI3ZyVkGT7QAg8PEVb0SFY2wt/tDFEpyqTLj516KeZrhbZAftMCM/5wruTzNYaOKcVEVIURwsaWkexldGbnkHB8qIiiARIu8ETfvHT8/nXQvY20pzJboT44xU0sLVTn2dCfE5NcHVgB3Dsgg7Rj0Q5+f0oq34ZI+lpvuwP/LU5rbWKONdMcaoPBRinwPCgDW3CqBgADoBU1iA6UQRS07UFQQVILUsU+KCIWnxUgKfFBDFOBUsUsUEcYpVLFLFQRqQpAUsUU4pUtJqQQmqIipAVYEAqYGOlMNVhR1zT4XHKp09XDVY8gaWknpVtPmphqkRE89hUxEvXc1OnFMNR7NCOVRMC9CRVlPVA3Yc+9TiDxY1dSoinsF8TT9gnn86tpUFYhQdPrTiNP6RUxSxREQqjkBUqWKegjT0sbmnxVDYpYp6VAxqQpsU9A1MRUqagrNRNTIqJoIGlTmm6iqgbTnST4frQPHhjgV36D860ZO7pHr+dZv2gP8A4DdfAfWsz6PP151YhqoVYte1wd4J4JvsKwidUCAKy431Z/WqeE39vDwaCBbtEmWbWwdDjHhXKQzSLE0QdhGxBK52NXJXHwdPJ2M9xZ3MXFTBcxjtwoUO2CSOfwrDjtbewzcG5hmkSMkIG2z4A+lR4NZRXcsj3GoxxrnSOprRSwgPZmSJB2wPZw6Rq261n56X6D4hdWd09ndNcRxyiMpIoycbbVlNxo+wrE4DzQuDHJ4gHlVtzwW+nlBW2CHGDuBnzqA+zs4iYyusZG/jtW5OWboG84gs07TQw9lK51M2c7+XhQ7XU0lwJXbLA5G3WiuI2EFnCNNx2k2RlR0oBOdX0ntucDJk4pC7blpQT867w8zXC/Z4f+IQf7xXddTXP+2yqS86iKkKCnFOKeliuLoalT0sUEcUsVPFNigjilip4pYoI4p8U+KcUEcUsVLFOBQQxThamFqQFBWEqQWp4p8VRHFOBinxT4oGp6WKfFA1KnpAUCFKnpUCpUqegVKlSoGIpxSpCgVNT0qBUqQp6IVKlSxQNTjlvSxvSoFSpU9AwFPSp6CNKnxSqiBqsiriNqrIoIEVEe8PWpGoj3x6iiKr9WRtf4M/KsfjjBvs9dY8V/OumIByCMg9DXP/AGot0t+BXHZ7B2Xbw3rM+jz0VNagKmte1xXxmi05UJHyopDtUqwXa301rHIsZGh8alI8OVVtxS79oM/antNOgH+keXhVDHY1Q551mSLq6Ti96S/37DUADjrQc95cTA9pM7erUXa2Iliae4YxwjZfF28BVHEoFgu+wiGoooVio5mr6T2BOTU4hvRScMuDF2soWCM/ikOM1W1u0JUl0YNyKmmja+zg/wDEYP8AeK7brXGfZsf+Iwf7q7TrXG/XQqkKYCpAVNFeKfFOKeubaOKWKliligjikBUsU+KCGKfFS00+mghinAqeKfFBALUsVICnxQRxTgU+KfFUNilipYpYoGApYp6WKBqelTgUDUsU+KfFBHFICpYpYoGpsVLFMaBqVPSoGpU4pUDUqkKWKBsU1SFNjPWganpAEc6eganpU9ENSp6VAqVPSoGpU9KgbpVbCrag61RSRUQO8PWrDUDsc0RcjAjNYn2yOOAy4/qX86NMjI2pGIzWV9qpml+z8hbG0ijapJ7HADnVi1AVJa9jiIStODhl7LEssdrK0bcmCnBrMjrUsuJXloAILiRAOmdvlWet/pYUnDL5edrIPUVbZ8JIbtr9GWIck1AFz+3nWtDxW5iRZuJTDDEaYig1MPE+AoW54qGl1NeIyEHGmEZXwHKue2t5DX8lvPGIreyRWQgBmfIAHgBVN5eEzfcqqNgajDFk5/3GqbniinTi8lYEbqEC1nPfRMuXieVtvfc4+VWSpqc0uTmZ11DkZW1kfAbUBrMkhZmyaee4MqhdCIoOcKMVCPnWsTXRfZof+JQ+v6V2Vcj9mI2a9jfHdGTn4V14rjfrZxUhTAVNRUVACnC1PTTisNIaacLUwKQFBELT6alinxRENNLFSNKimAp8U+KfFBHFLFSxTVQ3wpwKWKcCgVNUqWKCOKlgUsUhQNgCmANTxSx4UDAUqenoI0qlSoGxUcVOmoI4pVPFLFBDFPUsUsUERSxUsUqCOKWKlTYoI0hzqWKYCgVIU+KVA1KpYpYoGpU+KVA1KnpUQqYjapU1BQRVU2RE5HPBxRDjBNDy/wCU/oaozLaRyDDN/mLuDnZh5UPxy1mu+Byx28ZkcSBio54q5/dMqZ1QkHAH4TzooMVIZDjqCKRr9Ocebw2c0srxhcPGpLBtjtTyW80BxNE8f+4V0v2qSW0vouI2509umlmA5MOdZv8A1s3EYS8iWUBwwPKvROrZrhkZsdFJsOdHXk/Dr2INEognJy2Rtz6Yo+y4fwm8ice0dk4YquW97z3+NS9f6SMSVmkYl2LHxJoZ+tdHJwi0F5Knbkwro0urA5zzPzqqbg1jHaGQ3eX7u2ob5O5pOoWVzTVWa6KSx4PksLpgoJBUt08RQN63Dkt2jtl1Pj3tzvnp8K15JjMWN5DhEZvQUfHw8xxNLNKige6AeZqcvGZDbCGOJE7oUt1IxQZmkmkDSuWPnUurMdX9mpDNeuwACpHgYrpRXPfZKLTbTSn8RCj4f810SiuF+txIVYgzUQKuRaKYimAqdLFZVECnxT4pUDUiT0GaelpBO43oI79foKfHmafSPE/OnA8zUVHBHWmy4PIMPlU6RBoGpsVLpTAjNULFKnp8UDYpU4GKagakKlSoFSpU9QNSp8bU9UNSp6VQNTU+KWKBUsUqfFUNilT4pYoGpU9KgalT4phQNilipUsUEaVPiligWKVKlQPSpUqBqbFSxSxQKlinxTigrdcihpVyjCjSMg0HdL9xJjnpNEZFgNF7NE6nTKmhs78hsfTnVtm2q0jzzA0n4bVLht7DdjLaVmj99eRx4j9qpsXHsy6gQDqkBJABXUarv+k/5XXtinEuHy2bnBbvRk9GrzieCS2neGVSrocEGvT4wJV1RMWHiAazftFwIcUi7eDSL1BuAf8AMH71vjrxeWzXCJyolOW1DlHikZJFKspwQdsV2P2d4vwiC2EFzZoj7ZkYaw37V06uMyOXyd98UNIdzXd/aSDgirapF2KGV8vJEeS1gXFpwRJVC3Tspxnf59Kc9LY541AmtqccGimXse1kQA5z442+tUpxK2trppbe0UqVGFb8J64rWs4Cgsbmc/dwtjxOwqMSHtNOMtnGB40RPxW6nUpr0ITnC7Vt/ZPhDTSi+nUiJD92CPePjWeusWR0XC7X2Swjh6ove/3HnRyiojB1dN9hVyLtXB0SRd6vUYpo1A6ZqygqxT0+KVZVHFLFSxTYoGp6VPVDUqfFKimpU9KoFio4FSp6BqVPilVDUqelUDUsU9KganpUqB6VKligVMB5mnp6CJ2BIBYjoOtMuSoLLpJ5jOcVOmqhqcUqVQLG1KlSqhqQp6WKganpYpUCpUhT0DUsVLFKqI4pVKmxQNSp8UsVA1KnxSxQIUhSpwKBwKGu1CxPk8xRDMF25mhb1Wkt3x7wG1Bxs0CpcFi+jHMda3OJQ2Npa2rpaa5AgLZY7UD2aXciK2O1H4ScahWlxyxf2S3IkcnTp0Ech61qL3+vXUkrMuvtNd3EeiPMaAY0JhRWSOIGOVZVidZFOQ4lOavThE7seykyBs2F5Hwos8HhRQJA7HGS2QKjmcy8M+0ICXoFne8lmHuv60BxH7NcR4dlmiM0PSSPvDFWJweWSV1h0tpxkHpXTcMXiNjEqRyBlA/y3bIqzqweeyZxg5z50M/rXqNyLO61C/4TGzf1RkA1jz8G4EcsbS6TyVs/rXTn9IzeXBGlHFLO4SKNnY8gozXdf9N4HBD2sdhNMQCdLN4UO3GmiQpw+zhtByyq5ar/AC/4niC4X9lzFi44rsOa24Peb18BW21zcIArJBEg91QeQrNeeCddUySNKRgvnmfnVNuJGcDl+tcrbW5MdLYP2mok588VoxrmgeFxaIcda1Y00rk1FLGBSqVNRVdPT0sUU1LbIB5mnpUEcU+KelQNSpU9QNSp6VA1KnxSoGp6VKgalUqVBGnxT0+KCOKWKelQKlT0qobFLFPSqBsUsU+KVULFLFKlUCxSp6VBHFKpU1A2KWKelQNT0qegVNinFPVDYpYp6WKBt6enpYoI4pYqWKY4HOgbFQd+g+dJm1bdKjUDCnG1KnqDnuL2Ps9wJguYmOdulWmWZ7dVEjPFzUE5ArcZVeMxyKGRuYNYl1wu5s2Mtk5eLmU54+HWqzYoVij5GVPXzohJtR72D8KhBdQ3PclXs5eqkYqUluE3GR6cqiCFlXHOiUnVADmsxcjrUpO1AHcOPI1MBs8+tT3QPOhO0Trih2klCN3Xz6UGZ5wfdcj0qyIu4fIe3nRye7qbGPHY/pV00cTjOgZ8aHSZmz92wJ57VdFnO6nFFCvZB21Lt60RBbpAupz6Va9xEinIDMOSilZWc15N2j+6D8BQavClMgZiMAVomowxrBCEXlUia00jSp6ag//Z";
function BottleArt({
  bottle,
  large = false,
}: {
  bottle: Bottle;
  large?: boolean;
}) {
  return (
    <div className={`bottle-art ${large ? "large" : ""}`}>
      {bottle.additive !== "Independent verification" && (
        <div
          className="additive-warning-banner"
          aria-label="Not certified additive-free"
        >
          Not certified additive-free
        </div>
      )}
      <img
        src={bottle.image}
        alt={`${bottle.brand} ${bottle.name} official product bottle`}
        loading={large ? "eager" : "lazy"}
      />
    </div>
  );
}

export default function Home() {
  const { getToken, isLoaded, isSignedIn, sessionId } = useAuth();
  const [tab, setTab] = useState("discover"),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Bottle | null>(null),
    [saved, setSaved] = useState<string[]>([]);
  const [tastings, setTastings] = useState<
    {
      bottleId: string;
      score: number;
      flavours: string[];
      note: string;
      date: string;
    }[]
  >([]);
  const [tasteBottle, setTasteBottle] = useState(bottles[0].id),
    [tasteScore, setTasteScore] = useState(88),
    [tasteNotes, setTasteNotes] = useState<string[]>(["Cooked agave"]),
    [tasteText, setTasteText] = useState("");
  const [toast, setToast] = useState(""),
    [clientId, setClientId] = useState("");
  const [consentChecked, setConsentChecked] = useState(false),
    [marketingOptIn, setMarketingOptIn] = useState(false),
    [needsConsent, setNeedsConsent] = useState(false),
    [consentBusy, setConsentBusy] = useState(false);
  const [submission, setSubmission] = useState({
      brand: "",
      expression: "",
      style: "Blanco",
      abv: "",
      nom: "",
      notes: "",
      photoUrl: "",
    }),
    [licenceAccepted, setLicenceAccepted] = useState(false),
    [submitBusy, setSubmitBusy] = useState(false);
  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    (async () => {
      let id = localStorage.getItem("agave-client-id");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("agave-client-id", id);
      }
      setClientId(id);
      const anonymous = await fetch(
        `/api/passport?clientId=${encodeURIComponent(id)}`,
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
      if (isSignedIn) {
        const token = await getToken();
        const account = await fetch(
          `/api/passport?clientId=${encodeURIComponent(id)}`,
          { headers: token ? { authorization: `Bearer ${token}` } : {} },
        )
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
        if (cancelled) return;
        const hasAccount =
          account && (account.shelf?.length || account.tastings?.length);
        const data = hasAccount ? account : anonymous;
        if (data?.shelf) setSaved(data.shelf);
        if (data?.tastings) setTastings(data.tastings);
        if (
          !hasAccount &&
          data &&
          (data.shelf?.length || data.tastings?.length)
        ) {
          fetch("/api/passport", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...(token ? { authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              clientId: id,
              shelf: data.shelf || [],
              tastings: data.tastings || [],
            }),
          }).catch(() => {});
        }
      } else if (!cancelled) {
        if (anonymous?.shelf) setSaved(anonymous.shelf);
        if (anonymous?.tastings) setTastings(anonymous.tastings);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !sessionId) {
      setNeedsConsent(false);
      return;
    }
    let active = true;
    const timer = setTimeout(async () => {
      const token = await getToken().catch(() => null);
      if (!active || !token) return;
      const response = await fetch("/api/consent", {
        headers: { authorization: `Bearer ${token}` },
      }).catch(() => null);
      if (!active || !response?.ok) {
        setNeedsConsent(false);
        return;
      }
      const data = await response.json().catch(() => null);
      if (active) setNeedsConsent(data?.accepted === false);
    }, 900);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isLoaded, isSignedIn, sessionId, getToken]);
  function consentEmailMessage(result: any) {
    if (result?.sent) return "Accepted — confirmation emailed";
    const reason = result?.reason;
    return reason === "not_configured"
      ? "Accepted — email service is not configured yet"
      : reason === "user_lookup_failed"
        ? "Accepted — we could not retrieve your account email"
        : reason === "email_missing"
          ? "Accepted — no email address was found on your account"
          : "Accepted — confirmation email could not be delivered";
  }
  async function acceptTerms() {
    if (!consentChecked) return;
    setConsentBusy(true);
    const token = await getToken();
    const response = await fetch("/api/consent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ accepted: true, marketingOptIn }),
    });
    const data = await response.json().catch(() => ({}));
    setConsentBusy(false);
    if (response.ok) {
      setNeedsConsent(false);
      setToast(consentEmailMessage(data.emailConfirmation));
      setTimeout(() => setToast(""), 5000);
    } else setToast("We could not save your acceptance. Please try again.");
  }
  async function resendConsentEmail() {
    setConsentBusy(true);
    const token = await getToken();
    const response = await fetch("/api/consent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ accepted: true, marketingOptIn }),
    });
    const data = await response.json().catch(() => ({}));
    setConsentBusy(false);
    setToast(
      response.ok
        ? consentEmailMessage(data.emailConfirmation)
        : "We could not send the confirmation. Please sign in and try again.",
    );
    setTimeout(() => setToast(""), 5000);
  }
  async function submitBottle(e: React.FormEvent) {
    e.preventDefault();
    if (!isSignedIn) {
      setToast("Sign in to submit a bottle");
      return;
    }
    setSubmitBusy(true);
    const token = await getToken();
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ ...submission, licenceAccepted }),
    });
    const data = await response.json().catch(() => ({}));
    setSubmitBusy(false);
    if (response.ok) {
      setSubmission({
        brand: "",
        expression: "",
        style: "Blanco",
        abv: "",
        nom: "",
        notes: "",
        photoUrl: "",
      });
      setLicenceAccepted(false);
      setToast("Bottle submitted for review");
      setTab("search");
    } else setToast(data.error || "Submission failed");
  }
  async function sync(nextSaved = saved, nextTastings = tastings) {
    if (!clientId) return;
    const token = isSignedIn ? await getToken() : null;
    fetch("/api/passport", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        clientId,
        shelf: nextSaved,
        tastings: nextTastings,
      }),
    }).catch(() => {});
  }
  const visible = useMemo(
    () =>
      bottles.filter(
        (b) =>
          `${b.brand} ${b.name} ${b.type} ${b.nom} ${b.notes.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "All" ||
            b.type.toLowerCase().includes(filter.toLowerCase())),
      ),
    [query, filter],
  );
  const palate = useMemo(() => {
    const c: Record<string, number> = {};
    tastings.forEach((t) =>
      t.flavours.forEach((f) => (c[f] = (c[f] || 0) + 1)),
    );
    return Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [tastings]);
  function toggleSave(id: string) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    sync(next, tastings);
    setToast(
      saved.includes(id)
        ? "Removed from your shelf"
        : "Stamped in your collection",
    );
    setTimeout(() => setToast(""), 2200);
  }
  function submitTasting(e: React.FormEvent) {
    e.preventDefault();
    const next = [
      {
        bottleId: tasteBottle,
        score: tasteScore,
        flavours: tasteNotes,
        note: tasteText,
        date: new Date().toISOString(),
      },
      ...tastings,
    ];
    const nextSaved = saved.includes(tasteBottle)
      ? saved
      : [...saved, tasteBottle];
    setTastings(next);
    setSaved(nextSaved);
    sync(nextSaved, next);
    setTasteText("");
    setTab("passport");
    setToast("Tasting saved to your passport");
    setTimeout(() => setToast(""), 2500);
  }
  function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const type = String(form.get("tastingType") || "Guided tequila tasting");
    const guests = String(form.get("guests") || "");
    const date = String(form.get("date") || "");
    const location = String(form.get("location") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`TequilaFi tasting request — ${name}`);
    const body = encodeURIComponent(
      `Hello Joeleen,\n\nI would like to book a tasting.\n\nName: ${name}\nTasting: ${type}\nGuests: ${guests}\nPreferred date: ${date}\nLocation: ${location}\nPhone: ${phone}\n\nAdditional details:\n${message}\n\nSent via TequilaFi.`,
    );
    window.location.href = `mailto:joeleen@thejoeleeneffect.co.za?subject=${subject}&body=${body}`;
    setToast("Your booking email is ready to send");
    setTimeout(() => setToast(""), 3000);
  }
  const nav = [
    ["discover", "Discover", "✦"],
    ["search", "Search", "⌕"],
    ["rankings", "Rankings", "★"],
    ["guides", "Guides", "▣"],
    ["taste", "Taste", "◒"],
    ["book", "Book tasting", "◇"],
    ["shelf", "My Shelf", "▥"],
    ["passport", "Passport", "◎"],
    ["submit", "Add bottle", "＋"],
  ];
  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setTab("discover")}>
          <span className="agave-mark">✺</span>
          <span className="brand-name">
            <b>TEQUILAFI</b>
            <em>BETA</em>
          </span>
        </button>
        <div className="top-actions">
          <button className="country">
            🌍 Global <span>⌄</span>
          </button>
          <a
            className="youtube-link"
            href="https://www.youtube.com/@tequilafi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit TequilaFi on YouTube"
          >
            <span aria-hidden="true">▶</span>
            <b>YouTube</b>
          </a>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="auth-button">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="auth-button primary-auth">Join</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <div className="app-shell">
        <aside className="side-nav">
          <nav>
            {nav.map(([id, label, icon]) => (
              <button
                key={id}
                className={tab === id ? "active" : ""}
                onClick={() =>
                  id === "guides"
                    ? (window.location.href = "/guides/additive-free-tequila")
                    : setTab(id)
                }
              >
                <i>{icon}</i>
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="responsible">
            <b>Explore responsibly</b>
            <span>For adults of legal drinking age.</span>
          </div>
        </aside>
        <section className="content">
          {tab === "discover" && (
            <>
              <section className="welcome">
                <div>
                  <p className="eyebrow">YOUR GLOBAL TEQUILA GUIDE</p>
                  <h1>Welcome to TequilaFi.</h1>
                  <p>
                    Discover how it was made. Remember what you loved. Find what
                    to taste next.
                  </p>
                  <div className="hero-actions">
                    <button
                      className="primary"
                      onClick={() => setTab("search")}
                    >
                      ⌕ &nbsp; Scan or search a bottle
                    </button>
                    <button
                      className="secondary"
                      onClick={() => setTab("taste")}
                    >
                      ＋ Log a tasting
                    </button>
                  </div>
                </div>
                <div className="hero-visual">
                  <span>JALISCO · MÉXICO</span>
                </div>
              </section>
              <div className="section-head">
                <div>
                  <p className="eyebrow">CURATED FOR YOUR PALATE</p>
                  <h2>Worth exploring</h2>
                </div>
                <button onClick={() => setTab("search")}>View all →</button>
              </div>
              <div className="bottle-grid">
                {bottles.slice(0, 6).map((b) => (
                  <article
                    className="bottle-card"
                    key={b.id}
                    onClick={() => setSelected(b)}
                  >
                    <button
                      className={`save ${saved.includes(b.id) ? "saved" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(b.id);
                      }}
                    >
                      {saved.includes(b.id) ? "♥" : "♡"}
                    </button>
                    <BottleArt bottle={b} />
                    <div className="card-copy">
                      <span className="type">{b.type}</span>
                      <h3>{b.brand}</h3>
                      <p>{b.name}</p>
                      <div className="score">
                        <b>{b.score}</b>
                        <span>
                          COMMUNITY
                          <br />
                          {b.ratings.toLocaleString()} ratings
                        </span>
                      </div>
                      <div className="tags">
                        {b.notes.slice(0, 2).map((n) => (
                          <em key={n}>{n}</em>
                        ))}
                      </div>
                      <div className="card-pairing">
                        <span>PAIR IT WITH</span>
                        <b>{b.pairing.dish}</b>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <section className="guide-promo">
                <div className="guide-promo-mark">80</div>
                <div>
                  <p className="eyebrow">NEW BETA RESOURCE</p>
                  <h2>Additive-Free Tequila Guide</h2>
                  <p>
                    Explore 80 brands from the independent on-site verification
                    programme, with a free printable guide.
                  </p>
                </div>
                <a href="/guides/additive-free-tequila">Explore the guide →</a>
              </section>
              <section className="passport-strip">
                <div>
                  <span className="passport-icon">◎</span>
                  <div>
                    <p className="eyebrow">YOUR PASSPORT</p>
                    <h2>{saved.length + tastings.length} stamps earned</h2>
                    <p>
                      {Math.max(0, 5 - saved.length)} more bottles to unlock{" "}
                      <b>Agave Explorer</b>
                    </p>
                  </div>
                </div>
                <div className="stamps">
                  {["BLANCO", "NOM 1579", "HIGH PROOF", "LOS ALTOS"].map(
                    (s, i) => (
                      <span
                        className={
                          i < Math.max(1, saved.length) ? "earned" : ""
                        }
                        key={s}
                      >
                        ✺<small>{s}</small>
                      </span>
                    ),
                  )}
                </div>
                <button onClick={() => setTab("passport")}>
                  Open passport →
                </button>
              </section>
            </>
          )}
          {tab === "search" && (
            <>
              <div className="page-title">
                <p className="eyebrow">THE GLOBAL CATALOGUE</p>
                <h1>Find your next tequila</h1>
                <p>Search by bottle, NOM, style or flavour.</p>
              </div>
              <div className="search-box">
                <span>⌕</span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try ‘high proof’, ‘NOM 1146’ or ‘floral’"
                />
                <button
                  onClick={() =>
                    setToast("Camera scanning is ready for the native app")
                  }
                >
                  ▣ Scan label
                </button>
              </div>
              <div className="filters">
                {["All", "Blanco", "Reposado", "Añejo", "High proof"].map(
                  (f) => (
                    <button
                      className={filter === f ? "active" : ""}
                      key={f}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
              <p className="result-count">{visible.length} bottles found</p>
              <div className="result-list">
                {visible.map((b) => (
                  <article key={b.id} onClick={() => setSelected(b)}>
                    <BottleArt bottle={b} />
                    <div className="result-main">
                      <span>
                        {b.type} · {b.abv}% ABV
                      </span>
                      <h3>
                        {b.brand} <b>{b.name}</b>
                      </h3>
                      <p>
                        NOM {b.nom} · {b.region}
                      </p>
                      <div className="tags">
                        {b.notes.map((n) => (
                          <em key={n}>{n}</em>
                        ))}
                      </div>
                    </div>
                    <div className="result-trust">
                      <strong>{b.score}</strong>
                      <span>{b.ratings.toLocaleString()} ratings</span>
                      <small
                        className={
                          b.additive === "Independent verification"
                            ? "verified"
                            : ""
                        }
                      >
                        ● {b.additive}
                      </small>
                    </div>
                    <button
                      className={`save ${saved.includes(b.id) ? "saved" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(b.id);
                      }}
                    >
                      {saved.includes(b.id) ? "♥" : "♡"}
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === "taste" && (
            <>
              <div className="page-title">
                <p className="eyebrow">TASTING JOURNAL</p>
                <h1>Capture the moment</h1>
                <p>
                  Your score stays private until you save, so the crowd cannot
                  influence your palate.
                </p>
              </div>
              <form className="taste-form" onSubmit={submitTasting}>
                <label>
                  What are you tasting?
                  <select
                    value={tasteBottle}
                    onChange={(e) => setTasteBottle(e.target.value)}
                  >
                    {bottles.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.brand} — {b.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="score-control">
                  <div>
                    <label>Your score</label>
                    <strong>{tasteScore}</strong>
                    <span>
                      {tasteScore >= 90
                        ? "Exceptional"
                        : tasteScore >= 85
                          ? "Very good"
                          : "Worth exploring"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={tasteScore}
                    onChange={(e) => setTasteScore(Number(e.target.value))}
                  />
                </div>
                <fieldset>
                  <legend>What stands out?</legend>
                  <p>Choose up to four.</p>
                  <div className="flavour-picker">
                    {tasteOptions.map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={tasteNotes.includes(n) ? "active" : ""}
                        onClick={() =>
                          setTasteNotes(
                            tasteNotes.includes(n)
                              ? tasteNotes.filter((x) => x !== n)
                              : tasteNotes.length < 4
                                ? [...tasteNotes, n]
                                : tasteNotes,
                          )
                        }
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label>
                  Your private note
                  <textarea
                    value={tasteText}
                    onChange={(e) => setTasteText(e.target.value)}
                    placeholder="Aroma, palate, finish… or simply how it made you feel."
                  />
                </label>
                <button className="primary submit">
                  Save tasting to passport
                </button>
              </form>
            </>
          )}
          {tab === "rankings" && (
            <>
              <div className="rankings-hero">
                <div>
                  <p className="eyebrow">JOELEEN'S PERSONAL PICKS</p>
                  <h1>The TequilaFi Rankings</h1>
                  <p>
                    No paid positions. No crowd score. These are the bottles
                    that genuinely stand out in my collection.
                  </p>
                </div>
                <span className="rankings-star">★</span>
              </div>
              <div className="rankings-grid">
                <article className="ranking-card ranking-winner">
                  <div className="ranking-image">
                    <img
                      className="personal-ranking-photo"
                      src={rankingTears}
                      alt="Joeleen’s Best Overall pick, Tears of Llorona Extra Añejo"
                    />
                    <strong>01</strong>
                  </div>
                  <div className="ranking-copy">
                    <span className="ranking-category">BEST OVERALL</span>
                    <h2>Tears of Llorona</h2>
                    <h3>Extra Añejo</h3>
                    <p>
                      Deep, complex and unforgettable. The bottle that sets the
                      standard for my collection.
                    </p>
                    <div className="ranking-facts">
                      <b>43% ABV</b>
                      <b>Extra Añejo</b>
                      <b>NOM 1146</b>
                    </div>
                  </div>
                </article>
                <article className="ranking-card">
                  <div className="ranking-image">
                    <img
                      className="personal-ranking-photo"
                      src={rankingMijenta}
                      alt="Joeleen with her Best Value pick, Mijenta Blanco"
                    />
                    <strong>02</strong>
                  </div>
                  <div className="ranking-copy">
                    <span className="ranking-category">BEST VALUE</span>
                    <h2>Mijenta</h2>
                    <h3>Blanco</h3>
                    <p>
                      Beautifully made, approachable and seriously good value
                      for the quality in the bottle.
                    </p>
                    <div className="ranking-facts">
                      <b>40% ABV</b>
                      <b>Blanco</b>
                      <b>NOM 1499</b>
                    </div>
                  </div>
                </article>
                <article className="ranking-card">
                  <div className="ranking-image">
                    <img
                      className="personal-ranking-photo"
                      src={rankingG4}
                      alt="Joeleen with her Best High-Proof pick, G4 Blanco 108"
                    />
                    <strong>03</strong>
                  </div>
                  <div className="ranking-copy">
                    <span className="ranking-category">BEST HIGH-PROOF</span>
                    <h2>G4</h2>
                    <h3>Blanco 108</h3>
                    <p>
                      Bold at 54% ABV but still packed with cooked agave, pepper
                      and mineral character.
                    </p>
                    <div className="ranking-facts">
                      <b>54% ABV</b>
                      <b>108 Proof</b>
                      <b>NOM 1579</b>
                    </div>
                  </div>
                </article>
              </div>
              <div className="rankings-footer">
                <div>
                  <p className="eyebrow">THE LIST IS GROWING</p>
                  <h2>More rankings coming soon</h2>
                  <p>
                    Blanco, reposado, añejo and collection favourites will be
                    added as I taste them.
                  </p>
                </div>
                <button className="primary" onClick={() => setTab("taste")}>
                  Explore my tasting journal →
                </button>
              </div>
            </>
          )}
          {tab === "book" && (
            <>
              <div className="booking-hero">
                <div>
                  <p className="eyebrow">PRIVATE & GROUP EXPERIENCES</p>
                  <h1>Book a TequilaFi tasting</h1>
                  <p>
                    Discover tequila through an entertaining, guided experience
                    designed around your group.
                  </p>
                </div>
                <span className="booking-seal">
                  TEQUILAFI
                  <br />
                  <b>TASTINGS</b>
                </span>
              </div>
              <div className="booking-layout">
                <section>
                  <div className="booking-options">
                    <article>
                      <span>01</span>
                      <h2>Guided discovery</h2>
                      <p>
                        A welcoming introduction to tequila styles, production
                        and tasting.
                      </p>
                    </article>
                    <article>
                      <span>02</span>
                      <h2>Premium journey</h2>
                      <p>
                        A curated exploration of distinctive bottles, regions
                        and production methods.
                      </p>
                    </article>
                    <article>
                      <span>03</span>
                      <h2>Private event</h2>
                      <p>
                        A tailored tasting for birthdays, corporate events and
                        special occasions.
                      </p>
                    </article>
                  </div>
                  <div className="booking-note">
                    <b>What happens next?</b>
                    <p>
                      Send your preferred details and Joeleen will contact you
                      to confirm availability, bottle selection and pricing.
                    </p>
                  </div>
                </section>
                <form className="booking-form" onSubmit={submitBooking}>
                  <p className="eyebrow">REQUEST A BOOKING</p>
                  <h2>Tell us about your tasting</h2>
                  <div className="form-pair">
                    <label>
                      Your name
                      <input name="name" required placeholder="Full name" />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+27"
                      />
                    </label>
                  </div>
                  <label>
                    Tasting experience
                    <select name="tastingType">
                      <option>Guided tequila tasting</option>
                      <option>Premium tequila journey</option>
                      <option>Private event tasting</option>
                      <option>Custom experience</option>
                    </select>
                  </label>
                  <div className="form-pair">
                    <label>
                      Number of guests
                      <input
                        name="guests"
                        type="number"
                        min="2"
                        required
                        placeholder="e.g. 10"
                      />
                    </label>
                    <label>
                      Preferred date
                      <input name="date" type="date" required />
                    </label>
                  </div>
                  <label>
                    Location
                    <input
                      name="location"
                      required
                      placeholder="Venue, suburb or city"
                    />
                  </label>
                  <label>
                    Anything else we should know?
                    <textarea
                      name="message"
                      placeholder="Occasion, preferred bottles, timing or special requests…"
                    />
                  </label>
                  <button className="primary booking-submit" type="submit">
                    Request your tasting →
                  </button>
                  <small>
                    Booking requests are emailed to
                    joeleen@thejoeleeneffect.co.za
                  </small>
                </form>
              </div>
            </>
          )}
          {tab === "shelf" && (
            <>
              <div className="page-title inline">
                <div>
                  <p className="eyebrow">MY COLLECTION</p>
                  <h1>Your tequila shelf</h1>
                  <p>
                    {saved.length} bottles · {tastings.length} tasted
                  </p>
                </div>
                <button className="primary" onClick={() => setTab("search")}>
                  ＋ Add a bottle
                </button>
              </div>
              {saved.length === 0 ? (
                <div className="empty">
                  <span>▥</span>
                  <h2>Your shelf is waiting</h2>
                  <p>
                    Save a bottle from Discover or Search to begin your
                    collection.
                  </p>
                  <button className="primary" onClick={() => setTab("search")}>
                    Explore bottles
                  </button>
                </div>
              ) : (
                <div className="shelf-grid">
                  {saved
                    .map((id) => bottles.find((b) => b.id === id))
                    .filter(Boolean)
                    .map((b) => (
                      <article key={b!.id} onClick={() => setSelected(b!)}>
                        <BottleArt bottle={b!} />
                        <span>{b!.type}</span>
                        <h3>{b!.brand}</h3>
                        <p>{b!.name}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(b!.id);
                          }}
                        >
                          Remove
                        </button>
                      </article>
                    ))}
                </div>
              )}
            </>
          )}
          {tab === "passport" && (
            <>
              <div className="passport-hero">
                <div>
                  <p className="eyebrow">YOUR TEQUILAFI PASSPORT</p>
                  <h1>Your taste has a signature.</h1>
                  <p>Every bottle you explore makes it clearer.</p>
                </div>
                <div className="passport-number">
                  <strong>{saved.length + tastings.length}</strong>
                  <span>STAMPS</span>
                </div>
              </div>
              <div className="profile-grid">
                <section className="palate-card">
                  <p className="eyebrow">YOUR PALATE</p>
                  <h2>
                    {palate.length
                      ? "Agave-forward explorer"
                      : "Your profile is just beginning"}
                  </h2>
                  <p>
                    {palate.length
                      ? "You gravitate towards expressive, characterful tequila."
                      : "Log your first tasting to reveal your flavour signature."}
                  </p>
                  <div className="palate-bars">
                    {(palate.length
                      ? palate
                      : [
                          ["Cooked agave", 0],
                          ["Citrus", 0],
                          ["Mineral", 0],
                        ]
                    ).map(([n, v], i) => (
                      <div key={n}>
                        <span>{n}</span>
                        <i>
                          <b
                            style={{
                              width: `${Math.min(95, Number(v) * 22 + 20 - i * 6)}%`,
                            }}
                          ></b>
                        </i>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="next-stamp">
                  <p className="eyebrow">NEXT STAMP</p>
                  <span className="big-stamp">✺</span>
                  <h2>Agave Explorer</h2>
                  <p>Add five bottles to your shelf.</p>
                  <div className="progress">
                    <b
                      style={{ width: `${Math.min(100, saved.length * 20)}%` }}
                    ></b>
                  </div>
                  <small>{saved.length} of 5</small>
                </section>
              </div>
              <div className="section-head">
                <div>
                  <p className="eyebrow">JOURNAL</p>
                  <h2>Recent tastings</h2>
                </div>
                <button onClick={() => setTab("taste")}>Log another →</button>
              </div>
              {tastings.length === 0 ? (
                <div className="empty small">
                  <p>
                    No tastings yet. Your first pour is where the passport
                    begins.
                  </p>
                </div>
              ) : (
                <div className="tasting-list">
                  {tastings.map((t, i) => {
                    const b = bottles.find((x) => x.id === t.bottleId)!;
                    return (
                      <article key={i}>
                        <div className="mini-score">{t.score}</div>
                        <div>
                          <h3>
                            {b.brand} <span>{b.name}</span>
                          </h3>
                          <p>{t.note || "No private note added."}</p>
                          <div className="tags">
                            {t.flavours.map((f) => (
                              <em key={f}>{f}</em>
                            ))}
                          </div>
                        </div>
                        <time>{new Date(t.date).toLocaleDateString()}</time>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {tab === "submit" && (
            <>
              <div className="page-title">
                <p className="eyebrow">COMMUNITY CATALOGUE</p>
                <h1>Suggest a missing bottle</h1>
                <p>
                  Share the details and TequilaFi will verify them before
                  anything is published.
                </p>
              </div>
              <SignedOut>
                <div className="empty">
                  <span>＋</span>
                  <h2>Sign in to contribute</h2>
                  <p>
                    An account lets us credit your contribution, contact you if
                    details need checking and keep a record of your permission.
                  </p>
                  <SignInButton mode="modal">
                    <button className="primary">Sign in</button>
                  </SignInButton>
                </div>
              </SignedOut>
              <SignedIn>
                <form
                  className="taste-form submission-form"
                  onSubmit={submitBottle}
                >
                  <div className="form-grid">
                    <label>
                      Brand
                      <input
                        required
                        value={submission.brand}
                        onChange={(e) =>
                          setSubmission({
                            ...submission,
                            brand: e.target.value,
                          })
                        }
                        placeholder="e.g. Cascahuín"
                      />
                    </label>
                    <label>
                      Expression
                      <input
                        required
                        value={submission.expression}
                        onChange={(e) =>
                          setSubmission({
                            ...submission,
                            expression: e.target.value,
                          })
                        }
                        placeholder="e.g. Tahona Blanco"
                      />
                    </label>
                    <label>
                      Style
                      <select
                        value={submission.style}
                        onChange={(e) =>
                          setSubmission({
                            ...submission,
                            style: e.target.value,
                          })
                        }
                      >
                        {[
                          "Blanco",
                          "Reposado",
                          "Añejo",
                          "Extra añejo",
                          "Cristalino",
                          "Joven",
                          "High proof",
                          "Other",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      ABV (optional)
                      <input
                        value={submission.abv}
                        onChange={(e) =>
                          setSubmission({ ...submission, abv: e.target.value })
                        }
                        placeholder="e.g. 48%"
                      />
                    </label>
                    <label>
                      NOM (optional)
                      <input
                        value={submission.nom}
                        onChange={(e) =>
                          setSubmission({ ...submission, nom: e.target.value })
                        }
                        placeholder="e.g. 1123"
                      />
                    </label>
                    <label>
                      Photo link (optional)
                      <input
                        type="url"
                        value={submission.photoUrl}
                        onChange={(e) =>
                          setSubmission({
                            ...submission,
                            photoUrl: e.target.value,
                          })
                        }
                        placeholder="https://…"
                      />
                    </label>
                  </div>
                  <label>
                    What should we know?
                    <textarea
                      value={submission.notes}
                      onChange={(e) =>
                        setSubmission({ ...submission, notes: e.target.value })
                      }
                      placeholder="Where you found it, production details, label information or corrections."
                    />
                  </label>
                  <div className="legal-box">
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={licenceAccepted}
                        onChange={(e) => setLicenceAccepted(e.target.checked)}
                      />
                      <span>
                        I confirm that I own this content or have permission to
                        submit it. I grant TequilaFi a worldwide, non-exclusive,
                        royalty-free licence to store, edit, reproduce, publish
                        and display it in connection with TequilaFi and its
                        promotion.
                      </span>
                    </label>
                    <p>
                      You keep ownership. Submissions may be verified, edited,
                      rejected or removed. Do not submit retailer or
                      manufacturer photographs unless you have permission.
                    </p>
                  </div>
                  <button
                    className="primary submit"
                    disabled={submitBusy || !licenceAccepted}
                  >
                    {submitBusy ? "Submitting…" : "Submit for review"}
                  </button>
                </form>
              </SignedIn>
            </>
          )}
          {tab === "terms" && (
            <LegalPage title="Terms of Use">
              <SignedIn>
                <button
                  className="primary"
                  disabled={consentBusy}
                  onClick={resendConsentEmail}
                >
                  {consentBusy ? "Sending…" : "Email me a copy of my agreement"}
                </button>
              </SignedIn>
              <p>
                These terms govern use of the TequilaFi beta service. You must
                be legally old enough to consume alcohol in your country.
                TequilaFi provides educational and community information, not
                medical advice or a guarantee about any product.
              </p>
              <h2>User accounts and contributions</h2>
              <p>
                You are responsible for your account and for information you
                submit. Do not upload unlawful, misleading or infringing
                material. Bottle submissions are reviewed and may be edited,
                rejected or removed.
              </p>
              <h2>Your content</h2>
              <p>
                You retain ownership of your content. When you submit bottle
                information, photographs or notes, you grant TequilaFi a
                worldwide, non-exclusive, royalty-free licence to store,
                reproduce, adapt, publish and display that content for operating
                and promoting the service.
              </p>
              <h2>Contact</h2>
              <p>
                Questions may be sent to{" "}
                <a href="mailto:joeleen@thejoeleeneffect.co.za">
                  joeleen@thejoeleeneffect.co.za
                </a>
                .
              </p>
              <small>Version 24 August 2026</small>
            </LegalPage>
          )}
          {tab === "privacy" && (
            <LegalPage title="Privacy Notice">
              <p>
                TequilaFi collects the minimum information needed to provide
                accounts, personal shelves, tasting journals and community
                submissions.
              </p>
              <h2>What we collect</h2>
              <p>
                Your Clerk account identifier, email address and available
                profile details; your shelf and tasting records; bottle
                submissions; consent records; and basic technical/security logs.
              </p>
              <h2>Why we use it</h2>
              <p>
                To provide and secure your account, save your activity, review
                submissions, communicate about the service and meet legal
                obligations. Marketing email is optional and requires separate
                consent.
              </p>
              <h2>Where it is processed</h2>
              <p>
                Service providers currently include Clerk for authentication and
                Cloudflare for application hosting and database services. Data
                may be processed outside South Africa with appropriate
                safeguards.
              </p>
              <h2>Your choices</h2>
              <p>
                You may request access, correction or deletion by emailing{" "}
                <a href="mailto:joeleen@thejoeleeneffect.co.za">
                  joeleen@thejoeleeneffect.co.za
                </a>
                . Account data is retained only while needed for the service,
                legal obligations, security and dispute handling.
              </p>
              <small>Version 24 August 2026</small>
            </LegalPage>
          )}
        </section>
      </div>
      <nav className="mobile-nav">
        {nav.map(([id, label, icon]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() =>
              id === "guides"
                ? (window.location.href = "/guides/additive-free-tequila")
                : setTab(id)
            }
          >
            <i>{icon}</i>
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <footer className="site-footer">
        <button onClick={() => setTab("terms")}>Terms of Use</button>
        <button onClick={() => setTab("privacy")}>Privacy Notice</button>
        <a href="mailto:joeleen@thejoeleeneffect.co.za">Privacy & support</a>
      </footer>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article
            className="bottle-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>
            <div className="modal-art">
              <BottleArt bottle={selected} large />
            </div>
            <div className="modal-copy">
              <p className="eyebrow">
                {selected.type} · {selected.abv}% ABV
              </p>
              <h1>{selected.brand}</h1>
              <h2>{selected.name}</h2>
              <div className="modal-score">
                <strong>{selected.score}</strong>
                <span>
                  COMMUNITY SCORE
                  <br />
                  {selected.ratings.toLocaleString()} ratings
                </span>
              </div>
              <div className="facts">
                <div>
                  <span>NOM</span>
                  <b>{selected.nom}</b>
                </div>
                <div>
                  <span>REGION</span>
                  <b>{selected.region}</b>
                </div>
                <div>
                  <span>ORIGIN</span>
                  <b>{selected.country}</b>
                </div>
              </div>
              <h3>What people taste</h3>
              <div className="tags">
                {selected.notes.map((n) => (
                  <em key={n}>{n}</em>
                ))}
              </div>
              <h3>How it was made</h3>
              <p>{selected.process}</p>
              <section className="pairing-card">
                <div className="pairing-icon" aria-hidden="true">✦</div>
                <div>
                  <span>PAIR IT WITH</span>
                  <h3>{selected.pairing.dish}</h3>
                  <p>{selected.pairing.why}</p>
                  <small>Also try: {selected.pairing.alternatives.join(" · ")}</small>
                </div>
              </section>
              <div className="evidence">
                <span
                  className={
                    selected.additive === "Independent verification"
                      ? "verified"
                      : ""
                  }
                >
                  ● {selected.additive}
                </span>
                <small>Evidence status, not a crowd-sourced claim</small>
              </div>
              <div className="modal-actions">
                <button
                  className="primary"
                  onClick={() => toggleSave(selected.id)}
                >
                  {saved.includes(selected.id)
                    ? "♥ On my shelf"
                    : "♡ Add to my shelf"}
                </button>
                <button
                  className="secondary"
                  onClick={() => {
                    setTasteBottle(selected.id);
                    setSelected(null);
                    setTab("taste");
                  }}
                >
                  Log a tasting
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
      {needsConsent && (
        <div className="modal-backdrop consent-backdrop">
          <article className="consent-modal">
            <span className="agave-mark">✺</span>
            <p className="eyebrow">WELCOME TO THE TEQUILAFI BETA</p>
            <h1>One clear agreement before you continue</h1>
            <p>
              We use your account details to save your shelf, tasting journal
              and contributions. We do not sell your personal information.
            </p>
            <label className="check-row">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <button onClick={() => setTab("terms")}>Terms of Use</button>{" "}
                and acknowledge the{" "}
                <button onClick={() => setTab("privacy")}>
                  Privacy Notice
                </button>
                .
              </span>
            </label>
            <label className="check-row optional">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
              />
              <span>
                Email me occasional TequilaFi updates and tasting news.
                Optional.
              </span>
            </label>
            <button
              className="primary submit"
              disabled={!consentChecked || consentBusy}
              onClick={acceptTerms}
            >
              {consentBusy ? "Saving…" : "Agree and continue"}
            </button>
            <small>
              Acceptance is recorded with the document version and date.
            </small>
          </article>
        </div>
      )}
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}

function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="legal-page">
      <p className="eyebrow">TEQUILAFI BETA</p>
      <h1>{title}</h1>
      {children}
    </article>
  );
}
