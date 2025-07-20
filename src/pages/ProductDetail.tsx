import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, ShoppingBag, Plus, Minus, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import productTshirt from "@/assets/product-tshirt.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productDress from "@/assets/product-dress.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 156,
    description: "Experience ultimate comfort with our premium cotton t-shirt. Crafted from 100% organic cotton, this versatile piece features a classic fit that's perfect for any occasion.",
    category: "Men's Tops",
    brand: "StyleHub",
    sku: "SH-001",
    inStock: true,
    stockCount: 15,
    images: [
      productTshirt,
      productTshirt,
      productTshirt,
      productTshirt,
    ],
    sizes: [
      { size: "XS", available: true },
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
    ],
    colors: [
      { name: "Black", value: "#000000", available: true },
      { name: "White", value: "#FFFFFF", available: true },
      { name: "Navy", value: "#1e3a8a", available: true },
      { name: "Gray", value: "#6b7280", available: false },
    ],
    features: [
      "100% Organic Cotton",
      "Pre-shrunk for perfect fit",
      "Breathable and comfortable",
      "Machine washable",
      "Ethically sourced materials",
    ],
    specifications: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Portugal",
      "Weight": "180 GSM",
    },
  };

  const reviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality and perfect fit. The fabric is soft and comfortable.",
      verified: true,
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great t-shirt, but runs slightly small. Would recommend sizing up.",
      verified: true,
    },
    {
      id: 3,
      name: "Mike R.",
      rating: 5,
      date: "2024-01-08",
      comment: "Best t-shirt I've bought in years. Will definitely order more colors.",
      verified: true,
    },
  ];

  const relatedProducts = [
    { id: 2, name: "Polo Shirt", price: 59.99, image: productTshirt },
    { id: 3, name: "Denim Jacket", price: 89.99, image: productJacket },
    { id: 4, name: "Casual Pants", price: 79.99, image: productDress },
    { id: 5, name: "Summer Shorts", price: 39.99, image: productSneakers },
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Men", href: "/men" },
    { label: "Tops", href: "/men/tops" },
    { label: product.name, href: "#" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            <a 
              href={item.href} 
              className={index === breadcrumbs.length - 1 ? "text-foreground" : "hover:text-foreground"}
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <button className="flex items-center text-sm text-primary hover:underline">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => color.available && setSelectedColor(color.name)}
                  disabled={!color.available}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-primary scale-110"
                      : "border-gray-300"
                  } ${!color.available ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((sizeOption) => (
                <Button
                  key={sizeOption.size}
                  variant={selectedSize === sizeOption.size ? "default" : "outline"}
                  disabled={!sizeOption.available}
                  onClick={() => sizeOption.available && setSelectedSize(sizeOption.size)}
                  className="h-12"
                >
                  {sizeOption.size}
                </Button>
              ))}
            </div>
            <button className="text-sm text-primary hover:underline mt-2">
              Size Guide
            </button>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stockCount} left in stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="cart" 
                className="flex-1"
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <Button size="lg" variant="premium" className="w-full">
              Buy Now
            </Button>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-accent text-accent" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300 group hover:-translate-y-1">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${item.price}</span>
                  <Button size="sm" variant="cart">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;