import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, wishlistCount } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M", // Default size
      color: "Default", // Default color
      inStock: item.inStock,
    });
  };

  const addAllToCart = () => {
    const availableItems = wishlistItems.filter(item => item.inStock);
    availableItems.forEach(item => handleAddToCart(item));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite items for later by adding them to your wishlist.
          </p>
          <Link to="/products">
            <Button size="lg">
              Discover Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={addAllToCart}
            disabled={!wishlistItems.some(item => item.inStock)}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
          <Link to="/products">
            <Button variant="default">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300 group">
            <div className="relative">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={() => removeFromWishlist(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Stock Status */}
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                <Link to={`/product/${item.id}`} className="group">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-lg">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice}
                  </span>
                )}
                {item.originalPrice && (
                  <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                    {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  variant={item.inStock ? "cart" : "outline"}
                  disabled={!item.inStock}
                  onClick={() => item.inStock && handleAddToCart(item)}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Heart className="h-4 w-4 mr-2 fill-current" />
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Viewed or Recommendations */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <Card key={id} className="overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300 group hover:-translate-y-1">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt={`Recommended Product ${id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Recommended Product {id}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">${(Math.random() * 100 + 20).toFixed(2)}</span>
                  <div className="flex gap-1">
                    <Button size="icon-sm" variant="wishlist">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon-sm" variant="cart">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-16 bg-muted rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Use Wishlist?</h2>
          <p className="text-muted-foreground">
            Keep track of your favorite items and never miss out on deals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Save Favorites</h3>
            <p className="text-sm text-muted-foreground">
              Keep track of items you love for future purchase
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-accent/10 text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Quick Purchase</h3>
            <p className="text-sm text-muted-foreground">
              Add multiple items to cart with one click
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-success/10 text-success rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Price Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get notified when wishlist items go on sale
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;