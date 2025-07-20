import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Grid, List, Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  // Mock product data
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 20,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 250) + 50 : null,
    image: "/placeholder.svg",
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviews: Math.floor(Math.random() * 200) + 10,
    category: ["Men", "Women", "Kids"][Math.floor(Math.random() * 3)],
    colors: ["Black", "White", "Blue", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: Math.random() > 0.7,
    isOnSale: Math.random() > 0.6,
  }));

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Navy", value: "#1e3a8a" },
    { name: "Gray", value: "#6b7280" },
    { name: "Red", value: "#dc2626" },
    { name: "Blue", value: "#2563eb" },
  ];

  const categories = ["All", "Men", "Women", "Kids"];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: "M", // Default size
      color: "Default", // Default color
      inStock: true,
    });
  };

  const handleAddToWishlist = (product: any) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      inStock: true,
      category: product.category,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium fashion
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Size</h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeToggle(size)}
                    className="h-8"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Color</h4>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.name)
                        ? "border-primary scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {products.length} of {products.length} products
            </div>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Display */}
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card
                  className={`overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300 group cursor-pointer ${
                    viewMode === "list" ? "flex" : "hover:-translate-y-1"
                  }`}
                >
                <div className={`relative ${viewMode === "list" ? "w-48" : "aspect-square"} bg-gray-100 overflow-hidden`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-success text-success-foreground px-2 py-1 text-xs font-semibold rounded-full">
                        New
                      </span>
                    )}
                    {product.isOnSale && (
                      <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-semibold rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                   {/* Quick Actions */}
                   <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button 
                       size="icon-sm" 
                       variant={isInWishlist(product.id) ? "wishlist" : "ghost"}
                       onClick={(e) => {
                         e.preventDefault();
                         handleAddToWishlist(product);
                       }}
                     >
                       <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                     </Button>
                     <Button 
                       size="icon-sm" 
                       variant="cart"
                       onClick={(e) => {
                         e.preventDefault();
                         handleAddToCart(product);
                       }}
                     >
                       <ShoppingBag className="h-4 w-4" />
                     </Button>
                   </div>
                </div>

                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className={viewMode === "list" ? "flex justify-between items-start" : ""}>
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {viewMode === "list" && (
                        <div className="text-sm text-muted-foreground mb-3">
                          Category: {product.category} • Available in {product.colors.length} colors
                        </div>
                      )}
                    </div>

                     {viewMode === "list" && (
                       <div className="flex gap-2 ml-4">
                         <Button 
                           size="sm" 
                           variant={isInWishlist(product.id) ? "wishlist" : "outline"}
                           onClick={(e) => {
                             e.preventDefault();
                             handleAddToWishlist(product);
                           }}
                         >
                           <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                           {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                         </Button>
                         <Button 
                           size="sm" 
                           variant="cart"
                           onClick={(e) => {
                             e.preventDefault();
                             handleAddToCart(product);
                           }}
                         >
                           <ShoppingBag className="h-4 w-4 mr-2" />
                           Add to Cart
                         </Button>
                       </div>
                     )}
                   </div>

                   {viewMode === "grid" && (
                     <Button 
                       className="w-full" 
                       variant="cart"
                       onClick={(e) => {
                         e.preventDefault();
                         handleAddToCart(product);
                       }}
                     >
                       <ShoppingBag className="h-4 w-4 mr-2" />
                       Add to Cart
                     </Button>
                   )}
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;